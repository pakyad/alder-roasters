import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  tone?: "parchment" | "paper" | "oat" | "dark" | "pandan" | "cherry-wash" | "pandan-wash";
  spacing?: "compact" | "default" | "generous";
} & HTMLAttributes<HTMLElement>;

export function Section({
  children,
  className = "",
  tone = "parchment",
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={`${styles.section} ${styles[tone]} ${styles[spacing]} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
}
