"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Reservation } from "@/types";

const MONTH_NAMES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const DAY_NAMES = ["Do","Lu","Ma","Mi","Ju","Vi","Sá"];

const TYPE_LABELS: Record<string, string> = {
  vestido: "Vestido",
  traje: "Traje",
};

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function AdminPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firstDay = toDateStr(viewYear, viewMonth, 1);
    const lastDay = toDateStr(viewYear, viewMonth, new Date(viewYear, viewMonth + 1, 0).getDate());

    setLoading(true);
    supabase
      .from("reservations")
      .select("*")
      .gte("date", firstDay)
      .lte("date", lastDay)
      .neq("status", "cancelled")
      .order("date", { ascending: true })
      .order("time_start", { ascending: true })
      .then(({ data }) => {
        setReservations(data ?? []);
        setLoading(false);
      });
  }, [viewYear, viewMonth]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Group by date
  const byDate: Record<string, Reservation[]> = {};
  for (const r of reservations) {
    byDate[r.date] = [...(byDate[r.date] ?? []), r];
  }

  const selectedReservations = selectedDate ? (byDate[selectedDate] ?? []) : [];

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null);
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-muted mb-2">Panel</p>
          <h1 className="font-serif text-4xl font-light">Reservas</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="text-muted hover:text-foreground transition-colors px-2">‹</button>
              <p className="text-sm tracking-[0.15em] uppercase">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </p>
              <button onClick={nextMonth} className="text-muted hover:text-foreground transition-colors px-2">›</button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-[10px] text-center tracking-wider uppercase text-muted py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dateStr = toDateStr(viewYear, viewMonth, day);
                const count = byDate[dateStr]?.length ?? 0;
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`relative aspect-square flex flex-col items-center justify-center text-xs transition-all duration-200 ${
                      isSelected
                        ? "bg-foreground text-background"
                        : isToday
                        ? "border border-primary text-foreground"
                        : "hover:bg-primary/10 text-foreground"
                    }`}
                  >
                    {day}
                    {count > 0 && (
                      <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? "bg-background" : "bg-primary"}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Month summary */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted mb-3 tracking-wider uppercase">Este mes</p>
              {loading ? (
                <p className="text-xs text-muted">Cargando...</p>
              ) : (
                <div className="flex gap-6">
                  <div>
                    <p className="font-serif text-2xl">{reservations.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">Total</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl">{reservations.filter(r => r.type === "vestido").length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">Vestidos</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl">{reservations.filter(r => r.type === "traje").length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">Trajes</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Day detail */}
          <div>
            {!selectedDate ? (
              <div className="flex items-center justify-center h-48 border border-border">
                <p className="text-xs text-muted tracking-wider uppercase">Seleccioná un día</p>
              </div>
            ) : (
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6">
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("es-UY", {
                    weekday: "long", day: "numeric", month: "long"
                  })}
                </p>

                {selectedReservations.length === 0 ? (
                  <p className="text-sm text-muted">Sin reservas este día.</p>
                ) : (
                  <div className="space-y-px">
                    {selectedReservations.map(r => (
                      <div key={r.id} className="border border-border p-5 bg-background">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-serif text-lg font-light">{r.time_start.slice(0, 5)}hs</p>
                            <p className="text-[10px] uppercase tracking-wider text-muted">{TYPE_LABELS[r.type]}</p>
                          </div>
                          {r.fitting_room && (
                            <span className="text-[10px] tracking-wider uppercase text-muted border border-border px-2 py-1">
                              Prob. {r.fitting_room}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium">{r.client_name}</p>
                        <p className="text-xs text-muted">{r.client_phone}</p>
                        {r.notes && (
                          <p className="text-xs text-muted mt-2 italic">"{r.notes}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
