"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "vestidos",
    title: "Vestidos",
    subtitle: "Gala · Cocktail · Fiesta",
    description: "Turno de 1 hora · 3 probadores",
    href: "/reservas?tipo=vestido",
  },
  {
    id: "trajes",
    title: "Trajes",
    subtitle: "Camisas · Corbatas · Moños · Zapatos",
    description: "Turno de 30 minutos",
    href: "/reservas?tipo=traje",
  },
  {
    id: "accesorios",
    title: "Accesorios",
    subtitle: "Sandalias · Carteras · Bijouterie",
    description: "Sin turno · Consulta por WhatsApp",
    href: "/reservas?tipo=accesorios",
  },
];

export default function CategoryCards() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-muted mb-4">
          Categorías
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-light">
          ¿Qué estás buscando?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <Link
              href={cat.href}
              className="group flex flex-col justify-between p-10 bg-background min-h-[280px] hover:bg-primary/5 transition-colors duration-500"
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6 group-hover:text-primary transition-colors duration-300">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl font-light mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
                  {cat.description}
                </p>
                <span className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
