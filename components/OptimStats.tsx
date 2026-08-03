import type { CSSProperties } from "react";

const stats = [
  {
    id: "devices",
    index: "01",
    value: "1000+",
    unit: "devices",
    title: "Device library coverage",
    desc: "Validated across 1000+ devices in the standard-cell library.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16l9 5 9-5" />
      </svg>
    ),
  },
  {
    id: "pvt",
    index: "02",
    value: "200+",
    unit: "PVT",
    title: "Full corner verification",
    desc: "Checked across 200+ process, voltage, and temperature corners.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "speed",
    index: "03",
    value: "12.4x",
    unit: "faster",
    title: "Faster convergence",
    desc: "Converges 12.4x faster than existing ML optimization benchmarks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    id: "cost",
    index: "04",
    value: "40%",
    unit: "cost saved",
    title: "Lower design cost",
    desc: "Cuts design-cycle cost by 40% versus manual and legacy flows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M16.5 6.5c0-1.93-2-3.5-4.5-3.5S7.5 4.57 7.5 6.5s2 3 4.5 3 4.5 1.07 4.5 3-2 3.5-4.5 3.5-4.5-1.57-4.5-3.5" />
      </svg>
    ),
  },
];

export default function OptimStats() {
  return (
    <section className="section theme-light section-wipe optim-section" id="optim">
      <div className="section-inner">
        <div className="optim-head">
          <h2 className="optim-heading" data-reveal>
            OPTIM
          </h2>
          <p className="optim-sub" data-reveal style={{ "--reveal-delay": "90ms" } as CSSProperties}>
            OPTIM is circuitEvolve&apos;s core optimization engine — the closed loop that
            mutates, verifies, and converges RTL and analog designs automatically, benchmarked
            against real device libraries and existing ML-driven flows.
          </p>
        </div>

        <div className="optim-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="optim-card"
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <div className="optim-card-surface">
                <span className="optim-card-index">{stat.index}</span>

                <div className="optim-card-top">
                  <span className="optim-card-value">{stat.value}</span>
                  <span className="optim-card-unit">{stat.unit}</span>
                </div>

                <div className="optim-card-body">
                  <span className="optim-card-icon">{stat.icon}</span>
                  <div className="optim-card-title">{stat.title}</div>
                  <p className="optim-card-desc">{stat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
