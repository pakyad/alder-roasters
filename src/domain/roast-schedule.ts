/**
 * Roast-week rhythm for the fictional ALDER roastery.
 *
 * Canon: coffee is roasted every Tuesday in Petaling Jaya (MYT, UTC+8 — no DST).
 * A roast week is governed by its Sunday 23:59 MYT cutoff two nights before the
 * roast; orders after the cutoff roll to the following roast week. Dispatch is
 * on the Thursday of the roast week.
 *
 * Every exported Date is a real instant. Internal helpers convert between real
 * time and MYT calendar fields explicitly, so results never depend on the host
 * machine's timezone.
 */

const ROAST_WEEKDAY = 2; // Tuesday
const CUTOFF_HOUR = 23;
const CUTOFF_MINUTE = 59;
const DISPATCH_DAYS_AFTER_ROAST = 2;
const DAYS_FROM_CUTOFF_TO_ROAST = 2;
const MS_PER_DAY = 86_400_000;
const MYT_MS = 8 * 3_600_000;

export const PEAK_WINDOW_START_DAY = 7;
export const PEAK_WINDOW_END_DAY = 28;

interface MytFields {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly weekday: number;
}

/** Calendar fields for `now` as seen on the wall in MYT. */
function mytFields(now: Date): MytFields {
  const shifted = new Date(now.getTime() + MYT_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
  };
}

/** Calendar fields shifted forward by whole days, without DST concerns. */
function shiftFields(fields: MytFields, days: number): MytFields {
  const base = new Date(Date.UTC(fields.year, fields.month, fields.day) + days * MS_PER_DAY);
  return {
    year: base.getUTCFullYear(),
    month: base.getUTCMonth(),
    day: base.getUTCDate(),
    weekday: base.getUTCDay(),
  };
}

/** Real instant for MYT wall-clock fields at hour:minute. */
function realInstant(fields: MytFields, hour: number, minute: number): Date {
  return new Date(Date.UTC(fields.year, fields.month, fields.day, hour, minute) - MYT_MS);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

/** Forward distance in days from one weekday to another. */
function daysUntil(fromWeekday: number, toWeekday: number): number {
  return (toWeekday - fromWeekday + 7) % 7;
}

/** Next Tuesday, 00:00 MYT, on or after `now` in MYT terms. */
export function nextRoastDate(now: Date): Date {
  const today = mytFields(now);
  return realInstant(shiftFields(today, daysUntil(today.weekday, ROAST_WEEKDAY)), 0, 0);
}

/** Sunday 23:59 MYT deadline two nights before the given Tuesday roast. */
function governingCutoff(roastDate: Date): Date {
  const fields = mytFields(roastDate);
  return realInstant(shiftFields(fields, -DAYS_FROM_CUTOFF_TO_ROAST), CUTOFF_HOUR, CUTOFF_MINUTE);
}

export interface CurrentCutoff {
  /** The Sunday 23:59 MYT deadline relevant to an order placed now. */
  cutoff: Date;
  /** True when the governing cutoff has passed and the order rolls forward. */
  passed: boolean;
}

/**
 * The cutoff an order placed at `now` is measured against: the coming
 * Sunday–Tuesday pair. After the Sunday deadline (including on roast day
 * itself), both roll one week forward.
 */
export function currentCutoff(now: Date): CurrentCutoff {
  const cutoff = governingCutoff(nextRoastDate(now));
  if (now.getTime() <= cutoff.getTime()) return { cutoff, passed: false };
  return { cutoff: addDays(cutoff, 7), passed: true };
}

export interface RoastWeek {
  /** Tuesday roast date, 00:00 MYT. */
  roastDate: Date;
  /** Sunday 23:59 MYT ordering deadline for that roast. */
  cutoffDate: Date;
  /** Thursday dispatch date, 00:00 MYT. */
  dispatchDate: Date;
  /** The Tuesday roast the order missed; present only when it rolled forward. */
  missedRoastDate?: Date;
  /** True when the order missed the cutoff and joins the following roast. */
  rolledToNextRoast: boolean;
}

/** The roast week an order placed at `now` would join. */
export function roastWeekForOrder(now: Date): RoastWeek {
  const roastDate = nextRoastDate(now);
  const cutoff = governingCutoff(roastDate);
  const missed = now.getTime() > cutoff.getTime();
  const finalRoast = missed ? addDays(roastDate, 7) : roastDate;
  const finalCutoff = missed ? addDays(cutoff, 7) : cutoff;
  return {
    roastDate: finalRoast,
    cutoffDate: finalCutoff,
    dispatchDate: addDays(finalRoast, DISPATCH_DAYS_AFTER_ROAST),
    missedRoastDate: missed ? roastDate : undefined,
    rolledToNextRoast: missed,
  };
}

/** Freshness window for a roasted batch as inclusive real instants. */
export function peakWindow(roastDate: Date): { opensOn: Date; closesOn: Date } {
  return {
    opensOn: addDays(roastDate, PEAK_WINDOW_START_DAY),
    closesOn: addDays(roastDate, PEAK_WINDOW_END_DAY),
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  timeZone: "Asia/Kuala_Lumpur",
  weekday: "short",
  day: "numeric",
  month: "short",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-MY", {
  timeZone: "Asia/Kuala_Lumpur",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatRoastDate(date: Date): string {
  return dateFormatter.format(date);
}

export function formatCutoffDate(date: Date): string {
  return `${dateTimeFormatter.format(date)} MYT`;
}
