"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/win98/Icon";

const SECTIONS = [
  { id: "about", label: "About", icon: "notepad" as const },
  { id: "skills", label: "Skills", icon: "gear" as const },
  { id: "projects", label: "Projects", icon: "folder" as const },
  { id: "contact", label: "Contact", icon: "mail" as const },
];

function formatTime(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ap}`;
}

export function Taskbar() {
  const [clock, setClock] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [shutdownDialogOpen, setShutdownDialogOpen] = useState(false);
  const [shutdownChoice, setShutdownChoice] = useState<"stay" | "screen">("stay");
  const [shutdownScreenOpen, setShutdownScreenOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setClock(formatTime(new Date()));
    const id = window.setInterval(() => setClock(formatTime(new Date())), 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(target) &&
        startBtnRef.current &&
        !startBtnRef.current.contains(target)
      ) {
        setStartOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const effectiveDark = current ? current === "dark" : prefersDark;
    root.setAttribute("data-theme", effectiveDark ? "light" : "dark");
  }

  return (
    <>
      <div className="taskbar" role="navigation" aria-label="Taskbar">
        <button
          type="button"
          className="btn98 start-btn"
          ref={startBtnRef}
          aria-haspopup="true"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((v) => !v)}
        >
          <Icon name="computer" />
          Start
        </button>

        {startOpen && (
          <div className="start-menu raised" ref={startMenuRef}>
            <div className="start-menu-body">
              <div className="start-side">
                <span>ASWAD98</span>
              </div>
              <div className="start-list">
                <a href="#about" onClick={() => setStartOpen(false)}>
                  ▸ About
                </a>
                <a href="#skills" onClick={() => setStartOpen(false)}>
                  ▸ Control Panel (Skills)
                </a>
                <a href="#projects" onClick={() => setStartOpen(false)}>
                  ▸ My Projects
                </a>
                <a href="/resume.pdf" download onClick={() => setStartOpen(false)}>
                  ▸ Resume.pdf
                </a>
                <a href="#contact" onClick={() => setStartOpen(false)}>
                  ▸ Contact
                </a>
                <hr />
                <button
                  type="button"
                  onClick={() => {
                    setStartOpen(false);
                    setShutdownDialogOpen(true);
                  }}
                >
                  ▸ Shut Down Aswad98…
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="sep" />

        <nav className="task-buttons" aria-label="Sections">
          {SECTIONS.map(({ id, label, icon }) => (
            <a
              key={id}
              className="btn98"
              href={`#${id}`}
              aria-pressed={activeSection === id}
            >
              <Icon name={icon} />
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="theme-btn well"
          onClick={toggleTheme}
          title="Display Properties: toggle color scheme"
          aria-label="Toggle light / dark scheme"
        >
          <Icon name="sun" />
        </button>
        <div className="tray well">
          <span className="clock">{clock || "--:--"}</span>
        </div>
      </div>

      {shutdownDialogOpen && (
        <div className="shutdown-overlay">
          <div className="win shutdown-dialog">
            <div className="titlebar">
              <strong>Shut Down Aswad98</strong>
            </div>
            <div className="win-body">
              <p style={{ margin: "0 0 6px" }}>Are you sure you want to:</p>
              <label className="choice">
                <input
                  type="radio"
                  name="sd"
                  checked={shutdownChoice === "stay"}
                  onChange={() => setShutdownChoice("stay")}
                />
                Close this browser tab (kidding — stay a while)
              </label>
              <label className="choice">
                <input
                  type="radio"
                  name="sd"
                  checked={shutdownChoice === "screen"}
                  onChange={() => setShutdownChoice("screen")}
                />
                View the shutdown screen
              </label>
              <footer>
                <button
                  type="button"
                  className="btn98"
                  onClick={() => {
                    setShutdownDialogOpen(false);
                    if (shutdownChoice === "screen") setShutdownScreenOpen(true);
                  }}
                >
                  OK
                </button>
                <button type="button" className="btn98" onClick={() => setShutdownDialogOpen(false)}>
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </div>
      )}

      {shutdownScreenOpen && (
        <div
          className="shutdown-screen"
          role="button"
          tabIndex={0}
          onClick={() => setShutdownScreenOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setShutdownScreenOpen(false);
          }}
        >
          <p>
            It&apos;s now safe to close this tab.
            <br />
            <span style={{ fontSize: "12px" }}>(click anywhere to go back — this isn&apos;t 1998)</span>
          </p>
        </div>
      )}
    </>
  );
}
