"use client";

import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { formatMoney } from "@/lib/money";
import { cartTotal } from "./cart-store";
import { useCart } from "./CartProvider";
import styles from "./Commerce.module.css";

const SHIPPING_THRESHOLD = 15000;

export function CartView() {
  const { displayLines, hydrated, dispatch } = useCart();
  const subtotal = cartTotal(displayLines);
  const remaining = Math.max(0, SHIPPING_THRESHOLD - subtotal.amount);
  if (!hydrated)
    return (
      <Container className={styles.page}>
        <h1 className="sr-only">Your cart</h1>
        <p role="status">Loading your cart…</p>
      </Container>
    );
  if (!displayLines.length)
    return (
      <Container className={`${styles.page} ${styles.empty}`} size="narrow">
        <p className="eyebrow">Your cart</p>
        <h1>Good coffee starts with a choice.</h1>
        <p className="lead">
          Your cart is empty. Explore the current harvests or build a flexible coffee subscription.
        </p>
        <div className={styles.actions}>
          <Button href="/shop">Shop coffee</Button>
          <Button href="/subscriptions" variant="secondary">
            Build a subscription
          </Button>
        </div>
      </Container>
    );
  return (
    <Container className={styles.page}>
      <header className={styles.intro}>
        <p className="eyebrow">Your cart</p>
        <h1>Review your coffee</h1>
        <p className="text-secondary">
          Prices are in Malaysian ringgit. Recurring items are clearly marked below.
        </p>
      </header>
      <div className={styles.split}>
        <section aria-label="Cart items" className={styles.lines}>
          {displayLines.map((line) => (
            <article className={styles.line} key={line.id}>
              <div>
                <p className="eyebrow">
                  {line.kind === "plan" || line.purchaseType === "subscription"
                    ? "Recurring"
                    : "One-time"}
                </p>
                <h2 className={styles.lineTitle}>{line.name}</h2>
                <p className="text-secondary">{line.detail}</p>
              </div>
              <div className={styles.lineControls}>
                <label htmlFor={`quantity-${line.id}`}>Quantity</label>
                <select
                  id={`quantity-${line.id}`}
                  value={line.quantity}
                  onChange={(event) =>
                    dispatch({
                      type: "quantity",
                      id: line.id,
                      quantity: Number(event.target.value),
                    })
                  }
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((quantity) => (
                    <option key={quantity}>{quantity}</option>
                  ))}
                </select>
                <strong>{formatMoney(line.total)}</strong>
                <button
                  className={styles.textButton}
                  onClick={() => dispatch({ type: "remove", id: line.id })}
                >
                  Remove <span className="sr-only">{line.name}</span>
                </button>
              </div>
            </article>
          ))}
        </section>
        <aside className={styles.summary} aria-labelledby="summary-heading">
          <h2 id="summary-heading">Order summary</h2>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <p>
            {remaining
              ? `${formatMoney({ currency: "MYR", amount: remaining })} away from free demo shipping.`
              : "You’ve reached free demo shipping."}
          </p>
          <progress
            aria-label="Free shipping progress"
            max={SHIPPING_THRESHOLD}
            value={Math.min(subtotal.amount, SHIPPING_THRESHOLD)}
          />
          <p className="text-secondary">
            Shipping and any recurring schedule are shown again before you place the demonstration
            order.
          </p>
          <Button href="/checkout">Continue to demo checkout</Button>
          <Link href="/shop">Continue shopping</Link>
        </aside>
      </div>
    </Container>
  );
}
