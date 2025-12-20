import { DayMetrics } from "./history-dashboard";

const MS_PER_DAY = 86_400_000;

const startOfDay = (date: Date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const referenceToday = startOfDay(new Date());

const addDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * MS_PER_DAY);
};

const formatISODateLocal = (date: Date): string => {
  return startOfDay(date).toLocaleDateString("en-CA");
};
// Relative day offsets (in days) for each mock entry,
// keeping dates near the current day across weeks.
const offsets: number[] = [
  0, -1, -7, -8, -14, -15, -21, -22, -28, -29, -35, -36, -42,
];

// Base metrics for each entry; dates are applied dynamically.
const baseMetrics: Array<Omit<DayMetrics, "date">> = [
  {
    volunteers: 12,
    hours: 48,
    mealsDistributed: 320,
    familiesServed: 85,
    activities: ["Food Drive", "Distribution"],
  },
  {
    volunteers: 18,
    hours: 72,
    mealsDistributed: 450,
    familiesServed: 120,
    activities: ["Community Event", "Sorting"],
  },
  {
    volunteers: 8,
    hours: 32,
    mealsDistributed: 210,
    familiesServed: 62,
    activities: ["Inventory Count"],
  },
  {
    volunteers: 24,
    hours: 96,
    mealsDistributed: 580,
    familiesServed: 145,
    activities: ["Mobile Pantry", "Distribution"],
  },
  {
    volunteers: 15,
    hours: 60,
    mealsDistributed: 380,
    familiesServed: 95,
    activities: ["Food Sorting", "Delivery"],
  },
  {
    volunteers: 20,
    hours: 80,
    mealsDistributed: 490,
    familiesServed: 128,
    activities: ["Distribution", "Donation Pickup"],
  },
  {
    volunteers: 32,
    hours: 128,
    mealsDistributed: 720,
    familiesServed: 185,
    activities: ["Thanksgiving Prep", "Distribution"],
  },
  {
    volunteers: 10,
    hours: 40,
    mealsDistributed: 260,
    familiesServed: 70,
    activities: ["Food Sorting"],
  },
  {
    volunteers: 14,
    hours: 56,
    mealsDistributed: 350,
    familiesServed: 92,
    activities: ["Food Drive"],
  },
  {
    volunteers: 22,
    hours: 88,
    mealsDistributed: 520,
    familiesServed: 138,
    activities: ["Distribution", "Community Event"],
  },
  {
    volunteers: 16,
    hours: 64,
    mealsDistributed: 410,
    familiesServed: 108,
    activities: ["Mobile Pantry"],
  },
  {
    volunteers: 19,
    hours: 76,
    mealsDistributed: 470,
    familiesServed: 122,
    activities: ["Distribution", "Sorting"],
  },
  {
    volunteers: 28,
    hours: 112,
    mealsDistributed: 640,
    familiesServed: 168,
    activities: ["Distribution"],
  },
];

const calendarEntries: DayMetrics[] = baseMetrics.map((metrics, idx) => ({
  date: formatISODateLocal(addDays(referenceToday, offsets[idx])),
  ...metrics,
}));

const dateToRelativeKeyInternal = (dateStr: string): string => {
  const target = startOfDay(new Date(dateStr));
  const diffDays = Math.round(
    (target.getTime() - referenceToday.getTime()) / MS_PER_DAY,
  );
  return diffDays.toString();
};

export const getRelativeKeyForDate = (date: Date): string => {
  const target = startOfDay(date);
  const diffDays = Math.round(
    (target.getTime() - referenceToday.getTime()) / MS_PER_DAY,
  );
  return diffDays.toString();
};

export const CalendarMockData: { [key: string]: DayMetrics } =
  Object.fromEntries(
    calendarEntries.map((entry) => [
      dateToRelativeKeyInternal(entry.date),
      entry,
    ]),
  );

export const CalendarEntries = calendarEntries;
