export function Navbar() {
  return (
    <header className="nav">
      <a className="wordmark" href="#top" aria-label="Alex Morgan, home">
        AM<span>®</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="mailto:hello@example.com">Contact</a>
      </nav>
      <a className="availability" href="mailto:hello@example.com">
        <i /> Available for work
      </a>
    </header>
  );
}
