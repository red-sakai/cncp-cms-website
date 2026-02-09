export default function Home() {
  return (
    <main className="landing">
      <div className="shell">
        <nav className="nav">
          <div className="logo">
            <div className="logo-badge">C</div>
            CNCP CMS
          </div>
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#solutions">Solutions</a>
            <a href="#insights">Insights</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-cta">
            <button className="btn btn-secondary" type="button">
              Sign in
            </button>
            <button className="btn btn-primary" type="button">
              Request demo
            </button>
          </div>
        </nav>

        <section className="hero" id="platform">
          <div className="hero-text">
            <h1>Your network starts now.</h1>
            <p>
              Shape content, approvals, and launches from one calm dashboard. Vector
              visuals map every step, keeping teams aligned and releases on time.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" type="button">
                Start free pilot
              </button>
              <button className="btn btn-secondary" type="button">
                Watch the flow
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
