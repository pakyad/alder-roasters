"use client";

import { useEffect, useState } from "react";

import {
  formatCutoffDate,
  formatRoastDate,
  peakWindow,
  roastWeekForOrder,
} from "@/domain/roast-schedule";
import styles from "./roast-week.module.css";

/**
 * Freshness honesty panel.
 *
 * Shows the real roast-week arithmetic — when this order is roasted, when it
 * dispatches, and when the coffee peaks. Deliberately anti-urgency: no
 * countdowns, no pressure, just the schedule a good roaster would tell you on
 * the phone. Rendered client-side so dates are always current for the visitor.
 */
export function RoastWeekPanel() {
  const [week, setWeek] = useState<ReturnType<typeof roastWeekForOrder> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setWeek(roastWeekForOrder(new Date())), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section aria-label="Roast and dispatch schedule" className={styles.panel}>
      <p className="eyebrow">The roast week</p>
      <h2 className={styles.heading}>We roast every Tuesday.</h2>
      <dl className={styles.schedule}>
        <div>
          <dt>Order by</dt>
          <dd>{week ? formatCutoffDate(week.cutoffDate) : "Sunday night (MYT)"}</dd>
        </div>
        <div>
          <dt>Roasted</dt>
          <dd>{week ? formatRoastDate(week.roastDate) : "the following Tuesday"}</dd>
        </div>
        <div>
          <dt>Dispatched</dt>
          <dd>{week ? formatRoastDate(week.dispatchDate) : "that Thursday"}</dd>
        </div>
        <div>
          <dt>Peaks</dt>
          <dd>
            {week
              ? `${formatRoastDate(peakWindow(week.roastDate).opensOn)} – ${formatRoastDate(
                  peakWindow(week.roastDate).closesOn,
                )}`
              : "days 7–28 after roast"}
          </dd>
        </div>
      </dl>
      {week?.rolledToNextRoast && week.missedRoastDate && (
        <p className={styles.note}>
          Sunday&rsquo;s cutoff for the {formatRoastDate(week.missedRoastDate)} roast has passed, so
          your coffee joins the {formatRoastDate(week.roastDate)} roast — same care, one week later.
        </p>
      )}
      <p className={styles.principle}>
        Freshness is a window, not a countdown. Coffee rests after roasting, drinks best in its
        third to fourth week, and never needs to be rushed.
      </p>
    </section>
  );
}
