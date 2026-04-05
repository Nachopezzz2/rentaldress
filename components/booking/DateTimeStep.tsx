"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { BookingType, TimeSlot } from "@/types";
import { BUSINESS_DAYS } from "@/lib/constants";

type Props = {
  type: BookingType;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAY_NAMES = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

export default function DateTimeStep({ type, onSelect, onBack }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setSlots([]);
    fetch(`/api/slots?date=${selectedDate}&type=${type}`)
      .then((r) => r.json())
      .then((data: { slots: TimeSlot[] }) => setSlots(data.slots))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, type]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDate(null);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDate(null);
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d < todayStart) return true;
    if (!BUSINESS_DAYS.includes(d.getDay())) return true;
    return false;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onBack}
        className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors duration-200 mb-10 flex items-center gap-2"
      >
        ← Volver
      </button>

      <h2 className="font-serif text-3xl font-light mb-2">Elegí tu turno</h2>
      <p className="text-sm text-muted mb-10">
        {type === "vestido"
          ? "Turnos de 1 hora — Lunes a Sábado"
          : "Turnos de 30 minutos — Lunes a Sábado"}
      </p>

      {/* Calendar */}
      <div className="mb-10 max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="text-muted hover:text-foreground transition-colors p-1"
          >
            ‹
          </button>
          <p className="text-sm tracking-[0.15em] uppercase">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          <button
            onClick={nextMonth}
            className="text-muted hover:text-foreground transition-colors p-1"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="text-[10px] text-center tracking-wider uppercase text-muted py-1"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dateStr = toDateStr(viewYear, viewMonth, day);
            const disabled = isDisabled(day);
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={day}
                disabled={disabled}
                onClick={() => setSelectedDate(dateStr)}
                className={`aspect-square text-xs flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? "bg-foreground text-background"
                    : disabled
                    ? "text-muted/30 cursor-not-allowed"
                    : "hover:bg-primary/10 text-foreground"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Horarios disponibles
          </p>
          {loadingSlots ? (
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-10 bg-border animate-pulse rounded-none"
                />
              ))}
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-muted">No hay turnos disponibles para este día.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => onSelect(selectedDate, slot.time)}
                  className={`px-4 py-2 text-xs tracking-wider transition-all duration-200 ${
                    slot.available
                      ? "border border-border hover:border-foreground hover:bg-foreground hover:text-background"
                      : "border border-border text-muted/30 cursor-not-allowed line-through"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
