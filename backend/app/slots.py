"""Authoritative site-visit slot engine.

The backend is the single source of truth for bookable times. Slots are
computed in **Asia/Kolkata** (IST, a fixed UTC+05:30 — India has no DST), so
the wall-clock grid is identical for every visitor regardless of their browser
timezone. The same :func:`is_valid_slot` predicate powers both generation and
booking validation, so the booking endpoint accepts exactly the set the
generator could have shown — no grid drift.

Wire format per slot:
  * ``slot_id`` / ``start`` / ``end`` — canonical UTC ISO-8601 with ``Z``,
    second precision (e.g. ``2026-06-15T04:30:00Z`` == 10:00 IST). The client
    echoes ``slot_id`` back verbatim; it is the booking key.
  * ``label`` / ``date_label`` — preformatted IST strings the UI renders
    VERBATIM (never re-localized in the browser).
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

from .config import get_settings

UTC = timezone.utc


def ist_zone() -> ZoneInfo:
    """The business timezone (Asia/Kolkata by default). Requires ``tzdata``."""
    return ZoneInfo(get_settings().booking_timezone)


def now_ist() -> datetime:
    return datetime.now(ist_zone())


@dataclass(frozen=True)
class Slot:
    start_utc: datetime
    end_utc: datetime
    start_ist: datetime
    end_ist: datetime


def canonical_slot_id(dt: datetime) -> str:
    """ISO-8601 UTC with ``Z``, second precision, no microseconds."""
    dt_utc = dt.astimezone(UTC).replace(microsecond=0)
    return dt_utc.strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_slot_id(value: str) -> datetime:
    """Parse a ``slot_id`` into an aware UTC datetime (second precision).

    Rejects naive datetimes, non-strings, and garbage by raising ``ValueError``.
    """
    if not isinstance(value, str) or not value.strip():
        raise ValueError("empty slot id")
    s = value.strip()
    # Normalize a trailing 'Z' for maximum cross-version safety.
    iso = (s[:-1] + "+00:00") if s.endswith(("Z", "z")) else s
    dt = datetime.fromisoformat(iso)  # raises ValueError on malformed input
    if dt.tzinfo is None:
        raise ValueError("slot id must be timezone-aware")
    return dt.astimezone(UTC).replace(microsecond=0)


def ist_labels(start_ist: datetime) -> tuple[str, str]:
    """Return ``(time_label, date_label)`` preformatted in IST.

    e.g. ``("10:00 AM", "Mon, 15 Jun")``. Rendered verbatim by the UI.
    """
    time_label = start_ist.strftime("%I:%M %p").lstrip("0")  # "10:00 AM" / "1:00 PM"
    date_label = start_ist.strftime("%a, %d %b")             # "Mon, 15 Jun"
    return time_label, date_label


def is_valid_slot(start_utc: datetime, reference_ist: datetime) -> bool:
    """True iff ``start_utc`` is a slot the generator could currently emit.

    Mirrors :func:`generate_slots` exactly: on the IST wall clock the start must
    land on a whole hour in ``[open, close)``, not be a Sunday, be strictly in
    the future, and fall within the rolling ``slot_days_ahead`` calendar window.
    """
    s = get_settings()
    start_ist = start_utc.astimezone(ist_zone())

    if start_ist.minute or start_ist.second or start_ist.microsecond:
        return False
    if start_ist.weekday() == 6:  # Sunday (Mon=0 .. Sun=6)
        return False
    if not (s.slot_open_hour <= start_ist.hour < s.slot_close_hour):
        return False
    if start_ist <= reference_ist:
        return False
    last_date = reference_ist.date() + timedelta(days=s.slot_days_ahead - 1)
    if start_ist.date() > last_date:
        return False
    return True


def generate_slots(reference_ist: datetime | None = None) -> list[Slot]:
    """All currently-bookable slots from ``reference_ist`` (default now, IST)."""
    s = get_settings()
    ist = ist_zone()
    ref = reference_ist or datetime.now(ist)
    base_date = ref.date()

    slots: list[Slot] = []
    for offset in range(s.slot_days_ahead):
        day = base_date + timedelta(days=offset)
        if day.weekday() == 6:  # Sunday closed
            continue
        for hour in range(s.slot_open_hour, s.slot_close_hour):
            start_ist = datetime(day.year, day.month, day.day, hour, 0, 0, tzinfo=ist)
            if start_ist <= ref:  # skip past times today
                continue
            end_ist = start_ist + timedelta(hours=1)
            slots.append(
                Slot(
                    start_utc=start_ist.astimezone(UTC).replace(microsecond=0),
                    end_utc=end_ist.astimezone(UTC).replace(microsecond=0),
                    start_ist=start_ist,
                    end_ist=end_ist,
                )
            )
    return slots
