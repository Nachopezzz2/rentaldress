import { type NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { computeAvailableSlots } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const type = searchParams.get("type") as "vestido" | "traje" | null;

  if (!date || !type || !["vestido", "traje"].includes(type)) {
    return Response.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("time_start, fitting_room")
    .eq("date", date)
    .eq("type", type)
    .neq("status", "cancelled");

  if (error) {
    return Response.json({ error: "Error al consultar disponibilidad" }, { status: 500 });
  }

  // Count bookings per time slot
  const bookedCounts: Record<string, number> = {};
  for (const row of data) {
    const t = row.time_start.slice(0, 5); // "HH:MM"
    bookedCounts[t] = (bookedCounts[t] ?? 0) + 1;
  }

  const slots = computeAvailableSlots(type, bookedCounts);

  return Response.json({ slots });
}
