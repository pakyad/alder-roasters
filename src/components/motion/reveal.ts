/**
 * Shared props for the scroll-reveal system (globals.css `[data-reveal]`).
 * `reveal(index)` staggers siblings by 80ms per step. Extra style merges in.
 */
export function reveal(
  index = 0,
  extraStyle?: React.CSSProperties,
): {
  "data-reveal": true;
  style: React.CSSProperties;
} {
  return {
    "data-reveal": true,
    style: {
      "--reveal-delay": `${Math.min(index, 8) * 80}ms`,
      ...extraStyle,
    } as React.CSSProperties,
  };
}
