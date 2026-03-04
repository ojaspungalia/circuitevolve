import logo from "@/assets/logo_new.png";
import { Link } from "react-router-dom";

const Index = () => {
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

        <Link
          to="/learn-more"
          className="rounded-full bg-foreground px-10 py-4 text-base sm:text-lg font-medium tracking-wide text-background transition-transform transition-opacity duration-200 hover:opacity-85 hover:scale-105"
        >
          Learn More
        </Link>
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

