import type { ComponentType, ReactNode } from "react";

/**
 * Type shim for React's <ViewTransition> (shipped in the React canary that
 * Next.js 16 vendors for the App Router, but not yet in @types/react).
 * Props follow the Next.js view-transitions guide.
 */
declare module "react" {
  export type ViewTransitionAnimation =
    string | ({ default?: string } & Record<string, string | undefined>);

  export interface ViewTransitionProps {
    children?: ReactNode;
    name?: string;
    default?: string;
    enter?: ViewTransitionAnimation;
    exit?: ViewTransitionAnimation;
    share?: ViewTransitionAnimation;
    update?: ViewTransitionAnimation;
  }

  export const ViewTransition: ComponentType<ViewTransitionProps>;
}
