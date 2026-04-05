import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PhotoGrid from "@/components/gallery/PhotoGrid";

export const metadata = {
  title: "Galería | Rental Dress",
  description: "Mirá nuestra colección de vestidos, trajes y accesorios disponibles para alquilar.",
};

export default function GaleriaPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-8 pt-36 pb-24">
        <div className="mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-muted mb-4">
            Últimos ingresos
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light">
            Novedades
          </h1>
          <p className="text-sm text-muted mt-4 max-w-md leading-relaxed">
            Mostramos nuestras últimas incorporaciones. Para ver la colección
            completa seguinos en{" "}
            <a
              href="https://instagram.com/rentaldress.uy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary transition-colors duration-200"
            >
              @rentaldress.uy
            </a>
            .
          </p>
        </div>

        <PhotoGrid />
      </main>
      <Footer />
    </>
  );
}
