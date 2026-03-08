"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DEPARTMENTS = [
  {
    name: "Cybersecurity",
    description: "Defensive practices, threat awareness, and secure systems.",
  },
  {
    name: "Networking",
    description: "Routing, switching, and lab-based network fundamentals.",
  },
  {
    name: "AI & Data Science",
    description: "Analytics, automation, and applied AI for infrastructure.",
  },
  {
    name: "OS & IT",
    description: "System administration, troubleshooting, and IT operations.",
  },
  {
    name: "Programming",
    description: "Scripting and software skills that power modern networks.",
  },
];

export default function Membership() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const total = DEPARTMENTS.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.classList.add("is-visible");
    }

    const fadeSlideClass = "history-fade-slide";
    const headingEl = headingRef.current;
    const lineEl = lineRef.current;
    const carouselEl = carouselRef.current;

    const fadeObserver = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add(fadeSlideClass);
          }
        });
      },
      { threshold: 0.3 }
    );

    const carouselObserver = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setIsVisible(true), 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headingEl) fadeObserver.observe(headingEl);
    if (lineEl) fadeObserver.observe(lineEl);
    if (carouselEl) carouselObserver.observe(carouselEl);

    return () => {
      if (headingEl) fadeObserver.unobserve(headingEl);
      if (lineEl) fadeObserver.unobserve(lineEl);
      if (carouselEl) carouselObserver.unobserve(carouselEl);
      fadeObserver.disconnect();
      carouselObserver.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + total) % total);
    },
    [isAnimating, total]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!isAnimating) return;

    const timer = window.setTimeout(() => setIsAnimating(false), 400);
    return () => window.clearTimeout(timer);
  }, [current, isAnimating]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!isAnimating) {
        goTo(current + 1);
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [current, isAnimating, goTo]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const getPosition = (index: number) => {
    const diff = (index - current + total) % total;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  const item = DEPARTMENTS[current];

  return (
    <section className="membership" id="membership">
      <div className="membership-inner" ref={sectionRef}>
        <div className="membership-header">
          <span className="eyebrow">Membership</span>
          <h2 ref={headingRef}>Find your department home.</h2>
          <div className="membership-rule" ref={lineRef} aria-hidden="true" />
          <p>
            Choose a focus area to build skills, collaborate with peers, and join projects
            tailored to your interests.
          </p>
        </div>

        <div
          ref={carouselRef}
          className={`mx-auto w-full max-w-6xl px-5 transition-all duration-700 ease-out md:px-8 lg:px-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div
            className="relative w-full"
            role="region"
            aria-label="CNCP departments carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-[360px] overflow-hidden rounded-[32px] border border-[rgba(198,228,255,0.18)] bg-[radial-gradient(circle_at_top,rgba(119,211,255,0.24),transparent_36%),linear-gradient(150deg,rgba(20,46,94,0.78),rgba(6,18,44,0.92))] shadow-[0_28px_80px_rgba(7,26,90,0.45)] sm:h-[420px] md:h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(119,211,255,0.16),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(43,123,255,0.2),transparent_24%)]" />

              <div className="absolute inset-0 flex items-center justify-center">
                {DEPARTMENTS.map((department, index) => {
                  const pos = getPosition(index);

                  if (pos === "hidden") {
                    return null;
                  }

                  return (
                    <div
                      key={department.name}
                      className={`absolute transition-all duration-500 ease-out ${
                        pos === "center"
                          ? "z-20 scale-100 opacity-100"
                          : pos === "left"
                            ? "z-10 hidden -translate-x-[58%] scale-[0.78] opacity-55 sm:block md:-translate-x-[72%]"
                            : "z-10 hidden translate-x-[58%] scale-[0.78] opacity-55 sm:block md:translate-x-[72%]"
                      }`}
                    >
                      <div className="relative w-[250px] rounded-[28px] border border-[rgba(210,236,255,0.28)] bg-[linear-gradient(160deg,rgba(233,243,255,0.12),rgba(233,243,255,0.04))] px-6 py-8 text-left shadow-[0_24px_60px_rgba(5,16,40,0.32)] backdrop-blur-xl sm:w-[300px] sm:px-8 sm:py-10 md:w-[360px] md:px-10 md:py-12">
                        <div className="absolute inset-x-6 top-0 h-24 rounded-b-full bg-[radial-gradient(circle,rgba(119,211,255,0.24),transparent_70%)] blur-2xl" />
                        <div className="relative">
                          <h3
                            className="text-3xl font-bold leading-none tracking-[-0.02em] text-[var(--text-100)] sm:text-4xl md:text-5xl"
                            style={{ fontFamily: '"Rajdhani", "Space Grotesk", sans-serif' }}
                          >
                            {department.name}
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-[var(--text-300)] sm:text-base md:mt-5">
                            {department.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={prev}
                disabled={isAnimating}
                className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[rgba(198,228,255,0.28)] bg-[rgba(10,24,54,0.82)] p-2 text-[var(--text-100)] backdrop-blur-sm transition-all hover:scale-105 hover:border-[rgba(210,236,255,0.65)] hover:bg-[rgba(12,34,72,0.92)] disabled:cursor-not-allowed disabled:opacity-35 md:left-5 md:p-3"
                aria-label="Previous item"
                type="button"
              >
                <FiChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={next}
                disabled={isAnimating}
                className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[rgba(198,228,255,0.28)] bg-[rgba(10,24,54,0.82)] p-2 text-[var(--text-100)] backdrop-blur-sm transition-all hover:scale-105 hover:border-[rgba(210,236,255,0.65)] hover:bg-[rgba(12,34,72,0.92)] disabled:cursor-not-allowed disabled:opacity-35 md:right-5 md:p-3"
                aria-label="Next item"
                type="button"
              >
                <FiChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-col items-center text-center md:mt-10">
              <h3
                className="mb-3 text-4xl font-bold tracking-[-0.02em] text-[var(--text-100)] md:text-5xl"
                style={{ fontFamily: '"Rajdhani", "Space Grotesk", sans-serif' }}
              >
                {item.name}
              </h3>
              <p className="max-w-xl text-sm leading-7 text-[var(--text-300)] md:text-base">
                {item.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {DEPARTMENTS.map((department, index) => (
                <button
                  key={department.name}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-8 bg-[linear-gradient(120deg,var(--cyan-300),var(--blue-500))]"
                      : "w-2 bg-[rgba(199,224,255,0.35)] hover:bg-[rgba(199,224,255,0.55)]"
                  }`}
                  aria-label={`Go to item ${index + 1}`}
                  aria-pressed={index === current}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
