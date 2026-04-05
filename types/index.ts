export type BookingType = "vestido" | "traje" | "accesorios";

export interface TimeSlot {
  time: string; // "10:00"
  available: boolean;
}

export interface BookingData {
  type: BookingType;
  date: string; // "YYYY-MM-DD"
  timeSlot: string; // "10:00"
  clientName: string;
  clientPhone: string;
  notes: string;
}

export interface Reservation {
  id: string;
  created_at: string;
  date: string;
  time_start: string;
  type: "vestido" | "traje";
  fitting_room: number | null;
  client_name: string;
  client_phone: string;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled";
}

export type BookingStep = 1 | 2 | 3;
