import { useId } from "react";

import styles from "./Steam.module.css";

/**
 * Roast-steam veil.
 *
 * Three soft wisps displaced by animated SVG turbulence — organic drift with
 * zero JavaScript and zero dependencies. Hidden entirely under
 * prefers-reduced-motion.
 */
export function Steam({ intensity = 1 }: { intensity?: number }) {
  const filterId = useId();
  const gradientId = useId();
  const baseFrequency = "0.012 0.028";

  return (
    <div aria-hidden="true" className={styles.veil} style={{ opacity: 0.55 * intensity }}>
      <svg preserveAspectRatio="none" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence
              baseFrequency={baseFrequency}
              numOctaves="2"
              seed="11"
              type="fractalNoise"
            >
              <animate
                attributeName="baseFrequency"
                dur="16s"
                repeatCount="indefinite"
                values={`${baseFrequency}; 0.017 0.036; ${baseFrequency}`}
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <linearGradient id={gradientId} x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stopColor="oklch(0.99 0.005 95)" stopOpacity="0.9" />
            <stop offset="0.55" stopColor="oklch(0.99 0.005 95)" stopOpacity="0.35" />
            <stop offset="1" stopColor="oklch(0.99 0.005 95)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter={`url(#${filterId})`}>
          <ellipse
            className={styles.wisp}
            cx="180"
            cy="190"
            fill={`url(#${gradientId})`}
            rx="90"
            ry="120"
          />
          <ellipse
            className={`${styles.wisp} ${styles.wispSlow}`}
            cx="330"
            cy="210"
            fill={`url(#${gradientId})`}
            rx="110"
            ry="140"
          />
          <ellipse
            className={`${styles.wisp} ${styles.wispLate}`}
            cx="470"
            cy="185"
            fill={`url(#${gradientId})`}
            rx="80"
            ry="110"
          />
        </g>
      </svg>
    </div>
  );
}
