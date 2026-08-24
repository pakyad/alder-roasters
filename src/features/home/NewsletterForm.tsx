"use client";

import { useActionState } from "react";
import styles from "./newsletter.module.css";

type State = { status: "idle" } | { status: "success"; email: string } | { status: "error" };

/** Local demonstration only — nothing is sent or stored anywhere. */
async function subscribe(_previous: State, formData: FormData): Promise<State> {
  const email = String(formData.get("email") ?? "");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  await new Promise((resolve) => setTimeout(resolve, 400));
  return valid ? { status: "success", email } : { status: "error" };
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, { status: "idle" } as State);

  if (state.status === "success") {
    return (
      <div className={styles.form}>
        <p className={styles.success} role="status">
          Noted — a seasonal letter would land at {state.email} around the first roast of each
          month. This demonstration stores nothing.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className={styles.form}>
      <label htmlFor="newsletter-email">A short letter, monthly-ish</label>
      <p className={styles.hint} id="newsletter-hint">
        New lots, roast notes, one useful brew idea. No discounts shouted.
      </p>
      <div className={styles.row}>
        <input
          aria-describedby="newsletter-hint"
          id="newsletter-email"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <button disabled={pending} type="submit">
          {pending ? "Adding…" : "Keep me posted"}
        </button>
      </div>
      {state.status === "error" && (
        <p className={styles.error} role="alert">
          That address does not look complete. Try again?
        </p>
      )}
    </form>
  );
}
