// Slot helpers for the booking widget.
//
// The backend (FastAPI) is the authoritative source of bookable times. It
// computes slots in Asia/Kolkata and returns preformatted IST strings
// (`label`, `date_label`) which we render VERBATIM — we never call
// toLocale*/toDateString on the instants, so every visitor sees the real
// Hyderabad wall-clock time regardless of their browser timezone.

import type { SlotDTO } from './api';

export interface TimeSlot extends SlotDTO {
  id: string; // alias of slot_id, for stable React keys
}

export interface DayGroup {
  key: string;       // the IST date_label (also the group key)
  dateLabel: string; // rendered verbatim on the day selector
  slots: TimeSlot[];
}

/** Adapt server slot DTOs into the shape the widget renders. */
export function toTimeSlots(slots: SlotDTO[]): TimeSlot[] {
  return slots.map((s) => ({ ...s, id: s.slot_id }));
}

/** Group slots by their preformatted IST day. */
export function groupByDay(slots: TimeSlot[]): DayGroup[] {
  const groups = new Map<string, TimeSlot[]>();
  for (const slot of slots) {
    if (!groups.has(slot.date_label)) groups.set(slot.date_label, []);
    groups.get(slot.date_label)!.push(slot);
  }
  return Array.from(groups.entries()).map(([key, daySlots]) => ({
    key,
    dateLabel: key,
    slots: daySlots,
  }));
}

/** Time button label — the server's verbatim IST time string. */
export function formatTime(slot: TimeSlot): string {
  return slot.label;
}

/** "Mon, 15 Jun · 10:00 AM" — built from the server's verbatim IST strings. */
export function formatDateTime(slot: TimeSlot): string {
  return `${slot.date_label} · ${slot.label}`;
}
