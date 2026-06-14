// Typed client for the FastAPI backend (site-visit booking).
//
// Base URL comes from NEXT_PUBLIC_API_URL (see .env.local.example); falls back
// to the local dev backend. The backend is the authoritative source of slots and
// returns preformatted IST `label`/`date_label` strings that we render verbatim.

import type { Project } from '@/data/projects';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface SlotDTO {
  slot_id: string;     // canonical UTC instant, e.g. "2026-06-15T04:30:00Z"
  start: string;       // === slot_id
  end: string;         // UTC instant of the slot end
  label: string;       // preformatted IST time, e.g. "10:00 AM" — render verbatim
  date_label: string;  // preformatted IST day, e.g. "Mon, 15 Jun" — render verbatim
  available: boolean;
}

export interface PlanDetailDTO {
  plan: Project;
  slots: SlotDTO[];
}

export interface BookingResultDTO {
  booking_id: string;
  plan_id: string;
  plan_name: string;
  slot_id: string;
  start: string;
  end: string;
  label: string;
  date_label: string;
  customer_name: string;
  customer_email: string;
  created_at: string;
}

/** Thrown when the chosen slot was booked by someone else first (HTTP 409). */
export class SlotTakenError extends Error {}

export async function getPlanWithSlots(planId: string): Promise<PlanDetailDTO> {
  const res = await fetch(`${API_BASE}/plans/${encodeURIComponent(planId)}`);
  if (!res.ok) throw new Error('plan_fetch_failed');
  return res.json();
}

export async function createBooking(body: {
  plan_id: string;
  slot_id: string;
  customer_name: string;
  customer_email: string;
}): Promise<BookingResultDTO> {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 409) throw new SlotTakenError('slot_taken');
  if (!res.ok) throw new Error('booking_failed');
  return res.json();
}
