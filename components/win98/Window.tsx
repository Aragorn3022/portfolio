"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useWindowManager } from "@/components/WindowManager";

type WindowProps = {
  id: string;
  title: string;
  eyebrow?: string;
  dot?: string;
  inactive?: boolean;
  controls?: boolean;
  className?: string;
  children: ReactNode;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  baseLeft: number;
  baseTop: number;
};

const DESKTOP_QUERY = "(min-width: 721px)";
const DRAG_MARGIN = 48;

export function Window({
  id,
  title,
  eyebrow,
  dot,
  inactive,
  controls = true,
  className,
  children,
}: WindowProps) {
  const { isClosed, closeWindow } = useWindowManager();
  const closed = isClosed(id);
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const winRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function handleClose() {
    setClosing(true);
    window.setTimeout(() => {
      closeWindow(id);
      setClosing(false);
      setPos({ x: 0, y: 0 });
    }, 130);
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (!isDesktop) return;
    if ((e.target as HTMLElement).closest(".titlebar-controls")) return;
    const winEl = winRef.current;
    if (!winEl) return;
    const rect = winEl.getBoundingClientRect();
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      baseLeft: rect.left - pos.x,
      baseTop: rect.top - pos.y,
    };
    setDragging(true);
    // Capture on the same element the handlers are attached to (the
    // titlebar), not an ancestor — capturing on an ancestor redirects
    // subsequent events to fire there instead of bubbling into this
    // descendant's listeners, which silently breaks the drag.
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const el = winRef.current;
    const width = el?.offsetWidth ?? 0;

    const rawX = drag.origX + (e.clientX - drag.startX);
    const rawY = drag.origY + (e.clientY - drag.startY);

    const minLeft = DRAG_MARGIN - width;
    const maxLeft = window.innerWidth - DRAG_MARGIN;
    const maxTop = window.innerHeight - DRAG_MARGIN;

    const clampedLeft = Math.min(Math.max(drag.baseLeft + rawX, minLeft), maxLeft);
    const clampedTop = Math.min(Math.max(drag.baseTop + rawY, 0), maxTop);

    setPos({ x: clampedLeft - drag.baseLeft, y: clampedTop - drag.baseTop });
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  const transform = [
    pos.x || pos.y ? `translate(${pos.x}px, ${pos.y}px)` : null,
    closing ? "scale(0.96)" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={closed ? "hidden" : undefined}>
      {eyebrow && <p className="section-lede">{eyebrow}</p>}
      <div
        id={id}
        ref={winRef}
        className={[
          "win",
          closing ? "win-closing" : "",
          dragging ? "win-dragging" : "",
          className ?? "",
        ]
          .join(" ")
          .trim()}
        style={transform ? { transform } : undefined}
      >
        <div
          className={["titlebar", inactive ? "titlebar-inactive" : ""].join(" ").trim()}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {dot && <span className="dot" style={{ background: dot }} />}
          <strong>{title}</strong>
          {controls && (
            <div className="titlebar-controls">
              <button type="button" aria-label="Minimize">_</button>
              <button type="button" aria-label="Maximize">▢</button>
              <button type="button" aria-label="Close" onClick={handleClose}>✕</button>
            </div>
          )}
        </div>
        <div className="win-body">{children}</div>
      </div>
    </div>
  );
}
