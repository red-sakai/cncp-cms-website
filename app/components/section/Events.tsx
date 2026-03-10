"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const EVENTS = [
  {
    title: "Campus Kickoff Assembly",
    label: "Community Launch",
    date: "August 2025",
    location: "PUP Manila Main Campus",
    image: "/cncp-pictures/cncp-picture1.jpg",
    imageAlt: "CNCP members gathered during a campus event kickoff.",
    description:
      "A welcoming session for new members introducing CNCP's departments, project tracks, and the semester's event roadmap.",
    highlights: ["Member orientation", "Department matching", "Roadmap reveal"],
  },
  {
    title: "Hands-on Networking Workshop",
    label: "Skill Builder",
    date: "October 2025",
    location: "Cisco Lab Session",
    image: "/cncp-pictures/cncp-picture2.jpg",
    imageAlt: "Students participating in a Cisco networking workshop.",
    description:
      "An applied workshop where participants moved from topology planning into router and switch configuration with mentor support.",
    highlights: ["Packet tracer labs", "Peer mentoring", "Configuration drills"],
  },
  {
    title: "Tech Community Showcase",
    label: "Event Highlight",
    date: "January 2026",
    location: "Student Project Expo",
    image: "/cncp-pictures/cncp-picture3.jpg",
    imageAlt: "CNCP event participants during a student tech showcase.",
    description:
      "A showcase of student-led outputs, partner collaborations, and live demos that connected technical learning with visible community impact.",
    highlights: ["Project demos", "Partner guests", "Recognition program"],
  },
];

export default function Events() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % EVENTS.length);
    }, 5500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  const goTo = (index: number) => {
    setActiveIndex((index + EVENTS.length) % EVENTS.length);
  };

  const next = () => goTo(activeIndex + 1);
  const previous = () => goTo(activeIndex - 1);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX;
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) < 50) {
      return;
    }

    if (delta > 0) {
      next();
      return;
    }

    previous();
  };

  const activeEvent = EVENTS[activeIndex];

  return (
    <section className="events" id="insights">
      <div className="events-inner">
        <div className="events-header">
          <span className="eyebrow">Events</span>
          <h2>Explore CNCP moments through a clickable event reel.</h2>
          <p>
            Each image opens its matching event story, so visitors can browse the gallery
            and immediately read what happened in that specific session.
          </p>
        </div>

        <div className="events-layout">
          <div
            className="events-stage"
            role="region"
            aria-label="CNCP events slideshow"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="events-stage-frame">
              <div
                className="events-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {EVENTS.map((event) => (
                  <article className="events-slide" key={event.title} aria-hidden={event.title !== activeEvent.title}>
                    <div className="events-slide-media">
                      <Image
                        src={event.image}
                        alt={event.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="events-slide-image"
                      />
                      <div className="events-slide-overlay" />
                      <div className="events-slide-copy">
                        <span>{event.label}</span>
                        <h3>{event.title}</h3>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="events-stage-controls">
                <button type="button" className="events-nav-button" onClick={previous} aria-label="Show previous event">
                  <FiChevronLeft />
                </button>
                <button type="button" className="events-nav-button" onClick={next} aria-label="Show next event">
                  <FiChevronRight />
                </button>
              </div>
            </div>

            <div className="events-thumbnail-row" aria-label="Choose an event">
              {EVENTS.map((event, index) => (
                <button
                  key={event.title}
                  type="button"
                  className={`events-thumbnail${index === activeIndex ? " is-active" : ""}`}
                  onClick={() => goTo(index)}
                  aria-pressed={index === activeIndex}
                >
                  <span className="events-thumbnail-image-wrap">
                    <Image
                      src={event.image}
                      alt={event.imageAlt}
                      fill
                      sizes="(max-width: 768px) 33vw, 180px"
                      className="events-thumbnail-image"
                    />
                  </span>
                  <span className="events-thumbnail-copy">
                    <strong>{event.title}</strong>
                    <span>{event.date}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="events-panel" aria-live="polite">
            <div className="events-panel-label">Selected Event</div>
            <h3>{activeEvent.title}</h3>
            <div className="events-meta">
              <span>{activeEvent.date}</span>
              <span>{activeEvent.location}</span>
            </div>
            <p>{activeEvent.description}</p>

            <div className="events-highlight-list">
              {activeEvent.highlights.map((highlight) => (
                <span key={highlight} className="events-highlight-pill">
                  {highlight}
                </span>
              ))}
            </div>

            <div className="events-counter">
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(EVENTS.length).padStart(2, "0")}
              </span>
              <div className="events-dots" aria-hidden="true">
                {EVENTS.map((event, index) => (
                  <span
                    key={event.title}
                    className={`events-dot${index === activeIndex ? " is-active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}