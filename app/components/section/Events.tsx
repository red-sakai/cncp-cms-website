"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TRANSITION_DURATION = 900;

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
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timersRef = useRef<number[]>([]);
  const total = EVENTS.length;

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const queueTimer = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((id) => id !== timer);
      callback();
    }, delay);

    timersRef.current.push(timer);
  };

  const goTo = useCallback((index: number) => {
    const nextIndex = (index + total) % total;

    if (nextIndex === activeIndex || isAnimating) {
      return;
    }

    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    setIsAnimating(true);
    setActiveIndex(nextIndex);

    queueTimer(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [activeIndex, isAnimating, total]);

  useEffect(() => {
    if (isPaused || isAnimating) {
      return;
    }

    const timer = window.setInterval(() => {
      goTo(activeIndex + 1);
    }, 5500);

    return () => {
      window.clearInterval(timer);
    };
  }, [activeIndex, goTo, isAnimating, isPaused]);

  const next = () => goTo(activeIndex + 1);
  const previous = () => goTo(activeIndex - 1);

  const getOffset = (index: number) => {
    const rawOffset = index - activeIndex;

    if (rawOffset > total / 2) {
      return rawOffset - total;
    }

    if (rawOffset < -total / 2) {
      return rawOffset + total;
    }

    return rawOffset;
  };

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

  return (
    <section className="events" id="insights">
      <div className="events-inner">
        <div className="events-header">
          <span className="eyebrow">Events</span>
          <h2>Browse CNCP moments in a continuous 3D event carousel.</h2>
          <p>
            The gallery keeps the same previous and next browsing flow, but now each stop
            glides into a layered stage that keeps the section feeling more immersive.
          </p>
        </div>

        <div className="events-showcase">
          <div className="events-showcase-grid">
            <div
              className="events-stage"
              role="region"
              aria-label="CNCP events carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="events-stage-halo" aria-hidden="true" />
              <div className="events-carousel">
                {EVENTS.map((event, index) => {
                  const offset = getOffset(index);
                  const distance = Math.abs(offset);
                  const isVisible = distance <= 2;
                  const translateX = `${offset * 36}%`;
                  const rotateY = `${offset * -24}deg`;
                  const scale = Math.max(0.7, 1 - distance * 0.18);
                  const opacity = Math.max(0, 1 - distance * 0.33);
                  const blur = distance === 0 ? "0px" : `${distance * 1.6}px`;

                  return (
                    <button
                      key={event.title}
                      type="button"
                      className={`events-card${index === activeIndex ? " is-active" : ""}`}
                      onClick={() => goTo(index)}
                      aria-pressed={index === activeIndex}
                      aria-label={`Show ${event.title}`}
                      style={{
                        transform: `translateX(${translateX}) translateZ(${distance === 0 ? 0 : -distance * 120}px) rotateY(${rotateY}) scale(${scale})`,
                        opacity,
                        filter: `blur(${blur}) saturate(${distance === 0 ? 1 : 0.85})`,
                        zIndex: total - distance,
                        pointerEvents: isVisible ? "auto" : "none",
                      }}
                    >
                      <span className="events-card-media">
                        <Image
                          src={event.image}
                          alt={event.imageAlt}
                          fill
                          sizes="(max-width: 768px) 72vw, (max-width: 1200px) 46vw, 360px"
                          className="events-card-image"
                        />
                        <span className="events-card-overlay" />
                      </span>
                      <span className="events-card-copy">
                        <span className="events-card-label">{event.label}</span>
                        <strong>{event.title}</strong>
                        <span>{event.location}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="events-stage-controls">
              <button
                type="button"
                className="events-nav-button"
                onClick={previous}
                aria-label="Show previous event"
                disabled={isAnimating}
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="events-nav-button"
                onClick={next}
                aria-label="Show next event"
                disabled={isAnimating}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}