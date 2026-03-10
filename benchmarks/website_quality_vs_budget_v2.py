from __future__ import annotations

import csv
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.lines as mlines

BG = "#070707"
PANEL = "#111111"
TEXT = "#F5F5F7"
MUTED = "#9A9AA0"
GRID = "#2C2C2E"
BLUE = "#4DA3FF"
GREEN = "#30D158"
ACCENT = "#FF2D55"

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
    score_ce = ce_peak / ce_peak_x
    score_bag = bag_peak / bag_peak_x

    plt.rcParams.update(
        {"font.family": "sans-serif",
         "font.sans-serif": ["SF Pro Display", "Helvetica Neue", "Arial", "DejaVu Sans"]}
    )

    fig = plt.figure(figsize=(14.2, 8.0), dpi=210, facecolor=BG)
    ax = fig.add_axes([0.08, 0.16, 0.56, 0.72])
    ax.set_facecolor(BG)

    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.spines["left"].set_color(GRID)
    ax.spines["bottom"].set_color(GRID)

    ax.set_xlabel("Circuit evaluations", color=TEXT, fontsize=20, labelpad=12)
    ax.set_ylabel("Performance", color=TEXT, fontsize=20, labelpad=14)
    ax.set_xlim(0, 1010)
    ax.set_ylim(0, 1.02)

    ax.set_xticks([0, 200, 400, 600, 800, 1000])
    ax.set_xticklabels([f"{v:,}" for v in [0, 200, 400, 600, 800, 1000]], color=MUTED, fontsize=14)
    ax.set_yticks([0.0, 0.25, 0.5, 0.75, 1.0])
    ax.set_yticklabels(["0.0", "0.25", "0.50", "0.75", "1.0"], color=MUTED, fontsize=14)
    ax.tick_params(colors=MUTED, length=0)
    ax.yaxis.grid(True, color=GRID, alpha=0.7, linestyle="--", linewidth=0.8)

    ax.plot(x, bagnet, color=BLUE, linewidth=5.4, solid_capstyle="round")
    ax.plot(x[mask_ce], ce[mask_ce], color=GREEN, linewidth=5.4, solid_capstyle="round")

    ax.axhline(target, color=ACCENT, linewidth=2.3, linestyle=":", alpha=0.95)
    ax.text(505, target + 0.02, "TARGET", color=ACCENT, fontsize=17, fontweight="bold", ha="center")

    ax.scatter([ce_peak_x], [ce_peak], s=90, color=GREEN, zorder=5)
    ax.scatter([bag_peak_x], [bag_peak], s=90, color=BLUE, zorder=5)

    # circuitEvolve peak annotation
    ax.text(ce_peak_x + 14, ce_peak - 0.07, f"peak = {ce_peak:.2f}\nat {ce_peak_x} evals",
            color=GREEN, fontsize=13)

    # BAGNet peak annotation — top right where BAGNet label was
    ax.text(885, 0.72, f"peak = {bag_peak:.2f}\nat {bag_peak_x} evals",
            color=BLUE, fontsize=13)

    if ce_target_x is not None:
        ax.axvline(ce_target_x, color=GREEN, linewidth=1.3, linestyle="--", alpha=0.7)
        ax.text(ce_target_x + 10, 0.13, f"target reached\nat {ce_target_x}", color=GREEN, fontsize=12.5)

    if bag_target_x is not None:
        ax.axvline(bag_target_x, color=BLUE, linewidth=1.3, linestyle="--", alpha=0.55)
        ax.text(bag_target_x + 10, 0.55, f"target reached\nat {bag_target_x}", color=BLUE, fontsize=12.5)

    ax.set_title("Optimization Quality vs Search Budget", fontsize=31, fontweight="bold", color=TEXT, loc="left", pad=20)
    ax.text(0.0, 1.02, "circuitEvolve reaches higher performance with substantially fewer evaluations.",
            transform=ax.transAxes, color=MUTED, fontsize=12.5, ha="left")

    # Legend key — bottom left inside the chart
    ce_handle = mlines.Line2D([], [], color=GREEN, linewidth=4, label="circuitEvolve")
    bag_handle = mlines.Line2D([], [], color=BLUE, linewidth=4, label="BAGNet")
    legend = ax.legend(
        handles=[ce_handle, bag_handle],
        loc="lower right",
        fontsize=22,
        frameon=True,
        framealpha=0.25,
        facecolor=PANEL,
        edgecolor=GRID,
        labelcolor=[GREEN, BLUE],
        handlelength=2.2,
        handleheight=1.4,
        borderpad=0.9,
        labelspacing=0.6,
    )
    for text, color in zip(legend.get_texts(), [GREEN, BLUE]):
        text.set_color(color)
        text.set_fontweight("bold")
        text.set_fontsize(22)

    panel = fig.add_axes([0.68, 0.15, 0.27, 0.73], facecolor=PANEL)
    panel.set_xticks([]); panel.set_yticks([])
    for s in panel.spines.values():
        s.set_visible(False)

    panel.text(0.08, 0.90, "Three reported quantities", color=MUTED, fontsize=14, fontweight="bold")
    panel.text(0.08, 0.78, f"{ce_peak:.2f} vs {bag_peak:.2f}", color=ACCENT, fontsize=28, fontweight="bold")
    panel.text(0.08, 0.71, "peak performance", color=TEXT, fontsize=15)

    panel.text(0.08, 0.57, f"{ce_target_x} vs {bag_target_x}", color=ACCENT, fontsize=28, fontweight="bold")
    panel.text(0.08, 0.50, f"evaluations to target ({target:.2f})", color=TEXT, fontsize=15)

    panel.text(0.08, 0.36, f"{score_ce:.4f} vs {score_bag:.4f}", color=ACCENT, fontsize=28, fontweight="bold")
    panel.text(0.08, 0.29, "peak-performance / eval score", color=TEXT, fontsize=15)

    panel.text(0.08, 0.12,
               "This figure should be read as\n"
               "quality achieved under a fixed\n"
               "evaluation budget, not merely\n"
               "\"iterations to converge.\"",
               color=TEXT, fontsize=14.5, linespacing=1.5)

    fig.savefig(out_path, bbox_inches="tight", facecolor=BG)
    print(out_path)

if __name__ == "__main__":
    main()
