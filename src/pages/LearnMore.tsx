const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-16 md:py-16 text-foreground">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          The Next Era of Analog Design
        </h1>

        <div className="space-y-4 text-lg leading-relaxed sm:text-xl">
          <p>
            For decades semiconductor innovation followed a simple pattern. Digital design became
            software. Hardware description languages, synthesis engines, and automated place and
            route transformed chip development into a scalable engineering discipline. A designer
            could describe behavior and trust the tools to construct the silicon.
          </p>
          <p>Analog design never made that transition.</p>
          <p>
            Analog circuits operate directly in the physical domain of voltages, currents, and
            device physics. Every transistor dimension, bias point, and compensation network shapes
            the behavior of the system. The design space is continuous, nonlinear, and deeply
            coupled. Instead of synthesis flows, analog engineers still rely on experience, manual
            iteration, and thousands of simulations to converge on a working design.
          </p>
          <p>
            This gap has become one of the defining constraints of modern semiconductor development.
          </p>
          <p>
            Nearly every system that powers the physical world depends on analog silicon. Cars rely
            on power management, sensing, and control circuits. Aircraft and industrial systems
            require precision signal conditioning. Telecommunications infrastructure, renewable
            energy systems, and wireless devices all depend on specialized analog interfaces that
            connect computation to reality. As these systems become more complex, the number of
            custom analog blocks required in each chip continues to grow.
          </p>
          <p>Yet the way these circuits are designed has barely changed.</p>
          <p>
            Analog design has not scaled with the rest of semiconductor automation. The process
            remains labor intensive and expertise driven. Training a strong analog designer takes
            many years, and the global supply of engineers with this expertise cannot keep pace with
            demand. Across the industry, analog blocks increasingly define the critical path of chip
            development.
          </p>
          <p>A new class of design systems is emerging.</p>
          <p>
            Instead of treating circuits as static artifacts tuned through manual iteration, these
            systems treat them as structures that can be explored, reasoned about, and improved
            through automated search. They combine advances in computational intelligence, large
            scale simulation, and programmatic representations of circuits to explore design spaces
            that humans rarely have the time to investigate.
          </p>
          <p>This shift changes what is possible in analog design.</p>
          <p>
            Architectures that once required months of exploration can be evaluated in days. Circuit
            structures can be reexamined rather than simply tuned. Engineers can move from transistor
            level trial and error toward higher level reasoning about performance, constraints, and
            system behavior.
          </p>
          <p>This is why circuitEvolve exists.</p>
          <p>
            We believe the next era of semiconductor innovation will require a fundamentally
            different approach to analog design. One that expands the space of circuits engineers can
            explore and accelerates the path from specification to silicon. One that allows designers
            to focus on insight and architecture while computation handles the search.
          </p>
          <p>
            Analog design has always been where silicon meets the real world. The tools used to
            create it are about to change.
          </p>
        </div>

        <div className="mt-10 border-t border-foreground/10 pt-6 text-sm sm:text-base">
          <h2 className="text-base font-semibold tracking-wide sm:text-lg">
            Contact Us
          </h2>
          <div className="mt-2 space-y-1">
            <p>hello@circuitevolve.com</p>
            <p>ojas@circuitevolve.com</p>
            <p>arnav@circuitevolve.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;

