import logo from "@/assets/logo_new.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [isProblemOpen, setIsProblemOpen] = useState(false);
  const [isWhatIsOpen, setIsWhatIsOpen] = useState(false);
  const [isEmpiricalOpen, setIsEmpiricalOpen] = useState(false);

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

          {/* What problem are we solving? dropdown */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setIsProblemOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-background/60 px-6 py-5 text-left shadow-sm transition-colors hover:bg-background/80"
            >
              <span className="text-lg font-medium text-foreground sm:text-xl">
                What problem are we solving?
              </span>
              <svg
                className={`h-5 w-5 text-foreground transition-transform ${
                  isProblemOpen ? "rotate-180" : ""
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

            {isProblemOpen && (
              <div className="border-x border-b border-foreground/10 bg-background/60 px-5 pb-5 pt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                <div className="space-y-4">
                  <p>
                    Analog circuit design remains largely a <strong>manual optimization process</strong>. Engineers must iteratively explore circuit topologies, adjust device sizing, and repeatedly validate designs through simulation to meet target specifications. Even with modern design environments, much of this exploration is guided by expert intuition and trial-and-error iteration.
                  </p>
                  <p>
                    As a result, convergence to a valid design can require <span className="underline">thousands of SPICE simulations and significant engineering time</span>. The design space is both large and tightly constrained: topology choices, transistor sizing, bias allocation, and compensation strategies must simultaneously satisfy requirements for stability, power, noise, bandwidth, and robustness across process, voltage, and temperature variations.
                  </p>
                  <p>
                    <span className="underline">Existing approaches typically address only a portion of this problem.</span> Many tools focus on parameter optimization within a fixed circuit topology, while recent machine learning systems attempt to accelerate sizing for predefined circuit structures. These approaches improve local optimization but do not address the broader challenge of <strong>exploring both circuit topology and device sizing</strong> under real analog constraints.
                  </p>
                  <p>
                    The core problem is therefore not only faster sizing, but <span className="underline">scalable automation of the full design search process</span>. This includes discovering viable circuit structures, tuning device parameters, and verifying performance through simulation. That is the technical gap circuitEvolve is designed to address.
                  </p>
                </div>
              </div>
            )}
          </div>

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
                      on circuit design schematics and iteratively proposes modifications
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
                      on circuit design schematics. Instead of treating the circuit
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
                      generating candidate design schematic modifications, evaluating them
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
                      design schematic or a parameterized circuit template. In addition
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
                      to predefined editable sections of the design schematic.
                    </p>
                    <p>
                      Step 3 — <span className="underline">Harness Rebuild:</span> The system extracts the editable
                      portion of the proposal and integrates it into a
                      standardized simulation harness. The harness reconstructs
                      the complete design schematic including supplies, loads, device
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
                        <img
                          src="/animation1.gif"
                          alt="Evolution of candidate circuit lineages"
                          className="w-full rounded-md border border-foreground/10"
                        />
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

          {/* Empirical Evaluation dropdown */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setIsEmpiricalOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-background/60 px-6 py-5 text-left shadow-sm transition-colors hover:bg-background/80"
            >
              <span className="text-lg font-medium text-foreground sm:text-xl">
                Empirical Evaluation
              </span>
              <svg
                className={`h-5 w-5 text-foreground transition-transform ${
                  isEmpiricalOpen ? "rotate-180" : ""
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

            {isEmpiricalOpen && (
              <div className="border-x border-b border-foreground/10 bg-background/60 px-5 pb-5 pt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                <div className="space-y-6">

                  {/* Umbrella intro */}
                  <p>
                    We compare circuitEvolve against three optimization systems from the literature: <strong>BAGNet</strong>, a reinforcement learning based analog sizing system evaluated on the two-stage amplifier task; <strong>EEsizer</strong>, a general purpose agent for analog circuit sizing; and <strong>AmpAgent</strong>, a recently proposed method for LLM guided circuit optimization evaluated on the AZC amplifier benchmark. Each comparison reports three quantities: peak performance reached during optimization, number of evaluations required to reach a defined target threshold, and a search-efficiency score computed as peak performance divided by total evaluations at peak. These metrics jointly characterize solution quality, sample efficiency, and optimization effectiveness under a fixed evaluation budget.
                  </p>

                  {/* BAGNet section */}
                  <div className="space-y-4 border-t border-foreground/10 pt-5">
                    <p className="text-xs font-medium uppercase tracking-widest text-foreground/50">Comparison I</p>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">BAGNet</h3>
                    <p>
                      BAGNet applies reinforcement learning to the two-stage amplifier sizing problem, treating device parameter selection as a sequential decision process. We evaluate circuitEvolve on the same task under an identical composite objective and compare across the three reported quantities. The target threshold is set at 0.65, corresponding to a level BAGNet reaches after extensive search.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-foreground/20">
                            <th className="px-3 py-2 text-left font-semibold">Metric</th>
                            <th className="px-3 py-2 text-left font-semibold">BAGNet</th>
                            <th className="px-3 py-2 text-left font-semibold">circuitEvolve</th>
                            <th className="px-3 py-2 text-left font-semibold">Improvement</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/10">
                          <tr>
                            <td className="px-3 py-2">Peak performance</td>
                            <td className="px-3 py-2 font-mono">0.70</td>
                            <td className="px-3 py-2 font-mono">1.00</td>
                            <td className="px-3 py-2 font-semibold">1.43× higher</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Evaluations to reach target (0.65)</td>
                            <td className="px-3 py-2 font-mono">589</td>
                            <td className="px-3 py-2 font-mono">74</td>
                            <td className="px-3 py-2 font-semibold">7.96× fewer</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Peak performance / evaluations at peak</td>
                            <td className="px-3 py-2 font-mono">0.000736</td>
                            <td className="px-3 py-2 font-mono">0.005000</td>
                            <td className="px-3 py-2 font-semibold">6.79× better</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p>
                      circuitEvolve reaches the target threshold in 74 evaluations compared to 589 for BAGNet, attains a higher peak score of 1.00 against 0.70, and produces a search-efficiency score 6.79× greater. The result indicates that simulation-grounded topology search extracts substantially more value from each evaluation than policy gradient sizing alone.
                    </p>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-semibold tracking-tight text-foreground">Per-evaluation runtime</h4>
                      <p>
                        Per-evaluation runtime determines how many circuit candidates can be assessed within a fixed wall-clock budget. A lower cost per evaluation directly expands the practical search horizon.
                      </p>
                      <div className="flex justify-center">
                        <img
                          src="/figure3.png"
                          alt="Per-evaluation cost comparison"
                          className="w-full max-w-2xl rounded-md border border-foreground/10"
                        />
                      </div>
                      <p className="text-sm text-foreground/70">
                        <strong>Figure 3:</strong> Per-evaluation cost. circuitEvolve reduces evaluation time from 4,153 ms to 335 ms, yielding 12.4× faster evaluation and 91.9% less evaluation time relative to BAGNet. This directly increases the practical search budget available under fixed compute.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-semibold tracking-tight text-foreground">Solution quality under fixed budget</h4>
                      <p>
                        Solution quality under a fixed evaluation budget provides a more complete picture than raw iteration count alone. The curve below shows that circuitEvolve reaches the target threshold earlier and continues improving to a stronger final solution, while BAGNet requires substantially more evaluations and saturates at a lower peak.
                      </p>
                      <div className="flex justify-center">
                        <img
                          src="/figure4.png"
                          alt="Optimization quality versus search budget"
                          className="w-full max-w-2xl rounded-md border border-foreground/10"
                        />
                      </div>
                      <p className="text-sm text-foreground/70">
                        <strong>Figure 4:</strong> Optimization quality versus search budget. circuitEvolve reaches the target threshold (0.65) in 74 evaluations, whereas BAGNet requires 589 evaluations. circuitEvolve also reaches a higher peak performance (1.00) than BAGNet (0.70), indicating superior sample efficiency and stronger final optimization quality.
                      </p>
                    </div>
                  </div>

                  {/* EEsizer section */}
                  <div className="space-y-4 border-t border-foreground/10 pt-5">
                    <p className="text-xs font-medium uppercase tracking-widest text-foreground/50">Comparison II</p>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">EEsizer</h3>
                    <p>
                      EEsizer is an industrial sizing optimization framework that applies structured parameter search within a fixed circuit topology. Both systems are evaluated under the same composite objective and SPICE harness. The target threshold is set at 5.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-foreground/20">
                            <th className="px-3 py-2 text-left font-semibold">Metric</th>
                            <th className="px-3 py-2 text-left font-semibold">EEsizer</th>
                            <th className="px-3 py-2 text-left font-semibold">circuitEvolve</th>
                            <th className="px-3 py-2 text-left font-semibold">Improvement</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/10">
                          <tr>
                            <td className="px-3 py-2">Peak performance</td>
                            <td className="px-3 py-2 font-mono">5.1869</td>
                            <td className="px-3 py-2 font-mono">8.3003</td>
                            <td className="px-3 py-2 font-semibold">1.60× higher</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Evaluations to reach target (5)</td>
                            <td className="px-3 py-2 font-mono">25</td>
                            <td className="px-3 py-2 font-mono">7</td>
                            <td className="px-3 py-2 font-semibold">3.57× fewer</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* AmpAgent section */}
                  <div className="space-y-4 border-t border-foreground/10 pt-5">
                    <p className="text-xs font-medium uppercase tracking-widest text-foreground/50">Comparison III</p>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">AmpAgent (AZC Amplifier)</h3>
                    <p>
                      AmpAgent applies an LLM guided optimization loop to the AZC amplifier, a widely used analog benchmark circuit. Performance is measured using the IFOMS objective, which aggregates gain-bandwidth product, phase margin, supply current, and load conditions into a single scalar. We compare the best circuit found by AmpAgent against the best circuit found by circuitEvolve on the same task.
                    </p>

                    <p>
                      Using a target threshold of 192,000 IFOMS, corresponding to the baseline reference value reported in the AmpAgent paper, we compare search efficiency across both systems.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <caption className="mb-2 text-left text-xs font-medium uppercase tracking-widest text-foreground/50">
                          AZC search efficiency (target: 192,000 IFOMS)
                        </caption>
                        <thead>
                          <tr className="border-b-2 border-foreground/20">
                            <th className="px-3 py-2 text-left font-semibold">Metric</th>
                            <th className="px-3 py-2 text-left font-semibold">AmpAgent</th>
                            <th className="px-3 py-2 text-left font-semibold">circuitEvolve</th>
                            <th className="px-3 py-2 text-left font-semibold">Improvement</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/10">
                          <tr>
                            <td className="px-3 py-2">Peak performance</td>
                            <td className="px-3 py-2 font-mono">322,340</td>
                            <td className="px-3 py-2 font-semibold">429,908</td>
                            <td className="px-3 py-2 font-semibold">1.33× higher</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Evaluations to reach target (192,000)</td>
                            <td className="px-3 py-2 font-mono">20</td>
                            <td className="px-3 py-2 font-semibold">3</td>
                            <td className="px-3 py-2 font-semibold">6.67× fewer</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Performance at target / evaluations used</td>
                            <td className="px-3 py-2 font-mono">9,600</td>
                            <td className="px-3 py-2 font-semibold">68,373</td>
                            <td className="px-3 py-2 font-semibold">7.12× better</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p>
                      circuitEvolve reaches the 192,000 IFOMS threshold in three evaluations. AmpAgent requires twenty. At the moment the threshold is crossed, circuitEvolve achieves a target-efficiency score of 68,373 against 9,600 for AmpAgent, a 7.12× difference. This indicates that circuitEvolve not only finds better circuits but converges to acceptable performance with substantially less search effort.
                    </p>
                  </div>

                  {/* Cumulative summary */}
                  <div className="space-y-3 border-t border-foreground/10 pt-5">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">Summary</h3>
                    <p>
                      Across all three comparisons the results are consistent. circuitEvolve achieves higher peak performance, reaches target thresholds in fewer evaluations, and produces stronger search-efficiency scores relative to each baseline. The gains are largest in sample efficiency, where circuitEvolve requires between 3.57× and 7.96× fewer evaluations to reach a given performance level. This pattern holds across reinforcement learning based sizing (BAGNet), general purpose analog sizing (EEsizer), and LLM guided circuit search (AmpAgent), suggesting the improvement is not task-specific but reflects a general advantage of simulation-grounded topology exploration over parameter-only optimization strategies.
                    </p>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom center: Email & Request Demo */}
      <div className="pb-4 pt-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-lg font-light tracking-wide text-foreground/80 sm:text-xl md:text-2xl">
            hello@circuitevolve.com
          </span>
          <Link
            to="/request-demo"
            className="text-base font-medium text-foreground/70 underline hover:text-foreground transition-colors"
          >
            Request Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

