import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
};

type AnchorButtonProps = BaseProps & {
  href: string;
  /** View-transition types forwarded to the underlying Link. */
  transitionTypes?: string[];
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ActionButtonProps = BaseProps & {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | ActionButtonProps;

function omit<T extends object, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K> {
  const result = { ...object };
  for (const key of keys) delete result[key];
  return result;
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const classes = `${styles.button} ${styles[variant]} ${props.className ?? ""}`.trim();

  if (props.href !== undefined) {
    const anchorProps = omit(
      props as AnchorButtonProps,
      "children",
      "variant",
      "className",
      "href",
    );
    return (
      <Link className={classes} href={props.href} {...anchorProps}>
        {props.children}
      </Link>
    );
  }

  const buttonProps = omit(props as ActionButtonProps, "children", "variant", "className");
  const type = (props as ActionButtonProps).type ?? "button";
  return (
    <button className={classes} type={type} {...buttonProps}>
      {props.children}
    </button>
  );
}
