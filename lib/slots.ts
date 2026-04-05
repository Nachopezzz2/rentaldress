import { BUSINESS_HOURS, SLOT_CONFIG } from "./constants";
import type { TimeSlot } from "@/types";

type SlotType = "vestido" | "traje";

function generateAllSlots(type: SlotType): string[] {
  const { duration } = SLOT_CONFIG[type];
  const slots: string[] = [];
  const minutesOpen = (BUSINESS_HOURS.close - BUSINESS_HOURS.open) * 60;
  const totalSlots = minutesOpen / duration;

  for (let i = 0; i < totalSlots; i++) {
    const totalMinutes = BUSINESS_HOURS.open * 60 + i * duration;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }

  return slots;
}

export function computeAvailableSlots(
  type: SlotType,
  bookedCounts: Record<string, number>
): TimeSlot[] {
  const allSlots = generateAllSlots(type);
  const max = SLOT_CONFIG[type].maxSimultaneous;

  return allSlots.map((time) => ({
    time,
    available: (bookedCounts[time] ?? 0) < max,
  }));
}

export function findAvailableFittingRoom(
  bookedRooms: number[],
  maxRooms: number
): number {
  for (let room = 1; room <= maxRooms; room++) {
    if (!bookedRooms.includes(room)) return room;
  }
  return 1;
}
