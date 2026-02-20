import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="hero" id="platform">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-slide slide-1" />
        <span className="hero-slide slide-2" />
        <span className="hero-slide slide-3" />
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Your network starts now.</h1>
          <p>
            Cisco NetConnect PUP - Manila is a student-led tech community empowering future
            network and IT professionals through learning, collaboration, and innovation.
          </p>
          <div className="hero-actions">
            <Button>Learn More</Button>
            <Button variant="secondary">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
