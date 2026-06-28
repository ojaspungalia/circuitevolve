"use client";

import { useEffect, useCallback, useRef } from "react";

const points = [
  {
    id: "sizing",
    iconClass: "fa-solid fa-ruler",
    colorClass: "op-icon-red",
    title: "Automated sizing",
    desc: "Multi-gen sweeps to converge widths.",
  },
  {
    id: "pvt",
    iconClass: "fa-solid fa-thermometer",
    colorClass: "op-icon-blue",
    title: "Multi-corner verification",
    desc: "Process, voltage, temperature checks.",
  },
  {
    id: "ppa",
    iconClass: "fa-solid fa-bolt",
    colorClass: "op-icon-amber",
    title: "Improve metrics",
    desc: "Automated trade-offs to hit targets.",
  },
  {
    id: "yield",
    iconClass: "fa-solid fa-chart-line",
    colorClass: "op-icon-green",
    title: "Monte Carlo & yield",
    desc: "High-volume mismatch tests.",
  },
];

export default function OptimizerPoints() {
  const listRef = useRef<HTMLUListElement>(null);

  const checkActive = useCallback(() => {
    const items =
      listRef.current?.querySelectorAll<HTMLElement>(".optimizer-item");
    if (!items?.length) return;

    const viewportCenter = window.innerHeight / 2;
    let closest: HTMLElement | null = null;
    let closestDist = Infinity;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = item;
      }
    });

    items.forEach((item) => {
      item.classList.toggle("active", item === closest);
    });
  }, []);

  useEffect(() => {
    checkActive();
    window.addEventListener("scroll", checkActive, { passive: true });
    window.addEventListener("resize", checkActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkActive);
      window.removeEventListener("resize", checkActive);
    };
  }, [checkActive]);

  return (
    <div className="optimizer-wrap">
      <ul ref={listRef} className="optimizer-scroll-list" data-group="optimizer">
        {points.map((point) => (
          <li
            key={point.id}
            id={`optimizer-card-${point.id}`}
            className="optimizer-item"
            onClick={() => console.log("Clicked:", point.id)}
          >
            <span className={`icon ${point.colorClass}`}>
              <i className={point.iconClass} aria-hidden="true" />
            </span>
            <div>
              <div className="title">{point.title}</div>
              <div className="desc">{point.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
