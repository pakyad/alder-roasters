"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { Coffee, FlavourCharacter } from "@/domain/coffee";

import styles from "./taste-map.module.css";

/**
 * Accessible taste map.
 *
 * Two plain range inputs position a preference point on the bright↔comforting
 * and delicate↔full axes. Matching coffees are listed as text (the visual plot
 * is supplemental), and the result is reachable without JavaScript because it
 * mirrors the shop's URL-backed flavour filters. Coffee dots lean toward the
 * pointer as a playful pointer — never the only representation.
 */

const MATCH_RADIUS = 3.2;
const MAGNET_RADIUS = 96;
const MAGNET_PULL = 12;

export function TasteMapExplorer({ coffees }: { coffees: readonly Coffee[] }) {
  const [x, setX] = useState(4);
  const [y, setY] = useState(4);
  const headingId = useId();
  const plotRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const applyMagnetism = (cursorX: number, cursorY: number) => {
      for (const dot of plot.querySelectorAll<HTMLElement>(`.${styles.dot}`)) {
        const rect = dot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(cursorX - centerX, cursorY - centerY);
        if (distance < MAGNET_RADIUS && distance > 0.001) {
          const pull = (1 - distance / MAGNET_RADIUS) * MAGNET_PULL;
          dot.style.transform = `translate(calc(${((cursorX - centerX) / distance) * pull}px - 50%), calc(${
            ((cursorY - centerY) / distance) * pull
          }px + 50%)) scale(1.18)`;
        } else {
          dot.style.transform = "";
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => applyMagnetism(event.clientX, event.clientY));
    };
    const onLeave = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      for (const dot of plot.querySelectorAll<HTMLElement>(`.${styles.dot}`)) {
        dot.style.transform = "";
      }
    };

    plot.addEventListener("pointermove", onMove);
    plot.addEventListener("pointerleave", onLeave);
    return () => {
      plot.removeEventListener("pointermove", onMove);
      plot.removeEventListener("pointerleave", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const live = coffees.filter((coffee) => !coffee.archived);

  const matches = useMemo(() => {
    return live
      .map((coffee) => ({
        coffee,
        distance: Math.hypot(
          coffee.taste.coordinates.brightComforting - x,
          coffee.taste.coordinates.delicateFull - y,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .filter((entry, index) => entry.distance <= MATCH_RADIUS || index < 3)
      .slice(0, 4)
      .map((entry) => entry.coffee);
  }, [live, x, y]);

  const xLabel = x < 3.5 ? "bright" : x > 6.5 ? "comforting" : "balanced";
  const yLabel = y < 3.5 ? "delicate" : y > 6.5 ? "full" : "medium-bodied";
  const summary = `Showing ${matches.length} ${matches.length === 1 ? "coffee" : "coffees"} that are ${xLabel} and ${yLabel}.`;

  const suggestedCharacter: FlavourCharacter =
    x < 3.5 ? ("floral" as FlavourCharacter) : x > 6.5 ? ("sweet" as FlavourCharacter) : ("fruit-forward" as FlavourCharacter);

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <div className={styles.sliderBlock}>
          <label htmlFor={`${headingId}-x`}>Bright ↔ Comforting</label>
          <input
            aria-valuetext={`${xLabel} (${x} of 10)`}
            id={`${headingId}-x`}
            max={10}
            min={0}
            onChange={(event) => setX(Number(event.target.value))}
            step={0.5}
            type="range"
            value={x}
          />
          <div className={styles.scaleEnds}>
            <span>Bright</span>
            <span>Comforting</span>
          </div>
        </div>
        <div className={styles.sliderBlock}>
          <label htmlFor={`${headingId}-y`}>Delicate ↔ Full</label>
          <input
            aria-valuetext={`${yLabel} (${y} of 10)`}
            id={`${headingId}-y`}
            max={10}
            min={0}
            onChange={(event) => setY(Number(event.target.value))}
            step={0.5}
            type="range"
            value={y}
          />
          <div className={styles.scaleEnds}>
            <span>Delicate</span>
            <span>Full</span>
          </div>
        </div>
        <p className={styles.summary} role="status">
          {summary}
        </p>
      </div>

      <div aria-hidden="true" className={styles.plot}>
        <span className={styles.axisLabelY}>Delicate</span>
        <div className={styles.plotArea} ref={plotRef}>
          {live.map((coffee) => {
            const isMatch = matches.some((match) => match.id === coffee.id);
            return (
              <Link
                aria-hidden="true"
                className={`${styles.dot} ${isMatch ? styles.dotActive : ""}`}
                href={`/shop/${coffee.slug}`}
                key={coffee.id}
                tabIndex={-1}
                style={
                  {
                    left: `${coffee.taste.coordinates.brightComforting * 10}%`,
                    top: `${100 - coffee.taste.coordinates.delicateFull * 10}%`,
                    "--dot-hue": coffee.packageHue,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
        <span className={styles.axisLabelY}>Full</span>
        <div className={styles.axisLabelX}>
          <span>Bright</span>
          <span>Comforting</span>
        </div>
      </div>

      <ul className={styles.matches}>
        {matches.map((coffee) => (
          <li key={coffee.id}>
            <Link className={styles.matchCard} href={`/shop/${coffee.slug}`}>
              <span className={styles.matchName}>{coffee.name}</span>
              <span className={styles.matchOrigin}>
                {coffee.origin.country} · {coffee.process}
              </span>
              <span className={styles.matchTaste}>{coffee.taste.summary}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className={styles.mapFooter}>
        Prefer browsing?{" "}
        <Link href={`/shop?flavour=${suggestedCharacter}`}>Open this taste in the shop →</Link>
      </p>
    </div>
  );
}
