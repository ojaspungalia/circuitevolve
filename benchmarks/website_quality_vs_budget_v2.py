from __future__ import annotations

import csv
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.lines as mlines

BG = "#F2EDE4"
TEXT = "#1C1917"
MUTED = "#6B6560"
GRID = "#D4CEC6"
BLUE = "#4A6FA5"
GREEN = "#6B8F3E"
ACCENT = "#A0342A"

def load_data(csv_path: Path):
    x, bagnet, ce = [], [], []
    with csv_path.open() as f:
        reader = csv.DictReader(f)
        for row in reader:
            x.append(int(row["index"]))
            bagnet.append(float(row["bagnet"]))
            ce.append(float(row["oe_topo_sizing_messy"]))
    return np.array(x), np.array(bagnet), np.array(ce)

def first_cross(x, values, threshold):
    idx = np.where(values >= threshold)[0]
    return int(x[idx[0]]) if len(idx) else None

def value_at(x, values, target_x):
    idx = np.where(x == target_x)[0]
    return float(values[idx[0]]) if len(idx) else None

def main():
    csv_path = Path(__file__).with_name("comparison.csv")
    out_path = Path(__file__).parent / "website_quality_vs_budget_v2.png"

    x, bagnet, ce = load_data(csv_path)

    target = 0.65
    ce_cutoff = 200
    mask_ce = x <= ce_cutoff

    ce_peak = float(ce.max())
    bag_peak = float(bagnet.max())
    ce_peak_x = int(x[ce.argmax()])
    bag_peak_x = int(x[bagnet.argmax()])
    ce_target_x = first_cross(x, ce, target)
    bag_target_x = first_cross(x, bagnet, target)

    plt.rcParams.update(
        {"font.family": "sans-serif",
         "font.sans-serif": ["SF Pro Display", "Helvetica Neue", "Arial", "DejaVu Sans"]}
    )

    fig = plt.figure(figsize=(10.0, 6.5), dpi=210, facecolor=BG)
    ax = fig.add_axes([0.10, 0.14, 0.84, 0.74])
    ax.set_facecolor(BG)

    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.spines["left"].set_color(GRID)
    ax.spines["bottom"].set_color(GRID)

    ax.set_xlabel("Circuit evaluations", color=TEXT, fontsize=18, labelpad=12)
    ax.set_ylabel("Performance", color=TEXT, fontsize=18, labelpad=14)
    ax.set_xlim(0, 1010)
    ax.set_ylim(0, 1.02)

    ax.set_xticks([0, 200, 400, 600, 800, 1000])
    ax.set_xticklabels([f"{v:,}" for v in [0, 200, 400, 600, 800, 1000]], color=MUTED, fontsize=13)
    ax.set_yticks([0.0, 0.25, 0.5, 0.75, 1.0])
    ax.set_yticklabels(["0.0", "0.25", "0.50", "0.75", "1.0"], color=MUTED, fontsize=13)
    ax.tick_params(colors=MUTED, length=0)
    ax.yaxis.grid(True, color=GRID, alpha=0.7, linestyle="--", linewidth=0.8)

    ax.plot(x, bagnet, color=BLUE, linewidth=4.5, solid_capstyle="round")
    ax.plot(x[mask_ce], ce[mask_ce], color=GREEN, linewidth=4.5, solid_capstyle="round")

    ax.axhline(target, color=ACCENT, linewidth=2.0, linestyle=":", alpha=0.9)
    ax.text(505, target + 0.02, "TARGET", color=ACCENT, fontsize=15, fontweight="bold", ha="center")

    ax.scatter([ce_peak_x], [ce_peak], s=70, color=GREEN, zorder=5)
    ax.scatter([bag_peak_x], [bag_peak], s=70, color=BLUE, zorder=5)

    ax.text(ce_peak_x + 14, ce_peak - 0.07, f"peak = {ce_peak:.2f}\nat {ce_peak_x} evals",
            color=GREEN, fontsize=12)

    ax.text(885, 0.72, f"peak = {bag_peak:.2f}\nat {bag_peak_x} evals",
            color=BLUE, fontsize=12)

    if ce_target_x is not None:
        ax.axvline(ce_target_x, color=GREEN, linewidth=1.2, linestyle="--", alpha=0.6)
        ax.text(ce_target_x + 10, 0.13, f"target reached\nat {ce_target_x}", color=GREEN, fontsize=11.5)

    if bag_target_x is not None:
        ax.axvline(bag_target_x, color=BLUE, linewidth=1.2, linestyle="--", alpha=0.5)
        ax.text(bag_target_x + 10, 0.55, f"target reached\nat {bag_target_x}", color=BLUE, fontsize=11.5)

    ax.set_title("Optimization Quality vs Search Budget", fontsize=26, fontweight="bold", color=TEXT, loc="left", pad=20)
    ax.text(0.0, 1.02, "circuitEvolve reaches higher performance with substantially fewer evaluations.",
            transform=ax.transAxes, color=MUTED, fontsize=11.5, ha="left")

    ce_handle = mlines.Line2D([], [], color=GREEN, linewidth=4, label="circuitEvolve")
    bag_handle = mlines.Line2D([], [], color=BLUE, linewidth=4, label="BAGNet")
    legend = ax.legend(
        handles=[ce_handle, bag_handle],
        loc="lower right",
        fontsize=18,
        frameon=True,
        framealpha=0.4,
        facecolor=BG,
        edgecolor=GRID,
        handlelength=2.2,
        handleheight=1.4,
        borderpad=0.9,
        labelspacing=0.6,
    )
    for text, color in zip(legend.get_texts(), [GREEN, BLUE]):
        text.set_color(color)
        text.set_fontweight("bold")
        text.set_fontsize(18)

    fig.savefig(out_path, bbox_inches="tight", facecolor=BG)
    print(out_path)

if __name__ == "__main__":
    main()
