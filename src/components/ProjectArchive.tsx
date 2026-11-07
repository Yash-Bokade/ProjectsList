import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { filters, projects, type Filter } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function ProjectArchive() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openProject, setOpenProject] = useState<string | null>("meridian");
  const projectListRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "All" || project.type === filter),
    [filter],
  );

  useLayoutEffect(() => {
    const projectList = projectListRef.current;
    if (!projectList) return;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project", projectList);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        cards.forEach((card) => card.classList.add("is-viewport-active"));
        return;
      }

      cards.forEach((card) => {
        const main = card.querySelector<HTMLElement>(".project-main");
        const copy = card.querySelector<HTMLElement>(".project-copy");
        const title = card.querySelector<HTMLElement>("h2");
        const summary = card.querySelector<HTMLElement>(".project-copy > p");
        const explore = card.querySelector<HTMLElement>(".explore");
        const art = card.querySelector<HTMLElement>(".project-art");

        if (!main || !copy || !title || !summary || !explore || !art) return;

        gsap.set(main, {
          paddingTop: 22,
          paddingBottom: 22,
          rotationX: -12,
          z: 0,
          transformPerspective: 1500,
          transformOrigin: "left center",
          force3D: true,
        });
        gsap.set(copy, { x: 0, z: 0, force3D: true });
        gsap.set(title, {
          paddingTop: 18,
          marginBottom: 8,
          scale: 0.68,
          transformOrigin: "left center",
          force3D: true,
        });
        gsap.set(summary, {
          height: 0,
          marginBottom: 0,
          autoAlpha: 0,
          y: 10,
          force3D: true,
        });
        gsap.set(explore, {
          marginTop: 6,
          autoAlpha: 0.62,
          y: 0,
          force3D: true,
        });
        gsap.set(art, {
          height: 118,
          scaleX: 0.52,
          z: -36,
          rotationY: -22,
          rotationX: 7,
          borderRadius: "14px",
          transformPerspective: 1500,
          transformOrigin: "right center",
          force3D: true,
        });

        const animateCard = (isActive: boolean, enterFromBottom = true) => {
          card.classList.toggle("is-viewport-active", isActive);
          const duration = isActive ? 0.68 : 0.52;
          const ease = isActive ? "power3.out" : "power2.inOut";

          gsap.to(main, {
            paddingTop: isActive ? 52 : 22,
            paddingBottom: isActive ? 52 : 22,
            rotationX: isActive ? 0 : enterFromBottom ? -12 : 12,
            z: 0,
            duration,
            ease,
            overwrite: "auto",
          });

          gsap.to(copy, {
            x: isActive ? 12 : 0,
            z: 0,
            duration,
            ease,
            overwrite: "auto",
          });

          gsap.to(title, {
            paddingTop: isActive ? 48 : 18,
            marginBottom: isActive ? 22 : 8,
            scale: isActive ? 1 : 0.68,
            duration,
            ease,
            overwrite: "auto",
          });

          gsap.to(summary, {
            height: isActive ? "auto" : 0,
            marginBottom: isActive ? 6 : 0,
            autoAlpha: isActive ? 1 : 0,
            y: isActive ? 0 : enterFromBottom ? 10 : -10,
            duration: isActive ? 0.55 : 0.38,
            ease,
            overwrite: "auto",
          });

          gsap.to(explore, {
            marginTop: isActive ? 32 : 6,
            autoAlpha: isActive ? 1 : 0.62,
            duration,
            ease,
            overwrite: "auto",
          });

          gsap.to(art, {
            height: isActive ? 360 : 118,
            scaleX: isActive ? 1 : 0.52,
            z: isActive ? 44 : -36,
            rotationY: isActive ? -6 : enterFromBottom ? -22 : 22,
            rotationX: isActive ? 0 : enterFromBottom ? 7 : -7,
            borderRadius: isActive ? "0px" : "14px",
            duration,
            ease,
            overwrite: "auto",
            onUpdate: () => ScrollTrigger.update(),
            onComplete: () => ScrollTrigger.refresh(),
          });
        };

        ScrollTrigger.create({
          trigger: card,
          start: "top 75%",
          end: "top 10%",
          onEnter: () => animateCard(true, true),
          onEnterBack: () => animateCard(true, false),
          onLeave: () => animateCard(false, false),
          onLeaveBack: () => animateCard(false, true),
          onRefresh: (self) => {
            if (self.isActive) {
              animateCard(true, true);
            }
          },
        });
      });
    }, projectList);

    return () => context.revert();
  }, [visibleProjects, openProject]);

  return (
    <section className="archive" id="work">
      <div className="archive-head">
        <div className="filters" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
              <sup>
                {item === "All"
                  ? projects.length
                  : projects.filter((p) => p.type === item).length}
              </sup>
            </button>
          ))}
        </div>
      </div>

      <div className="project-list" ref={projectListRef} aria-live="polite">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            open={openProject === project.id}
            onToggle={() => setOpenProject(openProject === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  );
}
