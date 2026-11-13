import { ViewTransition, type ReactNode } from 'react';

/** Paginatransitie: accent-curtain via View Transitions (zie globals.css, .curtain). */
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="curtain" exit="curtain" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
