import { GiStairsGoal } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import MissionCard from "../ui/MissionCard";

export default function MissionVision() {
  return (
    <section className="mission" id="mission">
      <div className="mission-inner">
        <div className="mission-header">
          <span className="eyebrow">Mission &amp; Vision</span>
          <h2>Guided by purpose, built for impact.</h2>
          <p>
            Cisco NetConnect PUP - Manila aligns every activity with a clear mission and
            a future-facing vision for student technologists.
          </p>
        </div>

        <div className="mission-grid">
          <MissionCard
            icon={<GiStairsGoal />}
            label="Mission"
            title="Empower learners through applied networking."
          >
            Provide hands-on learning, mentorship, and collaborative projects that help
            PUP students build industry-ready networking skills and professional confidence.
          </MissionCard>
          <MissionCard
            icon={<FaEye />}
            label="Vision"
            title="A campus community shaping the future of connectivity."
          >
            Cultivate a vibrant, inclusive network of innovators and leaders who drive
            meaningful change in the IT and networking landscape of the Philippines.
          </MissionCard>
        </div>
      </div>
    </section>
  );
}
