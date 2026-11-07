import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

export function ProjectArt({ project }: { project: Project }) {
  return (
    <div
      className={`project-art art-${project.art}`}
      style={{ "--accent": project.accent } as CSSProperties}
    >
      <div className="art-no">{project.number}</div>
      {project.art === "orbit" && (
        <>
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="planet" />
        </>
      )}
      {project.art === "type" && (
        <div className="type-stack" aria-hidden="true">
          <span>ORDINARY</span>
          <span>ORDINARY</span>
          <span>ORDINARY</span>
        </div>
      )}
      {project.art === "wave" && (
        <div className="wave-lines" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <i key={index} style={{ "--i": index } as CSSProperties} />
          ))}
        </div>
      )}
      {project.art === "tiles" && (
        <div className="tile-stack" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
      {project.art === "grid" && (
        <div className="ritual-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      )}
      {project.art === "portal" && (
        <div className="portal" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      )}
      <span className="art-label">
        {project.type} / {project.year}
      </span>
    </div>
  );
}
