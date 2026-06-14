"""Booking creation + availability.

Availability is computed fresh from the IST grid minus already-booked slots.
Creation runs a strict validation ladder, then relies on a unique compound
index ``(plan_id, slot_start)`` to make double-booking atomically impossible:
two concurrent inserts for the same slot => exactly one wins, the loser gets a
``DuplicateKeyError`` which becomes a 409.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo.errors import DuplicateKeyError

from .. import slots as slots_engine
from ..errors import InvalidSlot, MalformedSlot, PlanNotFound, SlotExpired, SlotTaken
from ..models import BookingCreate

UTC = timezone.utc


def _as_utc(dt: datetime) -> datetime:
    """Normalize a (possibly naive) Mongo datetime to aware UTC, second precision."""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=UTC)
    return dt.astimezone(UTC).replace(microsecond=0)


def _slot_payload(slot: slots_engine.Slot) -> dict:
    label, date_label = slots_engine.ist_labels(slot.start_ist)
    return {
        "slot_id": slots_engine.canonical_slot_id(slot.start_utc),
        "start": slots_engine.canonical_slot_id(slot.start_utc),
        "end": slots_engine.canonical_slot_id(slot.end_utc),
        "label": label,
        "date_label": date_label,
        "available": True,
    }


async def available_slots(
    db: AsyncIOMotorDatabase, plan_id: str, reference_ist: datetime | None = None
) -> list[dict]:
    ref = reference_ist or slots_engine.now_ist()
    grid = slots_engine.generate_slots(ref)

    now_utc = datetime.now(UTC)
    booked: set[datetime] = set()
    cursor = db.bookings.find(
        {"plan_id": plan_id, "slot_start": {"$gte": now_utc}},
        {"slot_start": 1},
    )
    async for b in cursor:
        booked.add(_as_utc(b["slot_start"]))

    return [_slot_payload(s) for s in grid if s.start_utc not in booked]


async def create_booking(
    db: AsyncIOMotorDatabase, payload: BookingCreate, reference_ist: datetime | None = None
) -> dict:
    ref = reference_ist or slots_engine.now_ist()

    # 1. Plan must exist.
    plan = await db.plans.find_one({"_id": payload.plan_id})
    if not plan:
        raise PlanNotFound(f"No plan with id '{payload.plan_id}'.")

    # 2. slot_id must parse to an aware UTC instant.
    try:
        start_utc = slots_engine.parse_slot_id(payload.slot_id)
    except (ValueError, TypeError):
        raise MalformedSlot()

    # 3. Must be a real, future, on-grid slot (recomputed server-side — never
    #    trust the client). Split past-vs-off-grid for a precise error code.
    start_ist = start_utc.astimezone(slots_engine.ist_zone())
    if start_ist <= ref:
        raise SlotExpired()
    if not slots_engine.is_valid_slot(start_utc, ref):
        raise InvalidSlot()

    end_utc = (start_utc + timedelta(hours=1)).replace(microsecond=0)
    label, date_label = slots_engine.ist_labels(start_ist)
    created_at = datetime.now(UTC).replace(microsecond=0)

    doc = {
        "plan_id": payload.plan_id,
        "plan_name": plan["name"],
        "slot_start": start_utc,
        "slot_end": end_utc,
        "customer_name": payload.customer_name,  # already stripped by the model
        "customer_email": payload.customer_email.strip().lower(),
        "created_at": created_at,
        "email_sent": False,
        "email_error": None,
    }

    # 4. Atomic claim. The unique compound index `uq_plan_slot` is the ONLY
    #    unique constraint on the bookings collection (and ObjectId _id never
    #    collides), so any duplicate-key here is unambiguously a slot already
    #    taken by a concurrent request => 409.
    try:
        result = await db.bookings.insert_one(doc)
    except DuplicateKeyError:
        raise SlotTaken()

    return {
        "booking_id": str(result.inserted_id),
        "plan_id": payload.plan_id,
        "plan_name": plan["name"],
        "slot_id": slots_engine.canonical_slot_id(start_utc),
        "start": slots_engine.canonical_slot_id(start_utc),
        "end": slots_engine.canonical_slot_id(end_utc),
        "label": label,
        "date_label": date_label,
        "customer_name": doc["customer_name"],
        "customer_email": doc["customer_email"],
        "created_at": slots_engine.canonical_slot_id(created_at),
        # Internal: handed to the email background task (filtered out of BookingOut).
        "_id": result.inserted_id,
    }
