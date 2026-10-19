"use client";

import { useEffect, useRef } from "react";

export default function Laugh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const append = (count: number) => {
      for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.textContent = " AHAHAHAHAHA";
        container.appendChild(span);
      }
    };

    append(500);

    const onScroll = () => {
      const p =
        (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      append(Math.floor(p * 100) + 50);
    };

    window.addEventListener("scroll", onScroll);
    const interval = setInterval(() => append(25), 200);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div id="c" ref={containerRef}>
      BWAHAHAHA
    </div>
  );
}
