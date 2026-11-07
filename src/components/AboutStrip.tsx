import { ArrowIcon } from "./ArrowIcon";

export function AboutStrip() {
  return (
    <section className="about-strip h-full" id="about">
      <p>Not just making things look good.</p>
      <h2>
        I help turn <em>good ideas</em> into memorable experiences.
      </h2>
      <a href="mailto:yash.mahendra.bokade@gmail.com">
        Let’s make something <ArrowIcon />
      </a>
    </section>
  );
}
