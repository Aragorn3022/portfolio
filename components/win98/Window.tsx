"use client";

import { useRef, useState, type ReactNode } from "react";
import { useDraggable } from "@/components/useDraggable";
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
  const winRef = useRef<HTMLDivElement>(null);
  const drag = useDraggable(winRef, `aswad98:win:${id}`);

  function handleClose() {
    setClosing(true);
    window.setTimeout(() => {
      closeWindow(id);
      setClosing(false);
      // Position is intentionally kept (not reset) so it survives close/reopen
      // and page reloads via localStorage, per the persisted-position feature.
    }, 130);
  }

  const transform = [
    drag.pos.x || drag.pos.y ? `translate(${drag.pos.x}px, ${drag.pos.y}px)` : null,
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
          drag.dragging ? "win-dragging" : "",
          className ?? "",
        ]
          .join(" ")
          .trim()}
        style={transform ? { transform } : undefined}
      >
        <div
          className={["titlebar", inactive ? "titlebar-inactive" : ""].join(" ").trim()}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest(".titlebar-controls")) return;
            drag.onPointerDown(e);
          }}
          onPointerMove={drag.onPointerMove}
          onPointerUp={drag.onPointerUp}
          onPointerCancel={drag.onPointerCancel}
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
