export const EVENT_DATE = new Date(
  process.env.NEXT_PUBLIC_EVENT_DATE || "2026-05-22T21:00:00-03:00",
);

export const VENUE = {
  name: "Glow Multieventos",
  address: "Av. Mitre 1043",
  city: "Berazategui",
  mapUrl: "",
} as const;

export const DRESS_CODE = {
  style: "Elegante Sport",
  colors: "Tonos claros y pasteles",
} as const;

export const EVENT_INFO = {
  celebrantName: "Sandra",
  age: 60,
  year: 2026,
} as const;
