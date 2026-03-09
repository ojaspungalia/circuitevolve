from __future__ import annotations

import csv
from pathlib import Path

import matplotlib.pyplot as plt


APPLE_BLUE = "#4DA3FF"
APPLE_GREEN = "#30D158"
ACCENT = "#FF2D55"
BG = "#000000"
TEXT = "#F5F5F7"
MUTED = "#9A9AA0"


def load_data(csv_path: Path):
    iterations, bagnet, messy = [], [], []
    with csv_path.open() as f:
        reader = csv.DictReader(f)
        for row in reader:
            iterations.append(int(row["index"]))
            bagnet.append(float(row["bagnet"]))
            messy.append(float(row["oe_topo_sizing_messy"]))
    return iterations, bagnet, messy


def first_crossing(values, threshold):
    for i, v in enumerate(values):
        if v >= threshold:
            return i
    return None


def main():
    csv_path = Path(__file__).with_name("comparison.csv")
    out_path = Path(__file__).with_suffix(".png")

    x, bagnet, messy = load_data(csv_path)

    green_cutoff = 200
    x_green = x[: green_cutoff + 1]
    messy_green = messy[: green_cutoff + 1]

    target = 0.65

    plt.rcParams.update(
        {
            "font.family": "sans-serif",
            "font.sans-serif": ["SF Pro Display", "Helvetica Neue", "Arial", "DejaVu Sans"],
        }
    )

    fig = plt.figure(figsize=(12.8, 7.5), dpi=175, facecolor=BG)
    ax = fig.add_axes([0.07, 0.16, 0.62, 0.74])
    ax.set_facecolor(BG)

    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.spines["left"].set_color("#2C2C2E")
    ax.spines["bottom"].set_color("#2C2C2E")

    # Subtle, readable axes for pitch deck
    ax.set_xlabel("Iterations", color=TEXT, fontsize=20, labelpad=12)
    ax.set_ylabel("Performance", color=TEXT, fontsize=20, labelpad=14)

    ax.set_xlim(0, 1010)
    ax.set_ylim(0, 1.02)

    ax.set_xticks([0, 200, 400, 600, 800, 1000])
    ax.set_xticklabels([f"{v:,}" for v in [0, 200, 400, 600, 800, 1000]], color=MUTED, fontsize=14)

    ax.set_yticks([0.0, 0.25, 0.5, 0.75, 1.0])
    ax.set_yticklabels(["0.0", "0.25", "0.50", "0.75", "1.0"], color=MUTED, fontsize=14)

    ax.tick_params(colors=MUTED, length=0)
    ax.yaxis.grid(True, color="#2C2C2E", alpha=0.6, linestyle="--", linewidth=0.8)
    ax.xaxis.grid(False)

    ax.plot(x, bagnet, color=APPLE_BLUE, linewidth=6.0, solid_capstyle="round")
    ax.plot(x_green, messy_green, color=APPLE_GREEN, linewidth=5.6, solid_capstyle="round")

    ax.axhline(target, color=ACCENT, linewidth=2.6, linestyle=":", alpha=0.95)
    ax.text(500, target + 0.018, "TARGET", color=ACCENT, fontsize=18, fontweight="bold", ha="center")

    ax.set_title("circuitEvolve vs RL", fontsize=38, fontweight="bold", color=TEXT, loc="left", pad=18)

    ax.text(905, bagnet[905] + 0.035, "RL", color=APPLE_BLUE, fontsize=28, fontweight="bold")
    ax.text(56, 0.79, "circuitEvolve", color=APPLE_GREEN, fontsize=28, fontweight="bold")

    fig.savefig(out_path)
    print(out_path)


if __name__ == "__main__":
    main()
