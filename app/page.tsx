"use client";

import Image from "next/image";
import Script from "next/script";
import Lenis from "lenis";
import { useEffect, useState } from "react";

const EXTEND_INDICES = [1, 2, 3, 5, 6, 7];
const DOT_LEVELS = [
  "small",
  "medium",
  "tall",
  "medium",
  "small",
  "medium",
  "tall",
  "medium",
  "small",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [extendedIndices, setExtendedIndices] = useState<number[]>([]);

  useEffect(() => {
    const nav = document.querySelector(".nav");
    if (!nav) {
      return;
    }

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;

        if (EXTEND_INDICES.includes(next)) {
          setExtendedIndices((current) =>
            current.includes(next) ? current : [...current, next]
          );
        }

        if (next >= 9) {
          setExtendedIndices([]);
          return 0;
        }

        return next;
      });
    }, 140);

    return () => {
      window.clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      />
      <div
        className={`loader${isLoading ? "" : " hidden"}`}
        aria-hidden={!isLoading}
        role="status"
        aria-live="polite"
      >
        <div className="loader-mark" role="img" aria-label="Cisco-style loading mark">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className={`loader-dot${activeIndex === index ? " is-active" : ""}`}
              data-extend={EXTEND_INDICES.includes(index) ? "true" : "false"}
              data-extended={extendedIndices.includes(index) ? "true" : "false"}
              data-level={DOT_LEVELS[index]}
            />
          ))}
        </div>
      </div>

      <main className={`landing${isLoading ? " is-loading" : ""}`}>
        <div className="shell">
          <nav className="nav">
            <div className="nav-inner">
              <div className="logo">
                <Image
                  src="/cncp-logo.jpg"
                  alt="CNCP Logo"
                  className="logo-badge"
                  width={36}
                  height={36}
                  priority
                />
                <span className="logo-text">
                  Cisco NetConnect
                  <span className="logo-subline">PUP - Manila</span>
                </span>
              </div>
              <div className="nav-links">
                <a className="nav-link" href="#platform">
                  Home
                </a>
                <a className="nav-link" href="#solutions">
                  About Us
                </a>
                <a className="nav-link" href="#insights">
                  Events
                </a>
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </div>
              <div className="nav-cta">
                <button className="btn btn-secondary" type="button">
                  Sign in
                </button>
                <button className="btn btn-primary" type="button">
                  Join Now
                </button>
              </div>
            </div>
          </nav>

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
                  <button className="btn btn-primary" type="button">
                    Learn More
                  </button>
                  <button className="btn btn-secondary" type="button">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="about" id="solutions">
            <div className="about-inner">
              <div className="about-header">
                <h2>What is Cisco NetConnect PUP - Manila</h2>
                <div className="about-model" aria-hidden="true">
                  <model-viewer
                    src="/3d-model/cisco_logo.glb"
                    alt="Cisco NetConnect logo"
                    auto-rotate
                    auto-rotate-delay="2500"
                    rotation-per-second="20deg"
                    camera-controls
                    disable-zoom
                    exposure="1.15"
                    shadow-intensity="0.4"
                  />
                </div>
                <p>
                  Cisco NetConnect PUP - Manila is a community of students, mentors, and partners
                  focused on real-world networking skills, hands-on labs, and career-ready
                  experiences that connect learning with industry.
                </p>
              </div>

              <div className="about-cards">
                <article className="about-card">
                  <h3>Hands-on Labs</h3>
                  <p>
                    Build confidence with guided labs, sandbox environments, and peer-led workshops
                    that turn theory into practice.
                  </p>
                </article>
                <article className="about-card">
                  <h3>Mentorship Network</h3>
                  <p>
                    Learn directly from alumni and industry volunteers who share practical insight,
                    feedback, and career guidance.
                  </p>
                </article>
                <article className="about-card">
                  <h3>Career Pathways</h3>
                  <p>
                    Explore certifications, internships, and project showcases that open doors to
                    networking and IT roles.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
