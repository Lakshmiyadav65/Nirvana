"""Service-level booking tests against an in-memory Mongo (mongomock-motor)."""
from __future__ import annotations

import asyncio
from datetime import datetime, timedelta

import pytest

from app import slots
from app.errors import InvalidSlot, MalformedSlot, PlanNotFound, SlotExpired, SlotTaken
from app.models import BookingCreate
from app.services.bookings import available_slots, create_booking
from app.slots import canonical_slot_id, ist_zone

IST = ist_zone()
pytestmark = pytest.mark.asyncio


def _ref():
    # Monday 09:00 IST — a stable reference well inside the grid.
    return datetime(2026, 6, 15, 9, 0, tzinfo=IST)


def _first_slot_id(ref):
    return canonical_slot_id(slots.generate_slots(ref)[0].start_utc)


def _payload(plan_id="manohara", slot_id=None, ref=None, **over):
    ref = ref or _ref()
    return BookingCreate(
        plan_id=plan_id,
        slot_id=slot_id or _first_slot_id(ref),
        customer_name=over.get("name", "Asha R"),
        customer_email=over.get("email", "Asha@Example.com"),
    )


async def test_happy_booking_returns_canonical_fields(seeded_db):
    ref = _ref()
    out = await create_booking(seeded_db, _payload(ref=ref), reference_ist=ref)
    assert out["plan_id"] == "manohara"
    assert out["slot_id"].endswith("Z")
    assert out["label"] and out["date_label"]
    assert out["customer_email"] == "asha@example.com"  # normalized lower
    assert out["customer_name"] == "Asha R"


async def test_unknown_plan_raises_404(seeded_db):
    ref = _ref()
    with pytest.raises(PlanNotFound):
        await create_booking(seeded_db, _payload(plan_id="nope", ref=ref), reference_ist=ref)


async def test_malformed_slot_raises(seeded_db):
    ref = _ref()
    p = BookingCreate(plan_id="manohara", slot_id="garbage", customer_name="A", customer_email="a@b.com")
    with pytest.raises(MalformedSlot):
        await create_booking(seeded_db, p, reference_ist=ref)


async def test_off_grid_slot_raises_invalid(seeded_db):
    ref = _ref()
    sunday = canonical_slot_id(datetime(2026, 6, 21, 10, 0, tzinfo=IST))  # Sunday
    p = BookingCreate(plan_id="manohara", slot_id=sunday, customer_name="A", customer_email="a@b.com")
    with pytest.raises(InvalidSlot):
        await create_booking(seeded_db, p, reference_ist=ref)


async def test_past_slot_raises_expired(seeded_db):
    ref = _ref()
    past = canonical_slot_id(datetime(2026, 6, 8, 10, 0, tzinfo=IST))  # week earlier
    p = BookingCreate(plan_id="manohara", slot_id=past, customer_name="A", customer_email="a@b.com")
    with pytest.raises(SlotExpired):
        await create_booking(seeded_db, p, reference_ist=ref)


async def test_double_booking_same_slot_raises_taken(seeded_db):
    ref = _ref()
    await create_booking(seeded_db, _payload(ref=ref), reference_ist=ref)
    with pytest.raises(SlotTaken):
        await create_booking(seeded_db, _payload(ref=ref, email="other@example.com"), reference_ist=ref)


async def test_concurrent_booking_exactly_one_wins(seeded_db):
    ref = _ref()
    results = await asyncio.gather(
        create_booking(seeded_db, _payload(ref=ref, email="a@example.com"), reference_ist=ref),
        create_booking(seeded_db, _payload(ref=ref, email="b@example.com"), reference_ist=ref),
        return_exceptions=True,
    )
    oks = [r for r in results if isinstance(r, dict)]
    taken = [r for r in results if isinstance(r, SlotTaken)]
    assert len(oks) == 1
    assert len(taken) == 1


async def test_available_slots_excludes_booked(seeded_db):
    ref = _ref()
    before = await available_slots(seeded_db, "manohara", reference_ist=ref)
    booked_id = before[0]["slot_id"]
    await create_booking(seeded_db, _payload(slot_id=booked_id, ref=ref), reference_ist=ref)
    after = await available_slots(seeded_db, "manohara", reference_ist=ref)
    assert booked_id not in {s["slot_id"] for s in after}
    assert len(after) == len(before) - 1


async def test_other_plan_unaffected_by_booking(seeded_db):
    ref = _ref()
    sid = _first_slot_id(ref)
    await create_booking(seeded_db, _payload(slot_id=sid, ref=ref), reference_ist=ref)
    # Same slot time, different plan — must still be available.
    other = await available_slots(seeded_db, "venkata-lakshmi-nilayam", reference_ist=ref)
    assert sid in {s["slot_id"] for s in other}
