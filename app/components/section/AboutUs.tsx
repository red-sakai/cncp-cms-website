import { AiFillExperiment } from "react-icons/ai";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiPathBold } from "react-icons/pi";

export default function AboutUs() {
  return (
    <section className="about" id="solutions">
      <div className="about-inner">
        <div className="about-header">
          <span className="eyebrow">About Us</span>
          <h2>What is Cisco NetConnect PUP - Manila</h2>
          <div className="about-model" aria-hidden="true">
            <model-viewer
              src="/3d-model/cisco_logo.glb"
              alt="Cisco NetConnect logo"
              auto-rotate
              auto-rotate-delay="2500"
              rotation-per-second="20deg"
              disable-zoom
              exposure="1.15"
              shadow-intensity="0.4"
            />
          </div>
          <p>
            Cisco NetConnect PUP - Manila is a student-led community where learners, mentors,
            and industry allies build real-world networking skills through labs, workshops,
            and project-based experiences that bridge campus learning with professional
            opportunities.
          </p>
        </div>

        <div className="about-cards">
          <article className="about-card">
            <div className="about-card-head">
              <div className="about-card-icon" aria-hidden="true">
                <AiFillExperiment />
              </div>
              <h3>Hands-on Labs</h3>
            </div>
            <p>
              Build confidence with guided labs, sandbox environments, and peer-led workshops
              that turn theory into practice.
            </p>
          </article>
          <article className="about-card">
            <div className="about-card-head">
              <div className="about-card-icon" aria-hidden="true">
                <LiaChalkboardTeacherSolid />
              </div>
              <h3>Mentorship Network</h3>
            </div>
            <p>
              Learn directly from alumni and industry volunteers who share practical insight,
              feedback, and career guidance.
            </p>
          </article>
          <article className="about-card">
            <div className="about-card-head">
              <div className="about-card-icon" aria-hidden="true">
                <PiPathBold />
              </div>
              <h3>Career Pathways</h3>
            </div>
            <p>
              Explore certifications, internships, and project showcases that open doors to
              networking and IT roles.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
