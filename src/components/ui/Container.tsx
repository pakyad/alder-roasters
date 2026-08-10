import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import styles from "./Container.module.css";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: "wide" | "content" | "narrow";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  size = "wide",
  ...props
}: ContainerProps<T>) {
  const Element = as ?? "div";
  return (
    <Element className={`${styles.container} ${styles[size]} ${className}`.trim()} {...props}>
      {children}
    </Element>
  );
}
