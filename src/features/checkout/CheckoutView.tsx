"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Container } from "@/components/ui";
import { CART_STORAGE_KEY, cartTotal, useCart } from "@/features/cart";
import { formatMoney } from "@/lib/money";
import { validateCheckout, type CheckoutErrors, type CheckoutFields } from "./validation";
import styles from "../cart/Commerce.module.css";

const initial: CheckoutFields = { name: "", email: "", address: "", city: "", postcode: "" };
export function CheckoutView() {
  const router = useRouter();
  const { displayLines, hydrated, dispatch } = useCart();
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const subtotal = cartTotal(displayLines);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = validateCheckout(fields);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    setSubmitting(true);
    window.sessionStorage.setItem(
      "alder-demo-order",
      JSON.stringify({ name: fields.name, total: subtotal.amount, items: displayLines.length }),
    );
    window.localStorage.removeItem(CART_STORAGE_KEY);
    dispatch({ type: "clear" });
    router.push("/checkout/confirmation");
  };
  if (!hydrated)
    return (
      <Container className={styles.page}>
        <p role="status">Preparing demo checkout…</p>
      </Container>
    );
  if (!displayLines.length)
    return (
      <Container className={`${styles.page} ${styles.empty}`} size="narrow">
        <p className="eyebrow">Demonstration checkout</p>
        <h1>Your cart is empty.</h1>
        <p>Add coffee before beginning the checkout demonstration.</p>
        <Button href="/shop">Shop coffee</Button>
      </Container>
    );
  return (
    <Container className={styles.page}>
      <header className={styles.intro}>
        <p className="eyebrow">Demonstration checkout</p>
        <h1>Where should this fictional order go?</h1>
        <p className="lead">
          No payment is taken and no order is sent. Please use sample details rather than sensitive
          personal information.
        </p>
      </header>
      <div className={styles.split}>
        <form className={styles.config} noValidate onSubmit={submit}>
          {Object.keys(errors).length > 0 && (
            <div className={styles.errorSummary} ref={errorRef} role="alert" tabIndex={-1}>
              <h2>Check the highlighted fields</h2>
              <ul>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <fieldset>
            <legend>Contact</legend>
            <Field
              id="name"
              label="Recipient name"
              value={fields.name}
              error={errors.name}
              onChange={(value) => setFields({ ...fields, name: value })}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={fields.email}
              error={errors.email}
              onChange={(value) => setFields({ ...fields, email: value })}
            />
          </fieldset>
          <fieldset>
            <legend>Delivery address</legend>
            <Field
              id="address"
              label="Street address"
              value={fields.address}
              error={errors.address}
              onChange={(value) => setFields({ ...fields, address: value })}
            />
            <Field
              id="city"
              label="City"
              value={fields.city}
              error={errors.city}
              onChange={(value) => setFields({ ...fields, city: value })}
            />
            <Field
              id="postcode"
              label="Postcode"
              inputMode="numeric"
              value={fields.postcode}
              error={errors.postcode}
              onChange={(value) => setFields({ ...fields, postcode: value })}
            />
          </fieldset>
          <fieldset>
            <legend>Shipping</legend>
            <label className={styles.shipping}>
              <input defaultChecked name="shipping" type="radio" />{" "}
              <span>
                <strong>Standard demo shipping · Free</strong>
                <br />
                Fictional delivery in 2–4 working days.
              </span>
            </label>
          </fieldset>
          <section className={styles.demoNote} aria-labelledby="payment-title">
            <h2 id="payment-title">Portfolio demo payment</h2>
            <p>
              Preselected for this simulation. There are intentionally no card fields, and no
              payment details are collected.
            </p>
          </section>
          <Button disabled={submitting} type="submit">
            {submitting ? "Completing demonstration…" : "Place demonstration order"}
          </Button>
        </form>
        <aside className={styles.summary}>
          <h2>Order summary</h2>
          {displayLines.map((line) => (
            <div className={styles.totalRow} key={line.id}>
              <span>
                {line.quantity} × {line.name}
              </span>
              <span>{formatMoney(line.total)}</span>
            </div>
          ))}
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <strong>Total</strong>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <p className="text-secondary">No tax, payment or fulfilment is processed.</p>
        </aside>
      </div>
    </Container>
  );
}

function Field({
  id,
  label,
  error,
  onChange,
  ...props
}: {
  id: keyof CheckoutFields;
  label: string;
  error?: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "onChange">) {
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
      {error && (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
