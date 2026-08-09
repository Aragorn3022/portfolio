import { Icon } from "@/components/win98/Icon";
import { Window } from "@/components/win98/Window";

const skills = [
  "Python / Django",
  "TypeScript",
  "React / Next.js",
  "Java / Spring",
  "C++",
  "WhatsApp / Bot APIs",
  "LLM Integration",
  "REST APIs",
  "PostgreSQL / SQLite",
  "WebSockets",
  "FFmpeg",
  "Deployment (Render)",
];

export function Skills() {
  return (
    <section aria-label="Skills">
      <Window id="skills" title="Control Panel" eyebrow="Control Panel">
        <div className="cp-grid">
          {skills.map((skill) => (
            <div className="cp-item" tabIndex={0} key={skill}>
              <Icon name="gear" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </Window>
    </section>
  );
}
