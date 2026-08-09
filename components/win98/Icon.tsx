export type IconName =
  | "folder"
  | "computer"
  | "notepad"
  | "gear"
  | "mail"
  | "doc"
  | "bin"
  | "sun";

export function IconSprite() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <symbol id="i-folder" viewBox="0 0 16 16">
          <rect x="1" y="4" width="6.5" height="2" fill="#ffe28a" stroke="#8a6a1f" strokeWidth="0.5" />
          <rect x="1" y="5.6" width="14" height="9" fill="#ffce54" stroke="#8a6a1f" strokeWidth="0.6" />
          <rect x="1" y="5.6" width="14" height="1.3" fill="#fff1c4" />
        </symbol>
        <symbol id="i-computer" viewBox="0 0 16 16">
          <rect x="2" y="2" width="12" height="8" fill="#c0c0c0" stroke="#000" strokeWidth="0.6" />
          <rect x="3.5" y="3.5" width="9" height="5" fill="#1084d0" />
          <rect x="6" y="10" width="4" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
          <rect x="4" y="12.6" width="8" height="1.4" fill="#808080" stroke="#000" strokeWidth="0.5" />
        </symbol>
        <symbol id="i-notepad" viewBox="0 0 16 16">
          <rect x="3" y="1.5" width="10" height="13" fill="#ffffff" stroke="#000" strokeWidth="0.6" />
          <rect x="3" y="1.5" width="10" height="2.6" fill="#000080" />
          <rect x="5" y="6.2" width="6" height="1" fill="#a0a0a0" />
          <rect x="5" y="8.2" width="6" height="1" fill="#a0a0a0" />
          <rect x="5" y="10.2" width="4" height="1" fill="#a0a0a0" />
        </symbol>
        <symbol id="i-gear" viewBox="0 0 16 16">
          <g fill="#a9a9a9" stroke="#000" strokeWidth="0.4">
            <rect x="7.1" y="0.6" width="1.8" height="2.6" />
            <rect x="7.1" y="12.8" width="1.8" height="2.6" />
            <rect x="0.6" y="7.1" width="2.6" height="1.8" />
            <rect x="12.8" y="7.1" width="2.6" height="1.8" />
            <rect x="2.4" y="2.4" width="2.2" height="2.2" transform="rotate(45 3.5 3.5)" />
            <rect x="10.4" y="2.4" width="2.2" height="2.2" transform="rotate(45 11.5 3.5)" />
            <rect x="2.4" y="10.4" width="2.2" height="2.2" transform="rotate(45 3.5 11.5)" />
            <rect x="10.4" y="10.4" width="2.2" height="2.2" transform="rotate(45 11.5 11.5)" />
          </g>
          <circle cx="8" cy="8" r="3.4" fill="#c0c0c0" stroke="#000" strokeWidth="0.6" />
          <circle cx="8" cy="8" r="1.3" fill="#000" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 16 16">
          <rect x="1.5" y="3.5" width="13" height="9" fill="#ffffff" stroke="#000" strokeWidth="0.6" />
          <path d="M1.5 3.5 L8 9 L14.5 3.5" fill="none" stroke="#000" strokeWidth="0.7" />
        </symbol>
        <symbol id="i-doc" viewBox="0 0 16 16">
          <path d="M3 1.5 H10 L13 4.5 V14.5 H3 Z" fill="#ffffff" stroke="#000" strokeWidth="0.6" />
          <path d="M10 1.5 V4.5 H13 Z" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
          <rect x="4.4" y="7" width="7" height="1" fill="#c40000" />
          <rect x="4.4" y="9" width="7" height="1" fill="#c40000" />
          <rect x="4.4" y="11" width="4.4" height="1" fill="#c40000" />
        </symbol>
        <symbol id="i-bin" viewBox="0 0 16 16">
          <rect x="6" y="0.8" width="4" height="1.2" fill="#808080" stroke="#000" strokeWidth="0.4" />
          <rect x="3" y="2.2" width="10" height="1.5" fill="#808080" stroke="#000" strokeWidth="0.4" />
          <path d="M4 4.2 H12 L11 14.8 H5 Z" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
          <rect x="6" y="5.6" width="1" height="7.4" fill="#000" />
          <rect x="9" y="5.6" width="1" height="7.4" fill="#000" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="3" fill="#ffcc33" stroke="#000" strokeWidth="0.5" />
          <g stroke="#000" strokeWidth="0.9">
            <line x1="8" y1="0.6" x2="8" y2="2.4" />
            <line x1="8" y1="13.6" x2="8" y2="15.4" />
            <line x1="0.6" y1="8" x2="2.4" y2="8" />
            <line x1="13.6" y1="8" x2="15.4" y2="8" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className ?? "icon"} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
