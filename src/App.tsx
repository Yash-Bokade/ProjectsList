import type { MouseEvent } from "react";
import { AboutStrip } from "./components/AboutStrip";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ProjectArchive } from "./components/ProjectArchive";

export default function App() {
  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY}px`);
  }

  return (
    <main onMouseMove={handlePointerMove}>
      <div className="pointer-glow" aria-hidden="true" />
      <Navbar />
      <Hero />
      <ProjectArchive />
      <AboutStrip />
      <Footer />
    </main>
  );
}
