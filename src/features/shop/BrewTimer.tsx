"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Steam } from "@/components/motion/Steam";
import {
  activeSegmentIndex,
  buildTimerSegments,
  formatClock,
  type TimedStepInput,
} from "@/domain/brew-timer";
import styles from "./brew-timer.module.css";

/**
 * Guided brew session.
 *
 * A two-zone conductor: the ring carries the clock with a notch for every
 * timed step and a flame arc sweeping between them; the queue lists the whole
 * recipe with its clock marks and lights the current step. Untimed prep work
 * sits outside the clock as a pre-flight row. Idle, the panel already explains
 * the recipe — pressing start just sets it in motion.
 */
export function BrewTimer({
  guideTitle,
  steps,
  totalSeconds,
}: {
  guideTitle: string;
  steps: readonly TimedStepInput[];
  totalSeconds: number;
}) {
  const segments = useMemo(() => buildTimerSegments(steps, totalSeconds), [steps, totalSeconds]);
  const prepSteps = useMemo(() => steps.filter((step) => step.atSeconds === undefined), [steps]);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const raf = useRef<number | null>(null);
  const lastTick = useRef<number | null>(null);
  const lastIndex = useRef<number>(-1);
  const gradientId = useId();

  useEffect(() => {
    if (!running) return;
    const tick = (now: number) => {
      if (lastTick.current !== null) {
        setElapsed((current) => Math.min(totalSeconds, current + (now - lastTick.current!) / 1000));
      }
      lastTick.current = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      lastTick.current = null;
    };
  }, [running, totalSeconds]);

  const index = activeSegmentIndex(segments, elapsed);
  const current = index >= 0 ? segments[index] : null;

  useEffect(() => {
    if (!running || index === lastIndex.current) return;
    if (lastIndex.current !== -1 && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(60);
    }
    lastIndex.current = index;
  }, [index, running]);

  useEffect(() => {
    if (elapsed >= totalSeconds && running) {
      const timer = setTimeout(() => {
        setRunning(false);
        setFinished(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [elapsed, running, totalSeconds]);

  const remainingInStep = current ? current.endSeconds - elapsed : 0;
  const idle = !running && elapsed === 0 && !finished;
  const progress = totalSeconds > 0 ? Math.min(1, elapsed / totalSeconds) : 0;

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const markerAngles = segments.map(
    (segment) => (segment.startSeconds / Math.max(1, totalSeconds)) * 360 - 90,
  );
  const knobAngle = progress * 360 - 90;
  const polar = (angleDeg: number, r: number) => ({
    x: 100 + r * Math.cos((angleDeg * Math.PI) / 180),
    y: 100 + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  const reset = () => {
    lastIndex.current = -1;
    setElapsed(0);
    setFinished(false);
    setRunning(false);
  };

  return (
    <section aria-label={`Guided timer for ${guideTitle}`} className={styles.session}>
      {running && <Steam intensity={0.5} />}
      <header className={styles.sessionHead}>
        <p className="eyebrow">Brew along</p>
        <p className={styles.sessionMeta}>
          {formatClock(totalSeconds)} total · hands-free, step by step
        </p>
      </header>

      <div className={styles.sessionGrid}>
        <div className={styles.ringZone}>
          <div
            aria-hidden="true"
            className={styles.ring}
            style={{ "--progress": progress } as React.CSSProperties}
          >
            <svg viewBox="0 0 200 200">
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="oklch(0.72 0.17 48)" />
                  <stop offset="1" stopColor="oklch(0.62 0.19 25)" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                fill="none"
                r={radius}
                stroke="oklch(0.96 0.01 95 / 0.14)"
                strokeWidth="6"
              />
              <circle
                cx="100"
                cy="100"
                fill="none"
                r={radius}
                stroke={`url(#${gradientId})`}
                strokeDasharray={`${progress * circumference} ${circumference}`}
                strokeLinecap="round"
                strokeWidth="6"
                transform="rotate(-90 100 100)"
              />
              {markerAngles.map((angle, markerIndex) => {
                const point = polar(angle, radius);
                const passed = index > markerIndex || finished;
                return (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    fill={passed ? "oklch(0.72 0.17 48)" : "oklch(0.96 0.01 95 / 0.55)"}
                    key={markerIndex}
                    r="3"
                  />
                );
              })}
              {progress > 0 && !finished && (
                <circle
                  cx={polar(knobAngle, radius).x}
                  cy={polar(knobAngle, radius).y}
                  fill="oklch(0.72 0.17 48)"
                  r="5.5"
                />
              )}
            </svg>
            <div className={styles.ringReadout}>
              <span className={styles.clock}>
                {formatClock(finished ? 0 : idle ? totalSeconds : remainingInStep)}
              </span>
              <span className={styles.ringStep}>
                {finished ? "Enjoy the cup" : idle ? "Ready when you are" : current?.title}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.queueZone}>
          {prepSteps.length > 0 && (
            <div className={styles.prep}>
              <span className={styles.prepLabel}>Before you start</span>
              <ul className={styles.prepList}>
                {prepSteps.map((step) => (
                  <li key={step.title}>{step.title}</li>
                ))}
              </ul>
            </div>
          )}
          <ol className={styles.queue}>
            {segments.map((segment, segmentIndex) => {
              const state =
                finished || segmentIndex < index
                  ? "passed"
                  : segmentIndex === index
                    ? "current"
                    : "upcoming";
              return (
                <li className={styles.queueItem} data-state={state} key={segment.title}>
                  <span className={styles.queueMark}>{formatClock(segment.startSeconds)}</span>
                  <span className={styles.queueBody}>
                    <span className={styles.queueTitle}>{segment.title}</span>
                    {segmentIndex === index && !finished && (
                      <span className={styles.queueInstruction}>{segment.instruction}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className={styles.controls}>
            {!running && !finished && (
              <button onClick={() => setRunning(true)} type="button">
                Start the brew
              </button>
            )}
            {running && (
              <>
                <button onClick={() => setRunning(false)} type="button">
                  Pause
                </button>
                <button onClick={reset} type="button">
                  Restart
                </button>
              </>
            )}
            {!running && finished && (
              <button onClick={() => { lastIndex.current = -1; setElapsed(0); setFinished(false); }} type="button">
                Brew again
              </button>
            )}
          </div>
          {running && current && (
            <p className={styles.now}>
              <strong>{current.title}.</strong> {current.instruction}
            </p>
          )}
        </div>
      </div>

      <p className="sr-only" role="status">
        {finished
          ? "Brew complete. Enjoy the cup."
          : current
            ? `${current.title}: ${formatClock(remainingInStep)} remaining.`
            : `Timer ready. ${formatClock(totalSeconds)} total.`}
      </p>
    </section>
  );
}
