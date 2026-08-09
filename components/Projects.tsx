import { ProjectCard } from "@/components/ProjectCard";
import { Window } from "@/components/win98/Window";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section aria-label="Projects">
      <Window id="projects" title="My Projects" eyebrow="C:\Aswad\Projects">
        <div className="explorer-toolbar">
          <button type="button" className="btn98" disabled>
            ← Back
          </button>
          <button type="button" className="btn98" disabled>
            → Forward
          </button>
          <button type="button" className="btn98" disabled>
            ↑ Up
          </button>
        </div>
        <div className="addressbar">
          <span>Address</span>
          <span className="well">C:\Aswad\Projects\</span>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.name} />
          ))}
        </div>
      </Window>
    </section>
  );
}
