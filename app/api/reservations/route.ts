import { supabase } from "@/lib/supabase";
import { computeAvailableSlots } from "@/lib/slots";
import { SLOT_CONFIG } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const { type, date, timeSlot, clientName, clientPhone, notes } = body;

  if (!type || !date || !timeSlot || !clientName || !clientPhone) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }

  if (!["vestido", "traje"].includes(type)) {
    return Response.json({ error: "Tipo inválido" }, { status: 400 });
  }

  // Check slot is still available (race condition protection)
  const { data: existing, error: fetchError } = await supabase
    .from("reservations")
    .select("time_start, fitting_room")
    .eq("date", date)
    .eq("type", type)
    .neq("status", "cancelled");

  if (fetchError) {
    return Response.json({ error: "Error al verificar disponibilidad" }, { status: 500 });
  }

  const bookedCounts: Record<string, number> = {};
  const bookedRooms: Record<string, number[]> = {};

  for (const row of existing) {
    const t = row.time_start.slice(0, 5);
    bookedCounts[t] = (bookedCounts[t] ?? 0) + 1;
    if (row.fitting_room) {
      bookedRooms[t] = [...(bookedRooms[t] ?? []), row.fitting_room];
    }
  }

  const slots = computeAvailableSlots(type, bookedCounts);
  const slot = slots.find((s) => s.time === timeSlot);

  if (!slot || !slot.available) {
    return Response.json(
      { error: "Este horario ya no está disponible. Por favor elegí otro." },
      { status: 409 }
    );
  }

  // Assign fitting room for vestidos
  let fittingRoom: number | null = null;
  if (type === "vestido") {
    const occupied = bookedRooms[timeSlot] ?? [];
    for (let r = 1; r <= SLOT_CONFIG.vestido.maxSimultaneous; r++) {
      if (!occupied.includes(r)) {
        fittingRoom = r;
        break;
      }
    }
  }

  const { data, error: insertError } = await supabase
    .from("reservations")
    .insert({
      date,
      time_start: timeSlot + ":00",
      type,
      fitting_room: fittingRoom,
      client_name: clientName,
      client_phone: clientPhone,
      notes: notes || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertError) {
    return Response.json({ error: "Error al guardar la reserva" }, { status: 500 });
  }

  return Response.json({ id: data.id });
}
