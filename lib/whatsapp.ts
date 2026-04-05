import { WHATSAPP_NUMBER, CATEGORY_LABELS } from "./constants";
import type { BookingData } from "@/types";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function buildWhatsAppUrl(booking: BookingData): string {
  const categoryLabel = CATEGORY_LABELS[booking.type];

  let message: string;

  if (booking.type === "accesorios") {
    message = `Hola Rental Dress! 🤍 Quiero consultar por accesorios y/o zapatos.
Nombre: ${booking.clientName}
Teléfono: ${booking.clientPhone}${booking.notes ? `\nNotas: ${booking.notes}` : ""}`;
  } else {
    message = `Hola Rental Dress! 🤍 Quiero confirmar mi turno.
Nombre: ${booking.clientName}
Categoría: ${categoryLabel}
Fecha: ${formatDate(booking.date)}
Hora: ${booking.timeSlot}hs${booking.notes ? `\nNotas: ${booking.notes}` : ""}`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
