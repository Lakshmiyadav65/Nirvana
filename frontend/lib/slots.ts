// Client-side available-time generation for the booking feature.
//
// NOTE: This mirrors the planned backend logic (Mon–Sat, 10:00–18:00 hourly,
// next 14 days). It is used while the FastAPI backend is paused so the booking
// UI is fully functional standalone. When the backend is enabled, the plan
// detail page will fetch real slots from `GET /plans/{id}` and this generator
// is no longer the source of truth.

export interface TimeSlot {
  id: string; // ISO string of the start time
  start: Date;
  end: Date;
}

export interface DayGroup {
  key: string;
  dateLabel: string;
  slots: TimeSlot[];
}

const OPEN_HOUR = 10; // first slot starts at 10:00
const CLOSE_HOUR = 18; // last slot starts at 17:00 and ends 18:00
const DAYS_AHEAD = 14;

/** Generate the bookable time slots starting from `now`. */
export function generateSlots(now: Date = new Date()): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (let offset = 0; offset < DAYS_AHEAD; offset++) {
    const day = new Date(startDay);
    day.setDate(startDay.getDate() + offset);

    if (day.getDay() === 0) continue; // Sunday: closed

    for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
      const start = new Date(day);
      start.setHours(hour, 0, 0, 0);

      if (start.getTime() <= now.getTime()) continue; // skip past times today

      const end = new Date(start);
      end.setHours(hour + 1);

      slots.push({ id: start.toISOString(), start, end });
    }
  }

  return slots;
}

/** Group slots by calendar day for display. */
export function groupByDay(slots: TimeSlot[]): DayGroup[] {
  const groups = new Map<string, TimeSlot[]>();

  for (const slot of slots) {
    const key = slot.start.toDateString();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(slot);
  }

  return Array.from(groups.entries()).map(([key, daySlots]) => ({
    key,
    dateLabel: new Date(key).toLocaleDateString(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }),
    slots: daySlots,
  }));
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}
