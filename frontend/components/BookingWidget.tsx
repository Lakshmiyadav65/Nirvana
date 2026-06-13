'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, AlertCircle, CalendarCheck } from 'lucide-react';
import Button from './Button';
import {
  generateSlots,
  groupByDay,
  formatTime,
  formatDateTime,
  type TimeSlot,
} from '@/lib/slots';

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

  // Generate slots on the client only, to avoid SSR/CSR hydration mismatch
  // (the available times depend on the current time).
  useEffect(() => {
    const generated = generateSlots();
    setSlots(generated);
    const groups = groupByDay(generated);
    setActiveDayKey(groups[0]?.key ?? null);
  }, []);

  const dayGroups = useMemo(() => groupByDay(slots), [slots]);
  const activeGroup = dayGroups.find((g) => g.key === activeDayKey) ?? null;
  const selectedSlot = slots.find((s) => s.id === selectedSlotId) ?? null;

  const handleSubmit = (e: React.FormEvent) => {
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
    // The FastAPI backend is currently paused, so the booking is confirmed
    // client-side. When the backend is enabled, replace this block with:
    //   await createBooking({ plan_id: planId, slot_id: selectedSlot.id,
    //                         customer_name: name, customer_email: email })
    // and surface a 409 as "slot no longer available".
    window.setTimeout(() => {
      setBookedIds((prev) => new Set(prev).add(selectedSlot.id));
      setConfirmation({
        planName,
        when: formatDateTime(selectedSlot.start),
        name: name.trim(),
        email: email.trim(),
      });
      setStatus('success');
    }, 700);
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
    <section id="book" className="py-20 md:py-28 bg-charcoal text-white border-t border-gold/15">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Schedule a Visit</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Book a Site Visit
          </h2>
          <p className="text-gray-400 font-light text-sm max-w-xl leading-relaxed">
            Pick an available slot to tour <span className="text-gold">{planName}</span> with our sales team. Choose a time that suits you and we&apos;ll confirm your appointment.
          </p>
        </div>

        <div className="bg-charcoal-dark border border-gold/15 p-6 sm:p-10 shadow-luxury">
          <AnimatePresence mode="wait">
            {status === 'success' && confirmation ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6">
                  <CalendarCheck size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider mb-3">
                  Booking Confirmed
                </h3>
                <p className="text-gray-400 font-light text-sm max-w-md mb-8">
                  Thank you, <span className="text-white">{confirmation.name}</span>. Your site visit is reserved. A confirmation has been sent to <span className="text-gold">{confirmation.email}</span>.
                </p>

                <div className="w-full max-w-md bg-charcoal-dark border border-gold/10 p-6 text-left space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-gold/10 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Project</span>
                    <span className="font-display text-sm text-white font-semibold">{confirmation.planName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Date &amp; Time</span>
                    <span className="font-display text-sm text-gold font-semibold flex items-center gap-2">
                      <Clock size={14} /> {confirmation.when}
                    </span>
                  </div>
                </div>

                <Button onClick={resetForBookAnother} variant="outline">
                  Book another time
                </Button>
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
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gold font-bold mb-4">
                    <Calendar size={14} /> Select a date
                  </span>
                  {dayGroups.length === 0 ? (
                    <p className="text-gray-500 text-xs font-light">Loading available dates…</p>
                  ) : (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {dayGroups.map((group) => (
                        <button
                          type="button"
                          key={group.key}
                          onClick={() => {
                            setActiveDayKey(group.key);
                            setSelectedSlotId(null);
                          }}
                          className={`shrink-0 font-display text-[11px] uppercase tracking-wider px-4 py-3 border transition-all duration-300 ${
                            activeDayKey === group.key
                              ? 'bg-gold text-charcoal-dark border-gold font-bold'
                              : 'bg-transparent text-gray-300 border-gold/15 hover:border-gold/40'
                          }`}
                        >
                          {group.dateLabel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Time slots for the active day */}
                {activeGroup && (
                  <div>
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gold font-bold mb-4">
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
                            className={`font-display text-xs tracking-wide px-2 py-3 border transition-all duration-300 ${
                              isBooked
                                ? 'border-white/5 text-gray-600 line-through cursor-not-allowed'
                                : isSelected
                                ? 'bg-gold text-charcoal-dark border-gold font-bold'
                                : 'bg-transparent text-gray-200 border-gold/15 hover:border-gold/50'
                            }`}
                          >
                            {formatTime(slot.start)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Customer details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gold/10 pt-8">
                  <div className="flex flex-col">
                    <label htmlFor="booking-name" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="booking-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-charcoal-dark border border-gold/15 text-xs px-4 py-3 focus:outline-none focus:border-gold text-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="booking-email" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="booking-email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-charcoal-dark border border-gold/15 text-xs px-4 py-3 focus:outline-none focus:border-gold text-white"
                    />
                  </div>
                </div>

                {/* Selected summary + error */}
                {selectedSlot && (
                  <p className="text-xs text-gray-400 font-light flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-gold" />
                    Selected: <span className="text-white">{formatDateTime(selectedSlot.start)}</span>
                  </p>
                )}
                {error && (
                  <p className="text-xs text-red-400 font-light flex items-center gap-2">
                    <AlertCircle size={14} /> {error}
                  </p>
                )}

                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full sm:w-auto" icon={<CalendarCheck size={14} />}>
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
