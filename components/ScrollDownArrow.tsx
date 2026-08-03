"use client";

type ScrollDownArrowProps = {
  targetId: string;
  className?: string;
};

export default function ScrollDownArrow({ targetId, className }: ScrollDownArrowProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      className={`scroll-down-arrow${className ? ` ${className}` : ""}`}
      aria-label="Scroll to video"
      onClick={handleClick}
    >
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
