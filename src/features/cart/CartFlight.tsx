"use client";

import { useEffect, useRef } from "react";

/**
 * Add-to-cart flight.
 *
 * A small bag arcs from the click point to the header cart. Pure Web
 * Animations API, skipped entirely under prefers-reduced-motion. The cart
 * count pop is handled by the header itself.
 */
export function CartFlight() {
  const originRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const onPointerDown = (event: PointerEvent) => {
      originRef.current = { x: event.clientX, y: event.clientY };
    };
    const onAdd = () => {
      const cart = document.getElementById("header-cart");
      if (!cart) return;
      const target = cart.getBoundingClientRect();
      const from = originRef.current;
      const to = { x: target.left + target.width / 2, y: target.top + target.height / 2 };

      const ghost = document.createElement("div");
      ghost.setAttribute("aria-hidden", "true");
      ghost.style.cssText =
        "height:44px;left:0;pointer-events:none;position:fixed;top:0;width:35px;z-index:90;";
      ghost.innerHTML =
        '<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg"><rect fill="oklch(0.55 0.13 45)" height="286" rx="8" width="228" x="46" y="76"/><rect fill="oklch(0.44 0.11 45)" height="30" rx="6" width="228" x="46" y="46"/><rect fill="oklch(0.99 0.004 95)" height="120" stroke="oklch(0.24 0.035 165)" stroke-width="6" width="150" x="85" y="160"/></svg>';
      document.body.append(ghost);

      const midX = (from.x + to.x) / 2;
      const midY = Math.min(from.y, to.y) - 120;
      const animation = ghost.animate(
        [
          { opacity: 1, transform: `translate(${from.x - 17}px, ${from.y - 22}px) scale(1) rotate(0deg)` },
          { opacity: 0.95, transform: `translate(${midX - 17}px, ${midY}px) scale(0.72) rotate(14deg)`, offset: 0.55 },
          { opacity: 0.35, transform: `translate(${to.x - 17}px, ${to.y - 22}px) scale(0.22) rotate(24deg)` },
        ],
        { duration: 680, easing: "cubic-bezier(0.45, 0, 0.15, 1)" },
      );
      animation.onfinish = () => ghost.remove();
      animation.oncancel = () => ghost.remove();
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("alder:add-to-cart", onAdd);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("alder:add-to-cart", onAdd);
    };
  }, []);

  return null;
}
