"use client";

import { motion } from "framer-motion";
import type { BookingType } from "@/types";

const OPTIONS: { type: BookingType; title: string; subtitle: string; detail: string }[] = [
  {
    type: "vestido",
    title: "Vestido",
    subtitle: "Gala · Cocktail · Fiesta",
    detail: "Turno de 1 hora — 3 probadores disponibles",
  },
  {
    type: "traje",
    title: "Traje",
    subtitle: "Camisas · Corbatas · Moños",
    detail: "Turno de 30 minutos",
  },
  {
    type: "accesorios",
    title: "Accesorios / Zapatos",
    subtitle: "Sandalias · Carteras · Bijouterie",
    detail: "Sin turno — te contactamos por WhatsApp",
  },
];

type Props = {
  onSelect: (type: BookingType) => void;
};

export default function CategoryStep({ onSelect }: Props) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-serif text-3xl font-light mb-2">
          ¿Qué querés reservar?
        </h2>
        <p className="text-sm text-muted mb-12">
          Seleccioná la categoría para ver los turnos disponibles.
        </p>

        <div className="grid grid-cols-1 gap-px bg-border">
          {OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              className="group flex items-center justify-between p-8 bg-background hover:bg-primary/5 transition-colors duration-300 text-left"
            >
              <div>
                <h3 className="font-serif text-xl font-light mb-1">
                  {opt.title}
                </h3>
                <p className="text-xs text-muted">{opt.subtitle}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted hidden md:block">
                  {opt.detail}
                </p>
                <span className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
