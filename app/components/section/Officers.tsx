export default function Officers() {
  return (
    <section className="officers" id="officers">
      <div className="officers-inner">
        <div className="officers-header">
          <span className="eyebrow">Officers</span>
          <h2>The student leaders behind CNCP.</h2>
          <p>
            This section will spotlight the current CNCP officers and their roles. Placeholders
            are shown for now while details are finalized.
          </p>
        </div>

        <div className="officers-lead">
          <article className="officer-card officer-lead">
            <div className="officer-avatar officer-avatar-lead" aria-hidden="true" />
            <div className="officer-details">
              <span className="officer-role">CEO</span>
              <h3>Officer Name</h3>
              <p>Short placeholder bio or highlight of responsibilities.</p>
            </div>
          </article>
        </div>

        <div className="officers-grid">
          {[
            "President",
            "Vice President",
            "Secretary",
            "Treasurer",
            "Auditor",
            "PRO",
          ].map((role) => (
            <article className="officer-card" key={role}>
              <div className="officer-avatar" aria-hidden="true" />
              <div className="officer-details">
                <span className="officer-role">{role}</span>
                <h3>Officer Name</h3>
                <p>Short placeholder bio or highlight of responsibilities.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
