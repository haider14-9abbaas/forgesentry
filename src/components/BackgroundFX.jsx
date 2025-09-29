import { useEffect, useRef, useMemo } from "react";

const canUseVideo = () => {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData     = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  // Allow on all widths; only block for motion/data preferences
  return !reduceMotion && !saveData;
};

export default function BackgroundFX({ sources }) {
  const canvasRef = useRef(null);

  const srcSet = useMemo(() => {
    if (sources && sources.length) return sources;
    return [
      { src: "/bg.webm", type: "video/webm" },   // Android/Chrome
      { src: "/bg.mp4",  type: "video/mp4"  },   // iOS/Safari (no WebM)
    ];
  }, [sources]);

  // particles (unchanged, trimmed)
  useEffect(() => {
    const reduced =
      (typeof window !== "undefined" &&
        (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
         window.matchMedia("(prefers-reduced-data: reduce)").matches));

    if (reduced) return;

    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf, W, H, DPR;

    const points = [];
    const init = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = c.clientWidth * DPR;
      H = c.clientHeight * DPR;
      c.width = W; c.height = H;
      points.length = 0;
      const density = Math.floor((W * H) / (140000 * DPR));
      for (let i = 0; i < density; i++) {
        points.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2 * DPR,
          vy: (Math.random() - 0.5) * 0.2 * DPR,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000 * DPR) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(79,70,229,0.08)";
            ctx.lineWidth = 1 * DPR;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.5;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3 * DPR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,197,94,0.18)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    init();
    tick();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const showVideo = canUseVideo();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 1) Background video – now allowed on mobile */}
      {showVideo && (
        <video
          className="bgfx-video absolute inset-0 w-full h-full object-cover"
          // iOS autoplay requirements:
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          poster="/bg-poster.jpg"
          // try to start playback programmatically (some browsers need a nudge)
          ref={(el) => {
            if (el) {
              const play = () => el.play().catch(() => {});
              // on mount and when tab becomes active
              requestAnimationFrame(play);
              document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") play();
              }, { once: true });
            }
          }}
        >
          {srcSet.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}

      {/* 2) Subtle hex overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="hex" width="40" height="34.64" patternUnits="userSpaceOnUse" patternTransform="translate(20,0)">
            <polygon
              points="20,0 40,10 40,24.64 20,34.64 0,24.64 0,10"
              fill="none"
              stroke="rgba(79,70,229,0.15)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* 3) Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
