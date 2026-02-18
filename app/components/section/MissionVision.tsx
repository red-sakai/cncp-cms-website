import { GiStairsGoal } from "react-icons/gi";
import { FaEye } from "react-icons/fa";

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
          <article className="mission-card">
            <div className="mission-card-head">
              <div className="mission-icon" aria-hidden="true">
                <GiStairsGoal />
              </div>
              <div>
                <span className="mission-label">Mission</span>
                <h3>Empower learners through applied networking.</h3>
              </div>
            </div>
            <p>
              Provide hands-on learning, mentorship, and collaborative projects that help
              PUP students build industry-ready networking skills and professional confidence.
            </p>
          </article>
          <article className="mission-card">
            <div className="mission-card-head">
              <div className="mission-icon" aria-hidden="true">
                <FaEye />
              </div>
              <div>
                <span className="mission-label">Vision</span>
                <h3>A campus community shaping the future of connectivity.</h3>
              </div>
            </div>
            <p>
              Cultivate a vibrant, inclusive network of innovators and leaders who drive
              meaningful change in the IT and networking landscape of the Philippines.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
