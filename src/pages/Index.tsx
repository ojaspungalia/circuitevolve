import logo from "@/assets/logo_new.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [isWhatIsOpen, setIsWhatIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-background px-8 py-10 md:px-16 md:py-12">
      {/* Top center: Logo + Company name */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={logo}
          alt="circuitEvolve logo"
          className="h-28 w-auto sm:h-32 md:h-40"
        />
        <span className="text-2xl font-medium tracking-wide text-foreground sm:text-3xl md:text-4xl">
          circuit<span className="font-semibold">E</span>volve
        </span>
      </div>

      {/* Center: Hero */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <h1 className="text-center text-4xl font-bold tracking-[0.12em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Design. Iterate. Converge.
        </h1>

        <div className="flex w-full max-w-3xl flex-col items-center gap-6">
          <Link
            to="/learn-more"
            className="rounded-full bg-foreground px-10 py-4 text-base sm:text-lg font-medium tracking-wide text-background transition-transform transition-opacity duration-200 hover:opacity-85 hover:scale-105"
          >
            Our Thesis
          </Link>

          {/* What is circuitEvolve? dropdown */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setIsWhatIsOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-background/60 px-6 py-5 text-left shadow-sm transition-colors hover:bg-background/80"
            >
              <span className="text-lg font-medium text-foreground sm:text-xl">
                What is circuitEvolve?
              </span>
              <svg
                className={`h-5 w-5 text-foreground transition-transform ${
                  isWhatIsOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5.5 7.5L10 12L14.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isWhatIsOpen && (
              <div className="border-x border-b border-foreground/10 bg-background/60 px-5 pb-5 pt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60 sm:text-xs">
                    Technical Note
                  </p>
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      What is circuitEvolve?
                    </p>
                    <p className="mt-1 text-sm text-foreground/70 sm:text-base">
                      A simulator-grounded search system for topology and sizing
                      optimization in analog circuit design
                    </p>
                  </div>

                  <div className="border-l-2 border-foreground/10 pl-4">
                    <p>
                      circuitEvolve is a simulator-grounded search system for
                      analog circuit optimization. The system operates directly
                      on circuit netlists and iteratively proposes modifications
                      to both circuit topology and device parameters. Each
                      candidate design is evaluated through SPICE simulation,
                      and the results are used to guide further exploration of
                      the design space. By combining large language
                      model–guided edits with simulation feedback,
                      circuitEvolve enables automated exploration of circuit
                      structures rather than restricting optimization to
                      parameter tuning within a fixed architecture.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      Design Search Formulation
                    </h2>
                    <p>
                      Analog circuit design can be formulated as a constrained
                      search problem over circuit structures and device
                      parameters. The design space includes topology selection,
                      transistor sizing, bias allocation, and compensation
                      strategies. These choices must satisfy strict constraints
                      including stability, voltage headroom, noise performance,
                      power consumption, and robustness across process, voltage,
                      and temperature variations.
                    </p>
                    <p>
                      Because of the nonlinear and tightly coupled behavior of
                      analog circuits, analytical models alone are insufficient
                      to guarantee design correctness. As a result, circuit
                      simulation remains the primary mechanism for validating
                      circuit behavior. In this setting, the design task becomes
                      an iterative search process in which candidate circuits
                      are generated, simulated, and evaluated against target
                      specifications.
                    </p>
                    <p>
                      circuitEvolve formulates analog design as a
                      simulation-driven optimization framework operating directly
                      on circuit netlists. Instead of treating the circuit
                      structure as fixed, the system searches over both topology
                      and parameter configurations in order to discover designs
                      that satisfy performance constraints.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      System Architecture
                    </h2>
                    <p>
                      circuitEvolve performs iterative circuit optimization by
                      generating candidate netlist modifications, evaluating them
                      through simulation, and using the resulting performance
                      signals to guide subsequent search. Starting from a
                      baseline circuit, the system repeatedly proposes
                      modifications to the design, evaluates the resulting
                      circuits through simulation, and retains high-performing
                      candidates for further exploration.
                    </p>
                    <p className="text-sm text-foreground/70">
                      Figure 1: circuitEvolve optimization loop. Candidate
                      circuits are generated by an LLM, evaluated through SPICE
                      simulation, and refined through evolutionary selection.
                    </p>
                    <div className="mt-2 flex justify-center">
                      <img
                        src="/figure1.png"
                        alt="circuitEvolve optimization loop"
                        className="w-full max-w-[12rem] rounded-md border border-foreground/10 sm:max-w-[18rem]"
                      />
                    </div>
                    <p>
                      Step 1 — <span className="underline">Design Specifications and Baseline Circuit:</span> The
                      system begins with a problem specification and an initial
                      circuit design. The starting design may be a baseline
                      netlist or a parameterized circuit template. In addition
                      to the circuit description, the system receives a set of
                      design rules and constraints that define the allowable
                      device types, node naming conventions, and bias source
                      interfaces used within the design environment.
                    </p>
                    <p>
                      Step 2 — <span className="underline">LLM-Guided Circuit Edits:</span> A large language model
                      proposes candidate modifications to the circuit. These
                      modifications can include adjustments to device parameters
                      as well as structural edits such as inserting additional
                      devices, modifying current paths, or altering bias
                      configurations. To maintain robustness, the model output
                      is restricted to a structured format that limits changes
                      to predefined editable sections of the netlist.
                    </p>
                    <p>
                      Step 3 — <span className="underline">Harness Rebuild:</span> The system extracts the editable
                      portion of the proposal and integrates it into a
                      standardized simulation harness. The harness reconstructs
                      the complete netlist including supplies, loads, device
                      models, stimuli, and measurement directives. This ensures
                      that every candidate design is evaluated within an
                      identical simulation environment.
                    </p>
                    <p>
                      Step 4 — <span className="underline">Simulation-Based Evaluation:</span> Each candidate
                      circuit is evaluated using a circuit simulator such as
                      ngspice, Spectre, or HSPICE. The simulator computes the
                      required performance metrics, including gain, bandwidth,
                      noise, power consumption, and stability. These metrics
                      provide the ground-truth assessment of circuit behavior.
                    </p>
                    <p>
                      Step 5 — <span className="underline">Fitness Evaluation:</span> Simulation results are
                      converted into a fitness score representing how well the
                      candidate design satisfies the target specifications.
                      Designs that violate critical constraints receive
                      penalties, while designs that improve key performance
                      metrics are assigned higher scores.
                    </p>
                    <p>
                      Step 6 — <span className="underline">Evolutionary Selection:</span> The system stores each
                      evaluated candidate along with its performance metrics. An
                      evolutionary selection process chooses high-performing
                      circuits to act as parents for the next generation. <span className="underline">The
                      selection process also preserves diversity across
                      candidate circuits to prevent premature convergence to
                      local optima.</span> This loop continues until the system
                      converges to a design that satisfies the target
                      specifications or until a predefined search budget is
                      exhausted.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      Overcoming Recency Bias in Agentic Design Systems
                    </h2>
                    <p>
                      Agentic optimization systems that rely on sequential
                      reasoning often exhibit a strong recency bias. Candidate
                      designs are generated primarily from the most recently
                      explored design state, causing the search process to
                      follow a single trajectory through the design space. When
                      this trajectory encounters a local optimum, the system may
                      fail to recover earlier design alternatives that could
                      lead to better solutions.
                    </p>
                    <p>
                      circuitEvolve mitigates this limitation by maintaining a
                      population of candidate circuits across multiple
                      generations. Instead of relying only on the most recent
                      design, the evolutionary framework preserves multiple
                      design lineages simultaneously. This allows the system to
                      revisit earlier design branches and continue exploring
                      structural variations that may have initially appeared
                      less promising.
                    </p>
                    <div className="mt-3 space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-foreground/70">
                          Animation 1: Evolution of candidate circuit lineages
                          across the optimization process, illustrating how
                          preserved branches can later produce the strongest
                          final design.
                        </p>
                        <video
                          controls
                          className="w-full rounded-md border border-foreground/10"
                        >
                          <source src="/animation1.mp4" type="video/mp4" />
                        </video>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-foreground/70">
                          Figure 2: Evolutionary lineage map of circuit
                          optimization. The final optimal circuit originates
                          from an earlier branch rather than a recent candidate
                          trajectory.
                        </p>
                        <img
                          src="/figure2.png"
                          alt="Evolutionary lineage map of circuit optimization"
                          className="w-full rounded-md border border-foreground/10"
                        />
                      </div>
                    </div>
                    <p>
                      In the example shown, the final optimized circuit does not
                      descend from the most recent design iteration. Instead, it
                      emerges from an earlier branch in the evolutionary search
                      tree. This behavior reflects the system&rsquo;s ability to
                      maintain exploration across multiple design families
                      rather than prematurely committing to a single trajectory.
                    </p>
                    <p>
                      By preserving multiple circuit lineages, circuitEvolve
                      balances exploration and exploitation during optimization.
                      This mechanism allows the system to avoid local optima and
                      to discover design configurations that would be difficult
                      to reach through purely sequential search strategies.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom center: Email */}
      <div className="pb-4 text-center">
        <span className="text-lg font-light tracking-wide text-foreground/80 sm:text-xl md:text-2xl">
          hello@circuitevolve.com
        </span>
      </div>
    </div>
  );
};

export default Index;

