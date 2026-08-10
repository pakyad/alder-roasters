"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container } from "@/components/ui";
import { subscriptionPlans } from "@/content/subscriptions";
import type { GrindOption } from "@/domain/coffee";
import { formatMoney, multiplyMoney } from "@/lib/money";
import { labelGrind, planLineId, useCart } from "@/features/cart";
import styles from "../cart/Commerce.module.css";

export function SubscriptionConfigurator() {
  const router = useRouter();
  const { addLine } = useCart();
  const [planId, setPlanId] = useState<(typeof subscriptionPlans)[number]["id"]>("roasters-choice");
  const [bags, setBags] = useState<1 | 2 | 3>(1);
  const [grind, setGrind] = useState<GrindOption>("whole-bean");
  const [cadence, setCadence] = useState<2 | 4>(4);
  const plan = subscriptionPlans.find((item) => item.id === planId) ?? subscriptionPlans[0];
  const recurring = multiplyMoney(plan.pricePerBag, bags);
  const add = () => {
    addLine({
      kind: "plan",
      id: planLineId(planId, bags, grind, cadence),
      planId,
      bags,
      grind,
      cadenceWeeks: cadence,
      quantity: 1,
    });
    router.push("/cart");
  };
  return (
    <Container className={styles.page}>
      <header className={styles.intro}>
        <p className="eyebrow">Subscriptions</p>
        <h1>A steady rhythm, without the guesswork.</h1>
        <p className="lead">
          Choose a rotating seasonal coffee or keep one familiar harvest in your routine. Every plan
          is a transparent portfolio demonstration.
        </p>
      </header>
      <div className={styles.configGrid}>
        <form
          className={styles.config}
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
        >
          <fieldset>
            <legend>1. Choose your plan</legend>
            <div className={styles.optionGrid}>
              {subscriptionPlans.map((item) => (
                <label className={styles.option} key={item.id}>
                  <input
                    checked={planId === item.id}
                    name="plan"
                    onChange={() => setPlanId(item.id)}
                    type="radio"
                  />
                  <strong>{item.name}</strong>
                  <span>{item.promise}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>2. Choose quantity</legend>
            <div className={styles.inlineOptions}>
              {plan.quantities.map((value) => (
                <label key={value}>
                  <input
                    checked={bags === value}
                    name="bags"
                    onChange={() => setBags(value)}
                    type="radio"
                  />{" "}
                  {value} × 250g bag{value > 1 ? "s" : ""}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>3. Choose a grind</legend>
            <select
              aria-describedby="grind-help"
              value={grind}
              onChange={(event) => setGrind(event.target.value as GrindOption)}
            >
              {plan.compatibleGrinds.map((value) => (
                <option key={value} value={value}>
                  {labelGrind(value)}
                </option>
              ))}
            </select>
            <p id="grind-help" className="text-secondary">
              Whole bean stays freshest; choose a ground option if you do not use a grinder.
            </p>
          </fieldset>
          <fieldset>
            <legend>4. Choose delivery rhythm</legend>
            <div className={styles.inlineOptions}>
              {plan.cadencesWeeks.map((value) => (
                <label key={value}>
                  <input
                    checked={cadence === value}
                    name="cadence"
                    onChange={() => setCadence(value)}
                    type="radio"
                  />{" "}
                  Every {value} weeks
                </label>
              ))}
            </div>
          </fieldset>
          <Button type="submit">Add subscription to cart</Button>
        </form>
        <aside className={styles.summary} aria-live="polite">
          <p className="eyebrow">Your plan</p>
          <h2>{plan.name}</h2>
          <p>
            {bags} × 250g, {labelGrind(grind).toLowerCase()}, delivered every {cadence} weeks.
          </p>
          <div className={styles.totalRow}>
            <span>Recurring total</span>
            <strong>{formatMoney(recurring)}</strong>
          </div>
          <p>{plan.dispatchRule}</p>
          <p className="text-secondary">{plan.flexibilityTerms}</p>
          <p className={styles.demoNote}>
            <strong>Demonstration only.</strong> No subscription or payment will be created.
          </p>
        </aside>
      </div>
    </Container>
  );
}
