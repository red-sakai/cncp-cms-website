"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DEPARTMENTS = [
  {
    name: "Networking",
    description: "Routing, switching, and lab-based network fundamentals.",
  },
  {
    name: "Data & AI",
    description: "Analytics, automation, and applied AI for infrastructure.",
  },
  {
    name: "Cybersecurity",
    description: "Defensive practices, threat awareness, and secure systems.",
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
  const [activeIndex, setActiveIndex] = useState(1);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isJumping = useRef(false);
  const loopTimer = useRef<number | null>(null);

  const total = useMemo(() => DEPARTMENTS.length, []);
  const loopedDepartments = useMemo(
    () => [DEPARTMENTS[total - 1], ...DEPARTMENTS, DEPARTMENTS[0]],
    [total]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);

    return () => {
      window.clearInterval(timer);
    };
  }, [total]);

  useEffect(() => {
    const target = cardRefs.current[activeIndex];
    if (!target) {
      return;
    }

    const behavior = isJumping.current ? "auto" : "smooth";
    target.scrollIntoView({ behavior, inline: "center", block: "nearest" });

    if (activeIndex === 0 || activeIndex === total + 1) {
      const nextIndex = activeIndex === 0 ? total : 1;

      if (loopTimer.current) {
        window.clearTimeout(loopTimer.current);
      }

      loopTimer.current = window.setTimeout(() => {
        isJumping.current = true;
        setActiveIndex(nextIndex);
        window.requestAnimationFrame(() => {
          isJumping.current = false;
        });
      }, 520);
    }
  }, [activeIndex]);

  const handlePrevious = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <section className="membership" id="membership">
      <div className="membership-inner">
        <div className="membership-header">
          <span className="eyebrow">Membership</span>
          <h2>Find your department home.</h2>
          <p>
            Choose a focus area to build skills, collaborate with peers, and join projects
            tailored to your interests.
          </p>
        </div>

        <div className="membership-carousel" role="region" aria-label="Membership departments">
          <button
            className="membership-control membership-control-prev"
            type="button"
            aria-label="Previous department"
            onClick={handlePrevious}
          >
            <FiChevronLeft />
          </button>
          <button
            className="membership-control membership-control-next"
            type="button"
            aria-label="Next department"
            onClick={handleNext}
          >
            <FiChevronRight />
          </button>

          <div className="membership-viewport">
            <div className="membership-track" role="list">
              {loopedDepartments.map((department, index) => {
                const isActive =
                  index === activeIndex ||
                  (activeIndex === 0 && index === 0) ||
                  (activeIndex === total + 1 && index === total + 1);

                return (
                  <article
                    className={`membership-card${isActive ? " is-active" : ""}`}
                    key={`${department.name}-${index}`}
                    role="listitem"
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                  >
                    <span className="membership-label">Department</span>
                    <h3>{department.name}</h3>
                    <p>{department.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="membership-dots" role="tablist" aria-label="Select department">
            {DEPARTMENTS.map((department, index) => (
              <button
                key={department.name}
                className={`membership-dot${index + 1 === activeIndex ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={index + 1 === activeIndex}
                aria-label={`Go to ${department.name}`}
                onClick={() => setActiveIndex(index + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
