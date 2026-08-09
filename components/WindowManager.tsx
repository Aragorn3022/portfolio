"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type WindowManagerContextValue = {
  isClosed: (id: string) => boolean;
  closeWindow: (id: string) => void;
  openWindow: (id: string) => void;
  navigateTo: (id: string) => void;
};

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [closedIds, setClosedIds] = useState<Set<string>>(() => new Set());

  const closeWindow = useCallback((id: string) => {
    setClosedIds((prev) => new Set(prev).add(id));
  }, []);

  const openWindow = useCallback((id: string) => {
    setClosedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isClosed = useCallback((id: string) => closedIds.has(id), [closedIds]);

  const navigateTo = useCallback(
    (id: string) => {
      openWindow(id);
      // Wait for the reopen to actually commit and paint (the window may have
      // been display:none) before measuring its position — otherwise the
      // scroll target is computed against stale (or absent) layout, which is
      // the usual cause of "jumps to the wrong place" on mobile.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (!el) return;
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        });
      });
    },
    [openWindow]
  );

  return (
    <WindowManagerContext.Provider value={{ isClosed, closeWindow, openWindow, navigateTo }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
