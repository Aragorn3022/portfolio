"use client";

import { useState, type ReactNode } from "react";
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

  function handleClose() {
    setClosing(true);
    window.setTimeout(() => {
      closeWindow(id);
      setClosing(false);
    }, 130);
  }

  return (
    <div className={closed ? "hidden" : undefined}>
      {eyebrow && <p className="section-lede">{eyebrow}</p>}
      <div
        id={id}
        className={["win", closing ? "win-closing" : "", className ?? ""].join(" ").trim()}
      >
        <div className={["titlebar", inactive ? "titlebar-inactive" : ""].join(" ").trim()}>
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
