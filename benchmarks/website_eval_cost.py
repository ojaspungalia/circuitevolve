from __future__ import annotations

from pathlib import Path
import matplotlib.pyplot as plt

BG = "#F2EDE4"
TEXT = "#1C1917"
MUTED = "#6B6560"
GRID = "#D4CEC6"
BLUE = "#4A6FA5"
GREEN = "#6B8F3E"

def main() -> None:
    labels = ["BAGNet", "circuitEvolve"]
    values_ms = [4153, 335]
    colors = [BLUE, GREEN]

    plt.rcParams.update(
        {"font.family": "sans-serif",
         "font.sans-serif": ["SF Pro Display", "Helvetica Neue", "Arial", "DejaVu Sans"]}
    )

    fig = plt.figure(figsize=(9.0, 6.5), dpi=220, facecolor=BG)
    ax = fig.add_axes([0.12, 0.16, 0.80, 0.72])
    ax.set_facecolor(BG)

    bars = ax.bar(labels, values_ms, color=colors, width=0.46, zorder=3)

    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.spines["left"].set_color(GRID)
    ax.spines["bottom"].set_color(GRID)
    ax.spines["left"].set_linewidth(1.2)
    ax.spines["bottom"].set_linewidth(1.2)

    ymax = 4600
    ax.set_ylim(0, ymax)
    ax.grid(axis="y", color=GRID, linewidth=1.0, alpha=0.95, zorder=0)
    ax.set_axisbelow(True)
    ax.tick_params(axis="x", labelsize=18, colors=TEXT, pad=12)
    ax.tick_params(axis="y", labelsize=13, colors=MUTED)
    ax.set_ylabel("Time per evaluation (ms)", fontsize=16, color=MUTED, labelpad=12)

    ax.set_title("Per-Evaluation Cost", fontsize=30, fontweight="bold", color=TEXT, loc="left", pad=20)
    ax.text(0.0, 1.02, "Lower evaluation cost expands the practical search budget.",
            transform=ax.transAxes, color=MUTED, fontsize=12.5, ha="left")

    for bar, value in zip(bars, values_ms):
        x = bar.get_x() + bar.get_width() / 2
        y = bar.get_height()
        ax.text(x, y + 60, f"{value:,} ms", ha="center", va="bottom",
                fontsize=18, fontweight="bold", color=TEXT)

    out_path = Path(__file__).with_suffix(".png")
    fig.savefig(out_path, bbox_inches="tight", facecolor=BG)
    print(out_path)

if __name__ == "__main__":
    main()
