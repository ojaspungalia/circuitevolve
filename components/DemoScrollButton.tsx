"use client";

type DemoScrollButtonProps = {
  className?: string;
};

export default function DemoScrollButton({ className }: DemoScrollButtonProps) {
  const handleClick = () => {
    const demoSection = document.getElementById("demo");

    demoSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      Request Demo
    </button>
  );
}
