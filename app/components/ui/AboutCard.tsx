import type { ReactNode } from "react";

type AboutCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export default function AboutCard({ icon, title, children }: AboutCardProps) {
  return (
    <article className="about-card">
      <div className="about-card-head">
        <div className="about-card-icon" aria-hidden="true">
          {icon}
        </div>
        <h3>{title}</h3>
      </div>
      <p>{children}</p>
    </article>
  );
}
