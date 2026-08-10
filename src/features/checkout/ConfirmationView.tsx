"use client";
import { useEffect, useState } from "react";
import { Button, Container } from "@/components/ui";
import { formatMoney } from "@/lib/money";
import styles from "../cart/Commerce.module.css";
type DemoOrder = { name: string; total: number; items: number };
export function ConfirmationView() {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  useEffect(() => {
    let next: DemoOrder | null = null;
    try {
      const raw = sessionStorage.getItem("alder-demo-order");
      next = raw ? JSON.parse(raw) : null;
    } catch {
      next = null;
    }
    queueMicrotask(() => setOrder(next));
  }, []);
  return (
    <Container className={`${styles.page} ${styles.empty}`} size="narrow">
      <p className="eyebrow">Demonstration complete</p>
      <h1>{order ? `Thanks, ${order.name}.` : "Nothing was ordered — by design."}</h1>
      <p className="lead">
        This confirms the portfolio checkout flow only. No order, subscription, payment or delivery
        has been created.
      </p>
      {order && (
        <div className={styles.demoNote}>
          <strong>Demo summary</strong>
          <p>
            {order.items} line item{order.items === 1 ? "" : "s"} ·{" "}
            {formatMoney({ currency: "MYR", amount: order.total })}
          </p>
        </div>
      )}
      <div className={styles.actions}>
        <Button href="/shop">Return to shop</Button>
        <Button href="/brew-guides" variant="secondary">
          Read brew guides
        </Button>
      </div>
    </Container>
  );
}
