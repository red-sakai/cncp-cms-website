import OfficerCard from "../ui/OfficerCard";

const OFFICER_PLACEHOLDER = {
  name: "Officer Name",
  description: "Short placeholder bio or highlight of responsibilities.",
};

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
          <OfficerCard
            role="CEO"
            name={OFFICER_PLACEHOLDER.name}
            description={OFFICER_PLACEHOLDER.description}
            isLead
          />
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
            <OfficerCard
              key={role}
              role={role}
              name={OFFICER_PLACEHOLDER.name}
              description={OFFICER_PLACEHOLDER.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
