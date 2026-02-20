import { AiFillExperiment } from "react-icons/ai";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiPathBold } from "react-icons/pi";
import AboutCard from "../ui/AboutCard";

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
          <AboutCard icon={<AiFillExperiment />} title="Hands-on Labs">
            Build confidence with guided labs, sandbox environments, and peer-led workshops
            that turn theory into practice.
          </AboutCard>
          <AboutCard icon={<LiaChalkboardTeacherSolid />} title="Mentorship Network">
            Learn directly from alumni and industry volunteers who share practical insight,
            feedback, and career guidance.
          </AboutCard>
          <AboutCard icon={<PiPathBold />} title="Career Pathways">
            Explore certifications, internships, and project showcases that open doors to
            networking and IT roles.
          </AboutCard>
        </div>
      </div>
    </section>
  );
}
