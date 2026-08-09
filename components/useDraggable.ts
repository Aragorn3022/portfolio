"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from "react";

type Pos = { x: number; y: number };

const DESKTOP_QUERY = "(min-width: 721px)";
const DRAG_MARGIN = 48;
const DRAG_THRESHOLD = 4;
const ORIGIN: Pos = { x: 0, y: 0 };

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  baseLeft: number;
  baseTop: number;
  moved: boolean;
};

/**
 * Desktop-only free-dragging for an element, with its position persisted to
 * localStorage under `storageKey`. `targetRef` is measured/clamped against
 * the viewport — pass the element that actually moves (which may differ
 * from whichever element the pointer handlers are attached to, e.g. a
 * window's titlebar is the handle but the whole window is the target).
 */
export function useDraggable<T extends HTMLElement>(targetRef: RefObject<T | null>, storageKey: string) {
  const [pos, setPos] = useState<Pos>(ORIGIN);
  const [dragging, setDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dragRef = useRef<DragState | null>(null);
  const lastMovedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<Pos>;
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        setPos({ x: parsed.x, y: parsed.y });
      }
    } catch {
      // localStorage unavailable (private browsing) or a corrupt value — ignore, stay at origin
    }
  }, [storageKey]);

  function persist(next: Pos) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function onPointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (!isDesktop) return;
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      baseLeft: rect.left - pos.x,
      baseTop: rect.top - pos.y,
      moved: false,
    };
    setDragging(true);
    // Capture on the same element the handlers are attached to — capturing
    // on a different element (e.g. an ancestor) redirects subsequent events
    // to fire there instead of bubbling into these listeners.
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) drag.moved = true;

    const width = targetRef.current?.offsetWidth ?? 0;
    const minLeft = DRAG_MARGIN - width;
    const maxLeft = window.innerWidth - DRAG_MARGIN;
    const maxTop = window.innerHeight - DRAG_MARGIN;

    const clampedLeft = Math.min(Math.max(drag.baseLeft + drag.origX + dx, minLeft), maxLeft);
    const clampedTop = Math.min(Math.max(drag.baseTop + drag.origY + dy, 0), maxTop);

    setPos({ x: clampedLeft - drag.baseLeft, y: clampedTop - drag.baseTop });
  }

  function endDrag(e: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    lastMovedRef.current = drag.moved;
    dragRef.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setPos((current) => {
      persist(current);
      return current;
    });
  }

  /** Call from a click handler to tell a real drag apart from a plain click; also clears the flag. */
  function wasDragged() {
    const v = lastMovedRef.current;
    lastMovedRef.current = false;
    return v;
  }

  function resetPos() {
    setPos(ORIGIN);
    persist(ORIGIN);
  }

  return {
    pos,
    dragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    wasDragged,
    resetPos,
  };
}
