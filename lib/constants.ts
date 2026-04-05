export const WHATSAPP_NUMBER = "59891794854";

export const BUSINESS_HOURS = {
  open: 10,  // 10:00
  close: 19, // 19:00 (last slot starts at 18:00 for vestidos, 18:30 for trajes)
};

export const BUSINESS_DAYS = [1, 2, 3, 4, 5, 6]; // Lun–Sab (0=Dom, 6=Sab)

export const SLOT_CONFIG = {
  vestido: {
    duration: 60,      // minutos
    maxSimultaneous: 3, // probadores
  },
  traje: {
    duration: 30,
    maxSimultaneous: 1,
  },
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  vestido: "Vestido",
  traje: "Traje",
  accesorios: "Accesorios / Zapatos",
};
