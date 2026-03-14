"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

export default function Hero() {
  const [isIntroReady, setIsIntroReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const pointerStateRef = useRef({
    targetX: 0,
    targetY: 0,
    targetScroll: 0,
    currentX: 0,
    currentY: 0,
    currentScroll: 0,
  });

  useEffect(() => {
    const heroBg = heroBgRef.current;
    if (!heroBg) {
      return;
    }

    let rafId = 0;
    const animate = () => {
      const pointer = pointerStateRef.current;
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.08;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.08;
      pointer.currentScroll += (pointer.targetScroll - pointer.currentScroll) * 0.08;

      heroBg.style.setProperty("--parallax-x", `${pointer.currentX.toFixed(2)}px`);
      heroBg.style.setProperty("--parallax-y", `${pointer.currentY.toFixed(2)}px`);
      heroBg.style.setProperty("--parallax-scroll", `${pointer.currentScroll.toFixed(2)}px`);

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setIsIntroReady(true);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    const updateScrollParallax = () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const heroCenterOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      const normalizedOffset = Math.max(
        -1,
        Math.min(1, heroCenterOffset / (viewportHeight * 0.85))
      );

      pointerStateRef.current.targetScroll = normalizedOffset * -130;
    };

    updateScrollParallax();
    window.addEventListener("scroll", updateScrollParallax, { passive: true });
    window.addEventListener("resize", updateScrollParallax);

    return () => {
      window.removeEventListener("scroll", updateScrollParallax);
      window.removeEventListener("resize", updateScrollParallax);
    };
  }, []);

  const handlePointerMove: React.PointerEventHandler<HTMLElement> = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerStateRef.current.targetX = x * 56;
    pointerStateRef.current.targetY = y * 44;
  };

  const resetPointer = () => {
    pointerStateRef.current.targetX = 0;
    pointerStateRef.current.targetY = 0;
  };

  return (
    <section
      className={`hero${isIntroReady ? " hero-intro-ready" : ""}`}
      id="platform"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <div className="hero-bg" aria-hidden="true" ref={heroBgRef}>
        <span className="hero-layer hero-base" />
        <span className="hero-layer hero-clouds" />
        <span className="hero-layer hero-bridge" />
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
