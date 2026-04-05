import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Reservar turno | Rental Dress",
  description: "Reservá tu turno para probar vestidos, trajes y accesorios en Rental Dress Uruguay.",
};

export default function ReservasPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-8 pt-36 pb-24 min-h-screen">
        <div className="mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-muted mb-4">
            Reservas
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light">
            Reservar turno
          </h1>
        </div>

        <Suspense fallback={null}>
          <BookingWizard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
