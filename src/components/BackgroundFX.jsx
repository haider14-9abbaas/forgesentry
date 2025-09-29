import { useEffect, useMemo, useRef, useState } from "react";

const canUseVideo = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(prefers-reduced-data: reduce)").matches &&
  window.innerWidth >= 400; // allow video on phones ≥ 400px wide

export default function BackgroundFX({ sources }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const allowVideo = typeof window !== "undefined" && canUseVideo();
  const showVideo = allowVideo && !failed;

  // Responsive sources: browser picks the first matching <source>
  const srcSet = useMemo(() => {
    if (sources && sources.length) return sources;
    return [
      // WebM (preferred for Chrome/Edge/Firefox)
      { src: "/bg-1080.webm", type: "video/webm", media: "(min-width:1280px)" },
      { src: "/bg-720.webm",  type: "video/webm", media: "(min-width:640px)" },
      { src: "/bg-480.webm",  type: "video/webm" },
      // MP4 (fallback for Safari)
      { src: "/bg-1080.mp4",  type: "video/mp4",  media: "(min-width:1280px)" },
      { src: "/bg-720.mp4",   type: "video/mp4",  media: "(min-width:640px)" },
      { src: "/bg-480.mp4",   type: "video/mp4" },
    ];
  }, [sources]);

  // (Particles — keep your existing lighter version)
  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 1024;

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
      c.width = W;
      c.height = H;
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Safety: if the video takes unusually long, keep poster visible (no flash)
  useEffect(() => {
    const timer = setTimeout(() => {
      // If not ready after ~4.5s, just keep poster; don't flip to video to avoid pop-in
      if (!ready) setFailed((f) => f || false); // no-op but keeps clear intent
    }, 4500);
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 1) Poster — shows immediately, fades when video is ready */}
      <img
        src="/bg-poster.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 2) Video — only render if allowed, and we didn't fail */}
      {showVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          poster="/bg-poster.jpg"
          // ready when browser can play through without stalling
          onCanPlayThrough={() => setReady(true)}
          onLoadedData={(e) => {
            // Safari sometimes never fires canplaythrough; this is a softer gate
            if (!ready) setReady(true);
          }}
          onError={() => {
            setFailed(true);
            setReady(false); // keep poster visible
          }}
        >
          {srcSet.map((s) => (
            <source key={s.src} src={s.src} type={s.type} {...(s.media ? { media: s.media } : {})} />
          ))}
        </video>
      )}

      {/* 3) Very subtle hex overlay */}
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

      {/* 4) Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
