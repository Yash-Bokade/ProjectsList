export function Navbar() {
  return (
    <header className="nav">
      <a className="wordmark" href="https://yash-bokade.github.com" aria-label="Yash Bokade, home">
        Yash<span>B.Tech CSE Student</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="mailto:yash.mahendra.bokade@gmail.com">Contact</a>
      </nav>
      <a className="availability" href="mailto:hello@example.com">
        <i /> Available for work
      </a>
    </header>
  );
}
