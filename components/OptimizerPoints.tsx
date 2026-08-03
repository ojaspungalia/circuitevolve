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
    iconClass: "fa-solid fa-shuffle",
    colorClass: "op-icon-blue",
    title: "Tool-agnostic",
    desc: "Works across any PDK or simulator.",
  },
  {
    id: "ppa",
    iconClass: "fa-solid fa-ban",
    colorClass: "op-icon-amber",
    title: "Training-free",
    desc: "No proprietary datasets or pretraining required.",
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
  return (
    <div className="optimizer-wrap">
      <ul className="optimizer-grid" data-group="optimizer">
        {points.map((point) => (
          <li key={point.id} id={`optimizer-card-${point.id}`} className="optimizer-item">
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
