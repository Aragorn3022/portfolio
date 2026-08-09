"use client";

import { useRef } from "react";
import { Icon, type IconName } from "@/components/win98/Icon";
import { useDraggable } from "@/components/useDraggable";
import { useWindowManager } from "@/components/WindowManager";

function DraggableIconLink({
  storageId,
  href,
  download,
  navigateId,
  icon,
  label,
}: {
  storageId: string;
  href: string;
  download?: boolean;
  navigateId?: string;
  icon: IconName;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const drag = useDraggable(ref, `aswad98:icon:${storageId}`);
  const { navigateTo } = useWindowManager();

  return (
    <a
      ref={ref}
      className={["dicon", drag.dragging ? "dicon-dragging" : ""].join(" ").trim()}
      href={href}
      download={download}
      draggable={false}
      style={drag.pos.x || drag.pos.y ? { transform: `translate(${drag.pos.x}px, ${drag.pos.y}px)` } : undefined}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerCancel}
      onClick={(e) => {
        // A real drag shouldn't also trigger the icon's normal action.
        if (drag.wasDragged()) {
          e.preventDefault();
          return;
        }
        if (navigateId) {
          e.preventDefault();
          navigateTo(navigateId);
        }
      }}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </a>
  );
}

function DraggableBin() {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useDraggable(ref, "aswad98:icon:bin");

  return (
    <button
      ref={ref}
      type="button"
      className={["dicon", drag.dragging ? "dicon-dragging" : ""].join(" ").trim()}
      style={drag.pos.x || drag.pos.y ? { transform: `translate(${drag.pos.x}px, ${drag.pos.y}px)` } : undefined}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerCancel}
      aria-label="Deprecated Code, empty"
    >
      <Icon name="bin" />
      <span>Deprecated Code</span>
    </button>
  );
}

export function DesktopIcons() {
  return (
    <nav className="desktop-icons" aria-label="Desktop shortcuts">
      <DraggableIconLink storageId="computer" href="#about" navigateId="about" icon="computer" label="My Computer" />
      <DraggableIconLink storageId="projects" href="#projects" navigateId="projects" icon="folder" label="My Projects" />
      <DraggableIconLink storageId="control-panel" href="#skills" navigateId="skills" icon="gear" label="Control Panel" />
      <DraggableIconLink storageId="resume" href="/resume.pdf" download icon="doc" label="Resume.pdf" />
      <DraggableIconLink storageId="contact" href="#contact" navigateId="contact" icon="mail" label="Contact" />
      <DraggableBin />
    </nav>
  );
}
