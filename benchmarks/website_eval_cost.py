from __future__ import annotations

from pathlib import Path
import matplotlib.pyplot as plt

BG = "#070707"
PANEL = "#111111"
TEXT = "#F5F5F7"
MUTED = "#A1A1A6"
GRID = "#2C2C2E"
BLUE = "#4DA3FF"
GREEN = "#30D158"
ACCENT = "#FF2D55"

def main() -> None:
    labels = ["BAGNet", "circuitEvolve"]
    values_ms = [4153, 335]
    colors = [BLUE, GREEN]

    bagnet_ms, evolve_ms = values_ms
    delta_ms = bagnet_ms - evolve_ms
    speedup = bagnet_ms / evolve_ms
    reduction_pct = (delta_ms / bagnet_ms) * 100.0

    plt.rcParams.update(
        {"font.family": "sans-serif",
         "font.sans-serif": ["SF Pro Display", "Helvetica Neue", "Arial", "DejaVu Sans"]}
    )

    fig = plt.figure(figsize=(13.6, 8.0), dpi=220, facecolor=BG)
    ax = fig.add_axes([0.08, 0.16, 0.50, 0.72])
    ax.set_facecolor(BG)

    bars = ax.bar(labels, values_ms, color=colors, width=0.56, zorder=3)

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
        x = bar.get_x() + bar.get_width()/2
        y = bar.get_height()
        ax.text(x, y + 60, f"{value:,} ms", ha="center", va="bottom",
                fontsize=18, fontweight="bold", color=TEXT)

    # KPI panel
    panel = fig.add_axes([0.62, 0.15, 0.31, 0.73], facecolor=PANEL)
    panel.set_xticks([]); panel.set_yticks([])
    for s in panel.spines.values():
        s.set_visible(False)

    panel.text(0.08, 0.90, "Empirical summary", color=MUTED, fontsize=14, fontweight="bold")
    panel.text(0.08, 0.76, f"{speedup:.1f}×", color=ACCENT, fontsize=42, fontweight="bold")
    panel.text(0.46, 0.78, "faster", color=TEXT, fontsize=18)

    panel.text(0.08, 0.59, f"{reduction_pct:.1f}%", color=ACCENT, fontsize=38, fontweight="bold")
    panel.text(0.52, 0.61, "less evaluation time", color=TEXT, fontsize=18)

    panel.text(0.08, 0.43, f"{delta_ms:,} ms", color=ACCENT, fontsize=33, fontweight="bold")
    panel.text(0.08, 0.36, "saved on every candidate evaluation", color=TEXT, fontsize=16)

    panel.text(0.08, 0.20,
               "Interpretation\n"
               "At the same compute budget,\n"
               "circuitEvolve can evaluate\n"
               "substantially more candidate\n"
               "circuits than BAGNet.",
               color=TEXT, fontsize=15, linespacing=1.5)

    out_path = Path(__file__).with_suffix(".png")
    fig.savefig(out_path, bbox_inches="tight", facecolor=BG)
    print(out_path)

if __name__ == "__main__":
    main()
