import type { ReactNode } from "react";
import { ViewTransition } from "react";

/**
 * Directional page transition.
 *
 * Forward navigations slide left, back navigations slide right — the spatial
 * grammar of "going deeper" and "coming back". The site header stays anchored
 * above both (see globals.css). Pages without a transition type (browser
 * back/forward, refresh) swap instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      default="none"
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
    >
      {children}
    </ViewTransition>
  );
}
