import VideoWindow from "@/components/VideoWindow";
import ScrollReveal from "@/components/ScrollReveal";
import DemoForm from "@/components/DemoForm";
import DemoScrollButton from "@/components/DemoScrollButton";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import OptimizerPoints from "@/components/OptimizerPoints";
import OptimStats from "@/components/OptimStats";
import type { CSSProperties } from "react";

const brandLetters = "circuitEvolve".split("");

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <main className="site-shell">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section hero theme-light hero-centered" id="top">
        <div className="hero-centered-inner">
          <img src="/assets/ce-logo.png" alt="" className="hero-center-logo-bare" />

          <h1 className="hero-title hero-brand-title" aria-label="CircuitEvolve">
            <span className="hero-brand-word" aria-hidden="true">
              {brandLetters.map((letter, index) => (
                <span
                  className="hero-brand-char"
                  key={`${letter}-${index}`}
                  style={{
                    animationDelay: `${260 + index * 48}ms`,
                    "--char-index": index,
                  } as CSSProperties}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-tagline">Design. Iterate. Converge.</p>

          <div className="hero-cta-row">
            <a href="/thesis" className="thesis-cta-btn hero-thesis-btn">Our Thesis</a>
            <DemoScrollButton className="hero-demo-link" />
          </div>
        </div>

        <ScrollDownArrow targetId="video-window" />
      </section>

      {/* ── Video window ─────────────────────────────────────────────────── */}
      <section className="section theme-light video-window-section" id="video-window">
        <div className="section-inner video-window-wrap">
          <VideoWindow />

          <div className="video-window-copy">
            <p>
              circuitEvolve is building an AI-powered platform that automates
              the analog circuit design process, from an initial
              specification and selected topology to a design ready for
              layout. By intelligently iterating circuit parameters through
              simulation, the platform helps engineers achieve target
              specifications significantly faster while working within their
              existing workflows.
            </p>
            <p>
              circuitEvolve is training-free, simulator-agnostic, and
              PDK-agnostic, enabling it to adapt across technologies, tools,
              and circuit types without requiring proprietary datasets or
              changes to established design environments.
            </p>
          </div>
        </div>
      </section>

      {/* ── Optim Stats ──────────────────────────────────────────────────── */}
      <OptimStats />

      {/* ── Optimizer Points ────────────────────────────────────────────── */}
      <section className="section theme-light optimizer-section">
        <OptimizerPoints />
      </section>

      {/* ── Request a Demo ───────────────────────────────────────────────── */}
      <section className="section theme-light section-wipe demo-section" id="demo">
        <div className="demo-card">
          <div className="demo-card-left" data-reveal>
            <h2 className="demo-card-heading">Request a Demo</h2>
            <p className="demo-card-sub">
              See how circuitEvolve can accelerate your analog circuit design
              workflow. Fill out the form and our team will get in touch.
            </p>
          </div>
          <div className="demo-card-right" data-reveal>
            <DemoForm />
          </div>
        </div>
      </section>

      {/* ── Footer email ─────────────────────────────────────────────────── */}
      <footer className="page-footer">
        <a href="mailto:hello@circuitevolve.com" className="footer-email">
          hello@circuitevolve.com
        </a>
      </footer>

      </main>
    </>
  );
}
