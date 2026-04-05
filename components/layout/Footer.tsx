import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-sm tracking-[0.3em] uppercase mb-4">
            Rental Dress
          </p>
          <p className="text-xs text-muted leading-relaxed">
            Alquiler de vestidos de gala,
            <br />
            trajes, sandalias y accesorios.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Horarios
          </p>
          <p className="text-xs text-muted leading-relaxed">
            Lunes a Sábado
            <br />
            10:00 – 19:00
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Contacto
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="https://instagram.com/rentaldress.uy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-primary transition-colors duration-300"
            >
              @rentaldress.uy
            </Link>
            <Link
              href="https://wa.me/59891794854"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-primary transition-colors duration-300"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-8 py-5 text-center">
        <p className="text-[10px] tracking-[0.15em] uppercase text-muted">
          © {new Date().getFullYear()} Rental Dress Uruguay
        </p>
      </div>
    </footer>
  );
}
