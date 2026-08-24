import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  tone?: "parchment" | "paper" | "oat" | "dark" | "pandan" | "cherry-wash" | "pandan-wash";
  spacing?: "compact" | "default" | "generous";
  /** Fade from white into this dark section's top edge. */
  blendIn?: boolean;
  /** Fade from this dark section's bottom edge back to white. */
  blendOut?: boolean;
} & HTMLAttributes<HTMLElement>;

export function Section({
  children,
  className = "",
  tone = "parchment",
  spacing = "default",
  blendIn = false,
  blendOut = false,
  ...props
}: SectionProps) {
  const dark = tone === "dark" || tone === "pandan";
  const blendClass = dark && blendIn ? styles.blendIn : "";
  const blendOutClass = dark && blendOut ? styles.blendOut : "";
  return (
    <section
      className={`${styles.section} ${styles[tone]} ${styles[spacing]} ${blendClass} ${blendOutClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
}
