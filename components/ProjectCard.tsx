import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="win project-win">
      <div className="titlebar">
        <span className="dot" style={{ background: project.dot }} />
        <strong>{project.name}</strong>
      </div>
      <div className="win-body">
        <p>{project.description}</p>
        <div className="tech-row">
          {project.tech.map((tech) => (
            <span className="tech-chip well" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <footer>
          {project.href ? (
            <a className="btn98" href={project.href} target="_blank" rel="noopener">
              View source ↗
            </a>
          ) : (
            <span className="btn98-disabled" title="Not pushed to GitHub yet">
              Local build — not public
            </span>
          )}
        </footer>
      </div>
    </article>
  );
}
