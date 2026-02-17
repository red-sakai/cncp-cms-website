"use client";

import Image from "next/image";
import Script from "next/script";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import Hero from "./components/section/Hero";
import AboutUs from "./components/section/AboutUs";
import MissionVision from "./components/section/MissionVision";

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
                <div className="nav-item">
                  <button
                    className="nav-link nav-link-toggle"
                    type="button"
                    aria-haspopup="true"
                  >
                    About Us
                    <span className="nav-arrow" aria-hidden="true" />
                  </button>
                  <div className="nav-submenu" role="menu">
                    <a className="nav-submenu-link" href="#mission" role="menuitem">
                      Mission &amp; Vision
                    </a>
                    <a className="nav-submenu-link" href="#officers" role="menuitem">
                      Officers
                    </a>
                    <a className="nav-submenu-link" href="#membership" role="menuitem">
                      Membership
                    </a>
                  </div>
                </div>
                <a className="nav-link" href="#insights">
                  Events
                </a>
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </div>
              <div className="nav-cta">
                <button className="btn btn-secondary" type="button">
                  Find Your ID
                </button>
                <button className="btn btn-primary" type="button">
                  Join Now
                </button>
              </div>
            </div>
          </nav>

          <Hero />
          <AboutUs />
          <MissionVision />
        </div>
      </main>
    </>
  );
}
