import { DesktopIcons } from "@/components/DesktopIcons";
import { Icon } from "@/components/win98/Icon";
import { Window } from "@/components/win98/Window";

export function Hero() {
  return (
    <div className="hero" id="top">
      <DesktopIcons />

      <div className="hero-windows">
        <Window id="about" title="ABOUT.TXT - Notepad">
          <p>
            Hi, I&apos;m Aswad — I build things that actually ship: a WhatsApp bot wired into a
            real ERP, an AI agent that renders and uploads video on its own, a moderation bot
            keeping a Reddit community in line, and more than one e-commerce stack from scratch.
          </p>
          <p>
            Five years in web development, two in AI/ML, two more building games on the side. I
            like projects with a deadline and a real user on the other end.
            <span className="cursor-blink" aria-hidden="true" />
          </p>
        </Window>

        <Window title="System Properties" inactive>
          <div className="sysprops">
            <Icon name="computer" />
            <dl>
              <dt>Registered to</dt>
              <dd>Aswad Yousaf (Aragorn3022)</dd>
              <dt>Web development</dt>
              <dd>5 years</dd>
              <dt>AI / ML</dt>
              <dd>2 years</dd>
              <dt>Game development</dt>
              <dd>2 years</dd>
            </dl>
          </div>
        </Window>
      </div>
    </div>
  );
}
