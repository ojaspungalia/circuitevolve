"use client";

import { useEffect, useRef } from "react";

export default function AvinashVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const video = videoRef.current;
    if (!shell || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="vw-shell av-shell" ref={shellRef} data-reveal>
      <div className="vw-main av-main">
        <video
          ref={videoRef}
          src="/assets/avinash1.mp4"
          muted
          loop
          playsInline
          preload="none"
          className="vw-video"
        />
      </div>
    </div>
  );
}
