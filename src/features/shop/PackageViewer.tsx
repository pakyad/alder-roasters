"use client";

import { useCallback, useRef, useState } from "react";

import { Morph } from "@/components/motion/Morph";

import { ProductBag, ProductBagBack } from "../catalogue/ProductBag";
import styles from "./package-viewer.module.css";

/**
 * Tactile package viewer.
 *
 * The bag rotates in CSS 3D — drag to spin, arrow keys to turn, or press the
 * flip control for a direct front/back swap. On release the bag settles to the
 * nearest face with a spring. The bag participates in shared-element morphs
 * from the shop grid. Reduced-motion users get an instant face toggle.
 */
export function PackageViewer({ coffee }: { coffee: import("@/domain/coffee").Coffee }) {
  const [rotation, setRotation] = useState(0);
  const [settling, setSettling] = useState(false);
  const dragging = useRef<{ startX: number; startRotation: number } | null>(null);

  const snapTo = useCallback((target: number) => {
    setSettling(true);
    setRotation(target);
    window.setTimeout(() => setSettling(false), 560);
  }, []);

  const flip = useCallback(() => {
    snapTo(rotation >= 90 ? 0 : 180);
  }, [rotation, snapTo]);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = { startX: event.clientX, startRotation: rotation };
    setSettling(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = event.clientX - dragging.current.startX;
    setRotation(dragging.current.startRotation + delta * 0.6);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = null;
    setRotation((current) => {
      const target = Math.round(current / 180) * 180;
      if (target !== current) {
        setSettling(true);
        window.setTimeout(() => setSettling(false), 560);
      }
      return target;
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      snapTo(rotation - 180);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      snapTo(rotation + 180);
    }
  };

  return (
    <div className={styles.stage}>
      <Morph name={`bag-${coffee.id}`}>
        <div
          className={styles.scene}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label={`${coffee.name} bag, drag or use arrow keys to turn`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <div
            className={`${styles.card} ${settling ? styles.settling : ""}`}
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            <div className={styles.face}>
              <ProductBag coffee={coffee} />
            </div>
            <div className={styles.faceBack}>
              <ProductBagBack coffee={coffee} />
            </div>
          </div>
        </div>
      </Morph>
      <div className={styles.controls}>
        <button onClick={flip} type="button">
          Turn the bag over
        </button>
        <p className="sr-only" role="status">
          Showing {rotation >= 90 ? "the back" : "the front"} of the bag.
        </p>
      </div>
    </div>
  );
}
