from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt


# Dark Apple keynote-like palette
BG = "#000000"
TEXT = "#F5F5F7"
MUTED = "#A1A1A6"
GRID = "#2C2C2E"
ORANGE = "#FF6437"
GREEN = "#30D158"
ACCENT = "#FF2D55"


def main() -> None:
    labels = ["BAGNet", "circuitEvolve"]
    values_ms = [4153, 335]
    colors = [ORANGE, GREEN]

    bagnet_ms = values_ms[0]
    evolve_ms = values_ms[1]
    delta_ms = bagnet_ms - evolve_ms
    speedup = bagnet_ms / evolve_ms
    reduction_pct = (delta_ms / bagnet_ms) * 100.0

    plt.rcParams.update(
        {
            "font.family": "sans-serif",
            "font.sans-serif": ["SF Pro Display", "Helvetica Neue", "Arial", "DejaVu Sans"],
        }
    )

    fig = plt.figure(figsize=(13.0, 7.5), dpi=220, facecolor=BG)
    ax = fig.add_axes([0.07, 0.14, 0.53, 0.74])
    ax.set_facecolor(BG)

    bars = ax.bar(labels, values_ms, color=colors, width=0.58, zorder=3)

    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.spines["left"].set_color(GRID)
    ax.spines["bottom"].set_color(GRID)
    ax.spines["left"].set_linewidth(1.2)
    ax.spines["bottom"].set_linewidth(1.2)

    ax.grid(axis="y", color=GRID, linewidth=1.0, alpha=0.95, zorder=0)
    ax.set_axisbelow(True)

    ymax = 4600
    ax.set_ylim(0, ymax)
    ax.tick_params(axis="x", labelsize=17, colors=TEXT, pad=12)
    ax.tick_params(axis="y", labelsize=13, colors=MUTED)
    ax.set_ylabel("Time (ms)", fontsize=16, color=MUTED, labelpad=12)

    ax.set_title("Time Per Evaluation", fontsize=30, fontweight="bold", color=TEXT, pad=20, loc="left")

    for bar, value in zip(bars, values_ms):
        x = bar.get_x() + bar.get_width() / 2
        y = bar.get_height()
        pad = max(26, ymax * 0.012)
        ax.text(
            x,
            y + pad,
            f"{value}ms",
            ha="center",
            va="bottom",
            fontsize=18,
            fontweight="bold",
            color=TEXT,
        )

    # Apple-style KPI panel on the right
    fig.text(0.66, 0.68, f"{delta_ms:,} ms", color=ACCENT, fontsize=46, fontweight="bold")
    fig.text(0.66, 0.56, f"{speedup:.1f}x faster", color=ACCENT, fontsize=30, fontweight="bold")
    fig.text(0.66, 0.48, "circuitEvolve vs BAGNet", color=TEXT, fontsize=20, fontweight="bold")
    fig.text(0.66, 0.39, f"{reduction_pct:.1f}% less evaluation time", color=TEXT, fontsize=22)

    out_path = Path(__file__).with_suffix(".png")
    fig.savefig(out_path, bbox_inches="tight", facecolor=BG)
    print(out_path)


if __name__ == "__main__":
    main()
