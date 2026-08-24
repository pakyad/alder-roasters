"use client";

import { useState } from "react";
import styles from "../cart/Commerce.module.css";
import noteStyles from "./gift-note.module.css";

const MAX_CHARS = 180;

/**
 * Gift-note studio.
 *
 * The customer writes a short note and watches it set on a typographic
 * enclosure card in real time. The note is part of the demo order summary only;
 * nothing is transmitted or stored beyond the session.
 */
export function GiftNoteStudio() {
  const [note, setNote] = useState("");
  const [to, setTo] = useState("");
  const remaining = MAX_CHARS - note.length;

  return (
    <fieldset className={noteStyles.fieldset}>
      <legend>Gifting? Add a note.</legend>
      <div className={styles.field}>
        <label htmlFor="gift-to">Signed to (optional)</label>
        <input
          id="gift-to"
          maxLength={40}
          onChange={(event) => setTo(event.target.value)}
          placeholder="Amira"
          value={to}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="gift-note">Your note (optional)</label>
        <textarea
          id="gift-note"
          maxLength={MAX_CHARS}
          onChange={(event) => setNote(event.target.value)}
          placeholder="For slow Sunday mornings."
          rows={3}
          value={note}
        />
        <p className={noteStyles.counter} aria-live="polite">
          {remaining} characters left
        </p>
      </div>
      {(note || to) && (
        <div aria-label="Gift card preview" className={noteStyles.card} role="img">
          <span className={noteStyles.mark}>ALDER</span>
          {to && <p className={noteStyles.to}>For {to},</p>}
          {note ? (
            <p className={noteStyles.note}>{note}</p>
          ) : (
            <p className={`${noteStyles.note} ${noteStyles.placeholder}`}>Your note appears here.</p>
          )}
          <span className={noteStyles.from}>— from the ALDER roastery bench</span>
        </div>
      )}
    </fieldset>
  );
}
