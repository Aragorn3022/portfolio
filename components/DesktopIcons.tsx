"use client";

import { Icon } from "@/components/win98/Icon";
import { useWindowManager } from "@/components/WindowManager";

export function DesktopIcons() {
  const { navigateTo } = useWindowManager();

  return (
    <nav className="desktop-icons" aria-label="Desktop shortcuts">
      <a className="dicon" href="#about" onClick={(e) => { e.preventDefault(); navigateTo("about"); }}>
        <Icon name="computer" />
        <span>My Computer</span>
      </a>
      <a className="dicon" href="#projects" onClick={(e) => { e.preventDefault(); navigateTo("projects"); }}>
        <Icon name="folder" />
        <span>My Projects</span>
      </a>
      <a className="dicon" href="#skills" onClick={(e) => { e.preventDefault(); navigateTo("skills"); }}>
        <Icon name="gear" />
        <span>Control Panel</span>
      </a>
      <a className="dicon" href="/resume.pdf" download>
        <Icon name="doc" />
        <span>Resume.pdf</span>
      </a>
      <a className="dicon" href="#contact" onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}>
        <Icon name="mail" />
        <span>Contact</span>
      </a>
      <button type="button" className="dicon" aria-label="Deprecated Code, empty">
        <Icon name="bin" />
        <span>Deprecated Code</span>
      </button>
    </nav>
  );
}
