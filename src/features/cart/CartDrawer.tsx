"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { Button } from "@/components/ui";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";
import { cartTotal } from "./cart-store";
import styles from "./cart-drawer.module.css";

/**
 * Calm cart-continuity drawer.
 *
 * Opens when a line is added, never blocks browsing, and always defers to
 * `/cart` as the authoritative review surface. Focus is trapped by the native
 * dialog element, restored on close, and Escape dismisses it.
 */
export function CartDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocused = useRef<Element | null>(null);
  const { displayLines, itemCount, hydrated, dispatch } = useCart();
  const total = cartTotal(displayLines);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    lastFocused.current = document.activeElement;
    dialog.showModal();
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    dialog.close();
    const previous = lastFocused.current;
    if (previous instanceof HTMLElement) previous.focus();
  }, []);

  useEffect(() => {
    const onAdded = () => open();
    window.addEventListener("alder:add-to-cart", onAdded);
    return () => window.removeEventListener("alder:add-to-cart", onAdded);
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [close]);

  return (
    <dialog
      aria-label="Cart preview"
      className={styles.drawer}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      ref={dialogRef}
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 className={styles.title}>
            Your cart <span className={styles.count}>{hydrated ? itemCount : ""}</span>
          </h2>
          <button aria-label="Close cart" className={styles.close} onClick={close} type="button">
            ×
          </button>
        </header>

        {displayLines.length === 0 ? (
          <p className={styles.empty}>
            Nothing here yet. The current coffees are a good place to start.
          </p>
        ) : (
          <ul className={styles.lines}>
            {displayLines.map((line) => (
              <li className={styles.line} key={line.id}>
                <div>
                  <p className={styles.lineName}>{line.name}</p>
                  <p className={styles.lineDetail}>{line.detail}</p>
                </div>
                <div className={styles.lineControls}>
                  <label className="sr-only" htmlFor={`qty-${line.id}`}>
                    Quantity for {line.name}
                  </label>
                  <select
                    id={`qty-${line.id}`}
                    onChange={(event) =>
                      dispatch({
                        type: "quantity",
                        id: line.id,
                        quantity: Number(event.target.value),
                      })
                    }
                    value={line.quantity}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span className={styles.linePrice}>{formatMoney(line.total)}</span>
                  <button
                    className={styles.remove}
                    onClick={() => dispatch({ type: "remove", id: line.id })}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className={styles.foot}>
          <p className={styles.subtotal}>
            Subtotal <strong>{formatMoney(total)}</strong>
          </p>
          <div className={styles.actions}>
            <Button href="/checkout">Demo checkout</Button>
            <Link className={styles.fullCart} href="/cart" onClick={close}>
              View full cart
            </Link>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
