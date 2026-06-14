"""Unit tests for the authoritative IST slot engine (no DB, no network)."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app import slots
from app.slots import (
    canonical_slot_id,
    generate_slots,
    is_valid_slot,
    ist_labels,
    ist_zone,
    parse_slot_id,
)

IST = ist_zone()
UTC = timezone.utc


def _ref(year=2026, month=6, day=15, hour=9, minute=0):
    # 2026-06-15 is a Monday.
    return datetime(year, month, day, hour, minute, tzinfo=IST)


def test_grid_skips_sundays_and_respects_hours():
    grid = generate_slots(_ref())
    assert grid, "expected slots"
    for s in grid:
        assert 10 <= s.start_ist.hour <= 17           # 10:00 .. 17:00 starts
        assert s.start_ist.minute == 0
        assert s.start_ist.weekday() != 6             # never Sunday
        assert s.end_ist - s.start_ist == timedelta(hours=1)


def test_grid_is_strictly_future_and_within_horizon():
    ref = _ref(hour=12, minute=30)
    grid = generate_slots(ref)
    last_allowed_date = ref.date() + timedelta(days=13)
    for s in grid:
        assert s.start_ist > ref
        assert s.start_ist.date() <= last_allowed_date


def test_past_times_today_are_skipped():
    ref = _ref(hour=13, minute=0)  # 1pm Monday
    grid = generate_slots(ref)
    monday_slots = [s for s in grid if s.start_ist.date() == ref.date()]
    # only 14:00..17:00 remain today
    assert [s.start_ist.hour for s in monday_slots] == [14, 15, 16, 17]


def test_canonical_slot_id_is_utc_z_second_precision():
    start_ist = datetime(2026, 6, 15, 10, 0, tzinfo=IST)  # 10:00 IST == 04:30 UTC
    sid = canonical_slot_id(start_ist)
    assert sid == "2026-06-15T04:30:00Z"


def test_slot_id_round_trip():
    start_ist = datetime(2026, 6, 15, 10, 0, tzinfo=IST)
    sid = canonical_slot_id(start_ist)
    parsed = parse_slot_id(sid)
    assert parsed == start_ist.astimezone(UTC)
    # re-canonicalizing is stable
    assert canonical_slot_id(parsed) == sid


def test_parse_slot_id_rejects_naive_and_garbage():
    for bad in ["", "not-a-date", "2026-06-15T10:00:00", "2026-13-40T99:99:99Z"]:
        try:
            parse_slot_id(bad)
            assert False, f"expected ValueError for {bad!r}"
        except (ValueError, TypeError):
            pass


def test_ist_labels_format():
    label, date_label = ist_labels(datetime(2026, 6, 15, 10, 0, tzinfo=IST))
    assert label == "10:00 AM"
    assert date_label == "Mon, 15 Jun"
    pm_label, _ = ist_labels(datetime(2026, 6, 15, 13, 0, tzinfo=IST))
    assert pm_label == "1:00 PM"  # leading zero stripped


def test_is_valid_slot_matches_generator():
    ref = _ref(hour=9)
    grid = generate_slots(ref)
    # everything the generator emits must validate
    for s in grid:
        assert is_valid_slot(s.start_utc, ref)


def test_is_valid_slot_rejects_off_grid():
    ref = _ref(hour=9)
    # Sunday 2026-06-21
    sunday = datetime(2026, 6, 21, 10, 0, tzinfo=IST).astimezone(UTC)
    assert not is_valid_slot(sunday, ref)
    # half-hour offset
    half = datetime(2026, 6, 15, 10, 30, tzinfo=IST).astimezone(UTC)
    assert not is_valid_slot(half, ref)
    # before opening
    early = datetime(2026, 6, 15, 9, 0, tzinfo=IST).astimezone(UTC)
    assert not is_valid_slot(early, ref)
    # at/after close (18:00 start)
    late = datetime(2026, 6, 15, 18, 0, tzinfo=IST).astimezone(UTC)
    assert not is_valid_slot(late, ref)
    # beyond horizon
    far = datetime(2026, 7, 30, 10, 0, tzinfo=IST).astimezone(UTC)
    assert not is_valid_slot(far, ref)


def test_no_dst_fixed_offset():
    # India observes no DST: offset is +05:30 in both winter and summer.
    jan = datetime(2026, 1, 15, 10, 0, tzinfo=IST)
    jul = datetime(2026, 7, 15, 10, 0, tzinfo=IST)
    assert jan.utcoffset() == timedelta(hours=5, minutes=30)
    assert jul.utcoffset() == timedelta(hours=5, minutes=30)
