"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-xl"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-muted mb-6">
          Uruguay
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-8 text-foreground">
          Rental
          <br />
          <em>Dress</em>
        </h1>
        <p className="text-sm text-muted tracking-wide leading-relaxed mb-12 max-w-sm mx-auto">
          Vestidos de gala, trajes, sandalias y accesorios para tu momento
          especial.
        </p>
        <Link
          href="/reservas"
          className="inline-block text-xs tracking-[0.3em] uppercase border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-400"
        >
          Reservar turno
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted">
          Scroll
        </span>
        <div className="w-px h-10 bg-border" />
      </motion.div>
    </section>
  );
}
