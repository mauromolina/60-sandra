import { EVENT_DATE, VENUE, EVENT_INFO } from "@/lib/constants/event";

const pad = (n: number): string => n.toString().padStart(2, "0");

const formatIcsDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  return `${year}${month}${day}T${hours}${minutes}00Z`;
};

export const generateIcsFile = (): string => {
  const endDate = new Date(EVENT_DATE.getTime() + 5 * 60 * 60 * 1000);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Los 60 de Sandra//ES",
    "BEGIN:VEVENT",
    `DTSTART:${formatIcsDate(EVENT_DATE)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:Los ${EVENT_INFO.age} de ${EVENT_INFO.celebrantName}`,
    `LOCATION:${VENUE.name} - ${VENUE.address}`,
    `DESCRIPTION:¡Te esperamos para celebrar los ${EVENT_INFO.age} de ${EVENT_INFO.celebrantName}!`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};

export const downloadIcsFile = (): void => {
  const icsContent = generateIcsFile();
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "los-60-de-sandra.ics";
  link.click();
  URL.revokeObjectURL(url);
};
