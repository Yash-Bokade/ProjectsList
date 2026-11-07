import type { Project } from "../data/projects";
import { ArrowIcon } from "./ArrowIcon";
import { ProjectArt } from "./ProjectArt";

export function ProjectCard({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`project ${open ? "is-open" : ""}`} id={project.id}>
      <button
        className="project-main"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${project.id}-details`}
      >
        <div className="project-copy">
          <div className="project-kicker">
            <span>{project.number}</span>
            <span>{project.type}</span>
            <span>{project.year}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <span className="explore">
            {open ? "Close details" : "View details"}
            <span className="explore-icon">
              <ArrowIcon diagonal={!open} />
            </span>
          </span>
        </div>
        <ProjectArt project={project} />
      </button>
      <div className="project-details" id={`${project.id}-details`} aria-hidden={!open}>
        <div>
          <span className="detail-label">Role</span>
          <strong>{project.role}</strong>
        </div>
        <div>
          <span className="detail-label">Services</span>
          <strong>{project.services.join(" · ")}</strong>
        </div>
        <div>
          <span className="detail-label">Outcome</span>
          <strong>{project.outcome}</strong>
        </div>
        <a
          href={`mailto:hello@example.com?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`}
        >
          Request full case study <ArrowIcon diagonal />
        </a>
      </div>
    </article>
  );
}
