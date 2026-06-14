'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, AlertCircle, CalendarCheck } from 'lucide-react';
import Button from './Button';
import {
  groupByDay,
  formatTime,
  formatDateTime,
  toTimeSlots,
  type TimeSlot,
} from '@/lib/slots';
import { getPlanWithSlots, createBooking, SlotTakenError } from '@/lib/api';

interface BookingWidgetProps {
  planId: string;
  planName: string;
}

interface Confirmation {
  planName: string;
  when: string;
  name: string;
  email: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BookingWidget: React.FC<BookingWidgetProps> = ({ planId, planName }) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());
  const [activeDayKey, setActiveDayKey] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [loadError, setLoadError] = useState(false);

  // Fetch the authoritative available slots from the backend for this plan.
  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    getPlanWithSlots(planId)
      .then((data) => {
        if (cancelled) return;
        const fetched = toTimeSlots(data.slots);
        setSlots(fetched);
        setActiveDayKey(groupByDay(fetched)[0]?.key ?? null);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [planId]);

  const dayGroups = useMemo(() => groupByDay(slots), [slots]);
  const activeGroup = dayGroups.find((g) => g.key === activeDayKey) ?? null;
  const selectedSlot = slots.find((s) => s.id === selectedSlotId) ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError('Please select an available time slot.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setStatus('submitting');

    // ── Booking submit ──────────────────────────────────────────────
    // The backend revalidates the slot and atomically claims it; a 409 means
    // someone booked it first, surfaced here as "no longer available".
    try {
      const result = await createBooking({
        plan_id: planId,
        slot_id: selectedSlot.slot_id,
        customer_name: name.trim(),
        customer_email: email.trim(),
      });
      setConfirmation({
        planName,
        when: `${result.date_label} · ${result.label}`,
        name: result.customer_name,
        email: result.customer_email,
      });
      setStatus('success');
    } catch (err) {
      if (err instanceof SlotTakenError) {
        setBookedIds((prev) => new Set(prev).add(selectedSlot.slot_id));
        setSelectedSlotId(null);
        setError('That slot is no longer available — please choose another time.');
      } else {
        setError('Something went wrong while confirming. Please try again.');
      }
      setStatus('idle');
    }
  };

  const resetForBookAnother = () => {
    setSelectedSlotId(null);
    setName('');
    setEmail('');
    setError(null);
    setConfirmation(null);
    setStatus('idle');
  };

  return (
    <section id="book" className="py-20 md:py-28 bg-charcoal text-cream">
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        <div className="text-center flex flex-col items-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold-light font-semibold font-display mb-4">Schedule a Visit</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Book a Site Visit</h2>
          <p className="text-cream/60 font-light text-sm max-w-xl leading-relaxed">
            Pick an available slot to tour <span className="text-gold-light">{planName}</span> with our sales team. Choose a time that suits you and we&apos;ll confirm your appointment.
          </p>
        </div>

        <div className="rounded-[2rem] bg-charcoal-dark border border-cream/10 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {status === 'success' && confirmation ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold-light mb-6">
                  <CalendarCheck size={32} />
                </div>
                <h3 className="font-serif text-3xl mb-3">Booking Confirmed</h3>
                <p className="text-cream/60 font-light text-sm max-w-md mb-8">
                  Thank you, <span className="text-cream">{confirmation.name}</span>. Your site visit is reserved. A confirmation has been sent to <span className="text-gold-light">{confirmation.email}</span>.
                </p>

                <div className="w-full max-w-md rounded-2xl bg-charcoal/60 border border-cream/10 p-6 text-left space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-cream/10 pb-3">
                    <span className="text-[11px] uppercase tracking-wider text-cream/45 font-semibold">Project</span>
                    <span className="font-display text-sm text-cream font-semibold">{confirmation.planName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] uppercase tracking-wider text-cream/45 font-semibold">Date &amp; Time</span>
                    <span className="font-display text-sm text-gold-light font-semibold flex items-center gap-2">
                      <Clock size={14} /> {confirmation.when}
                    </span>
                  </div>
                </div>

                <Button onClick={resetForBookAnother} variant="glass">Book another time</Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Day selector */}
                <div>
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold-light font-semibold mb-4">
                    <Calendar size={14} /> Select a date
                  </span>
                  {dayGroups.length === 0 ? (
                    <p className="text-cream/40 text-sm font-light">
                      {loadError
                        ? 'Unable to load available dates right now. Please try again later.'
                        : 'Loading available dates…'}
                    </p>
                  ) : (
                    <div className="flex gap-2.5 overflow-x-auto pb-2">
                      {dayGroups.map((group) => (
                        <button
                          type="button"
                          key={group.key}
                          onClick={() => {
                            setActiveDayKey(group.key);
                            setSelectedSlotId(null);
                          }}
                          className={`shrink-0 font-display text-[12px] tracking-wide px-5 py-2.5 rounded-full border transition-all duration-300 ${
                            activeDayKey === group.key
                              ? 'bg-gold text-cream border-gold font-semibold'
                              : 'bg-transparent text-cream/70 border-cream/15 hover:border-gold/50'
                          }`}
                        >
                          {group.dateLabel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Time slots */}
                {activeGroup && (
                  <div>
                    <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold-light font-semibold mb-4">
                      <Clock size={14} /> Available times — {activeGroup.dateLabel}
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {activeGroup.slots.map((slot) => {
                        const isBooked = bookedIds.has(slot.id);
                        const isSelected = selectedSlotId === slot.id;
                        return (
                          <button
                            type="button"
                            key={slot.id}
                            disabled={isBooked}
                            onClick={() => {
                              setSelectedSlotId(slot.id);
                              setError(null);
                            }}
                            className={`font-display text-[13px] tracking-wide px-2 py-3 rounded-xl border transition-all duration-300 ${
                              isBooked
                                ? 'border-cream/5 text-cream/25 line-through cursor-not-allowed'
                                : isSelected
                                ? 'bg-gold text-cream border-gold font-semibold'
                                : 'bg-transparent text-cream/80 border-cream/15 hover:border-gold/50'
                            }`}
                          >
                            {formatTime(slot)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Customer details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-cream/10 pt-8">
                  <div className="flex flex-col">
                    <label htmlFor="booking-name" className="text-[11px] uppercase tracking-wider text-cream/45 font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      id="booking-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-charcoal/50 border border-cream/15 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-gold text-cream placeholder:text-cream/30"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="booking-email" className="text-[11px] uppercase tracking-wider text-cream/45 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      id="booking-email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-charcoal/50 border border-cream/15 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-gold text-cream placeholder:text-cream/30"
                    />
                  </div>
                </div>

                {selectedSlot && (
                  <p className="text-[13px] text-cream/60 font-light flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-gold-light" />
                    Selected: <span className="text-cream">{formatDateTime(selectedSlot)}</span>
                  </p>
                )}
                {error && (
                  <p className="text-[13px] text-red-300 font-light flex items-center gap-2">
                    <AlertCircle size={15} /> {error}
                  </p>
                )}

                <div className="pt-1">
                  <Button type="submit" variant="primary" className="w-full sm:w-auto" icon={<CalendarCheck size={15} />}>
                    {status === 'submitting' ? 'Confirming…' : 'Confirm Booking'}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BookingWidget;
