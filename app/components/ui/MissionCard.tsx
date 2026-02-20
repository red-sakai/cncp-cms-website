import type { ReactNode } from "react";

type MissionCardProps = {
  icon: ReactNode;
  label: string;
  title: string;
  children: ReactNode;
};

export default function MissionCard({ icon, label, title, children }: MissionCardProps) {
  return (
    <article className="mission-card">
      <div className="mission-card-head">
        <div className="mission-icon" aria-hidden="true">
          {icon}
        </div>
        <div>
          <span className="mission-label">{label}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <p>{children}</p>
    </article>
  );
}
