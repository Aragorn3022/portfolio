"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type WindowManagerContextValue = {
  isClosed: (id: string) => boolean;
  closeWindow: (id: string) => void;
  openWindow: (id: string) => void;
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

  return (
    <WindowManagerContext.Provider value={{ isClosed, closeWindow, openWindow }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
