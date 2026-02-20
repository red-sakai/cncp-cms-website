type OfficerCardProps = {
  role: string;
  name: string;
  description: string;
  isLead?: boolean;
};

export default function OfficerCard({
  role,
  name,
  description,
  isLead = false,
}: OfficerCardProps) {
  return (
    <article className={`officer-card${isLead ? " officer-lead" : ""}`}>
      <div
        className={`officer-avatar${isLead ? " officer-avatar-lead" : ""}`}
        aria-hidden="true"
      />
      <div className="officer-details">
        <span className="officer-role">{role}</span>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
