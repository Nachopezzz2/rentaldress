"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 bg-background/90 backdrop-blur-sm">
      <Link
        href="/"
        className="font-serif text-sm tracking-[0.35em] uppercase text-foreground hover:text-primary transition-colors duration-300"
      >
        Rental Dress
      </Link>

      <div className="flex items-center gap-10">
        <Link
          href="/galeria"
          className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
            pathname === "/galeria"
              ? "text-primary"
              : "text-muted hover:text-foreground"
          }`}
        >
          Galería
        </Link>
        <Link
          href="/reservas"
          className="text-xs tracking-[0.2em] uppercase border border-foreground px-5 py-2 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Reservar
        </Link>
      </div>
    </nav>
  );
}
