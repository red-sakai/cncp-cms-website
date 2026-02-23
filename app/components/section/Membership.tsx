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
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const isJumping = useRef(false);
  const loopTimer = useRef<number | null>(null);

  const cards = DEPARTMENTS;
  const total = cards.length;
  const loopedCards = useMemo(
    () => [cards[total - 1], ...cards, cards[0]],
    [cards, total]
  );

  const [activeIndex, setActiveIndex] = useState(1);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchMoveX = useRef<number | null>(null);
  const touchMoveY = useRef<number | null>(null);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 900);
    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowSwipeHint(isMobile), 0);
    const hideTimer = isMobile
      ? window.setTimeout(() => setShowSwipeHint(false), 4000)
      : null;

    return () => {
      window.clearTimeout(showTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [isMobile]);

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
            window.setTimeout(() => {
              setCardsVisible(true);
            }, 200);
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
    };
  }, []);

  useEffect(() => {
    const target = cardRefs.current[activeIndex];
    if (!target || !cardsVisible) return;

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
      }, 420);
    }
  }, [activeIndex, cardsVisible, total]);

  const goLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
    window.setTimeout(() => setIsTransitioning(false), 400);
  };

  const goRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
    window.setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchMoveX.current = null;
    touchMoveY.current = null;
    setShowSwipeHint(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchMoveX.current = e.touches[0].clientX;
    touchMoveY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      isTransitioning ||
      touchStartX.current === null ||
      touchStartY.current === null ||
      touchMoveX.current === null ||
      touchMoveY.current === null
    ) {
      touchStartX.current =
        touchStartY.current =
        touchMoveX.current =
        touchMoveY.current =
          null;
      return;
    }

    const dx = (touchMoveX.current ?? 0) - (touchStartX.current ?? 0);
    const dy = (touchMoveY.current ?? 0) - (touchStartY.current ?? 0);
    const threshold = 40;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (dx < 0) goRight();
      else goLeft();
    }

    touchStartX.current =
      touchStartY.current =
      touchMoveX.current =
      touchMoveY.current =
        null;
  };

  const activeDotIndex =
    activeIndex === 0 ? total - 1 : activeIndex === total + 1 ? 0 : activeIndex - 1;

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
          className={`membership-carousel${cardsVisible ? " is-visible" : ""}`}
          role="region"
          aria-label="Membership departments"
        >
          <button
            className="membership-control membership-control-prev"
            type="button"
            aria-label="Previous department"
            onClick={goLeft}
            disabled={isTransitioning}
          >
            <FiChevronLeft />
          </button>
          <button
            className="membership-control membership-control-next"
            type="button"
            aria-label="Next department"
            onClick={goRight}
            disabled={isTransitioning}
          >
            <FiChevronRight />
          </button>

          <div
            className="membership-viewport"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="membership-track" role="list">
              {loopedCards.map((department, index) => (
                <article
                  className={`membership-card${index === activeIndex ? " is-active" : ""}`}
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
              ))}
            </div>
          </div>

          {showSwipeHint && (
            <div className="membership-swipe-hint" aria-hidden="true">
              Swipe to explore
            </div>
          )}

          <div className="membership-dots" role="tablist" aria-label="Select department">
              {cards.map((department, index) => (
              <button
                key={department.name}
                  className={`membership-dot${index === activeDotIndex ? " is-active" : ""}`}
                type="button"
                role="tab"
                  aria-selected={index === activeDotIndex}
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
