import type { ComponentType, ReactNode } from "react";
import * as ReactModule from "react";

type MorphProps = {
  name: string;
  children: ReactNode;
};

type ViewTransitionComponent = ComponentType<{
  children?: ReactNode;
  name?: string;
  share?: string;
  default?: string;
}>;

/**
 * Shared-element morph wrapper with a safe fallback.
 *
 * React's <ViewTransition> ships in the canary that Next.js vendors for the
 * App Router; other environments (unit tests, plain React) do not export it.
 * There it degrades to a plain fragment — no transition, no breakage.
 */
const MaybeViewTransition = (ReactModule as unknown as { ViewTransition?: ViewTransitionComponent })
  .ViewTransition;

export function Morph({ name, children }: MorphProps) {
  if (!MaybeViewTransition) return <>{children}</>;
  return (
    <MaybeViewTransition default="none" name={name} share="morph">
      {children}
    </MaybeViewTransition>
  );
}
