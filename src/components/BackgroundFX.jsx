import { useEffect, useRef } from "react";

/**
 * Alive background (image-based)
 * - full-bleed image with slow pan (CSS .bg-pan)
 * - cursor spotlight (updates --mx/--my)
 * - drifting hex grid
 * - light sweep + scanlines
 * - aurora blobs
 * - tiny particles (desktop only)
 */
export default function BackgroundFX({
  src = "/hero-bg.svg",
  alt = "",
  showHex = true,
  showAurora = true,
  showParticles = true,
}) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  /* ---------- Cursor spotlight: update CSS vars --mx / --my ---------- */
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    let raf = 0;
    let _mx = 0, _my = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      _mx = e.clientX - r.left;
      _my = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      el.style.setProperty("--mx", `${_mx}px`);
      el.style.setProperty("--my", `${_my}px`);
      raf = 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------------- Tiny particles (desktop only) ---------------- */
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ||
      window.innerWidth < 1024 ||
      !showParticles;

    if (reduce) return;

    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf, W, H, DPR;
    const pts = [];

    const init = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      const { width, height } = c.getBoundingClientRect();
      W = Math.floor(width * DPR);
      H = Math.floor(height * DPR);
      c.width = W; c.height = H;
      pts.length = 0;

      // A bit denser & faster so it's clearly visible
      const density = Math.max(22, Math.floor((W * H) / (200_000 * DPR)));
      for (let i = 0; i < density; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22 * DPR,
          vy: (Math.random() - 0.5) * 0.22 * DPR,
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);

      // move
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // connection lines (slightly stronger)
      ctx.globalAlpha = 0.42;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000 * DPR) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(79,70,229,0.14)"; // indigo
            ctx.lineWidth = 1 * DPR;
            ctx.stroke();
          }
        }
      }

      // dots
      ctx.globalAlpha = 0.8;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25 * DPR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,197,94,0.28)"; // lime-ish
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onResize = () => init();

    init();
    step();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [showParticles]);

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 overflow-hidden bg-scene"
      style={{ background: "#0B0F19" }}
      aria-hidden
    >
      {/* base image with slow pan (CSS anim) */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover will-change-transform bg-pan"
        loading="eager"
        decoding="sync"
        fetchpriority="high"
        draggable={false}
      />

      {/* top contrast gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,.26) 40%, rgba(0,0,0,.36) 100%)",
        }}
      />

      {/* cursor spotlight */}
      <div className="cursor-spotlight" />

      {/* animated light sweep */}
      <div className="light-sweep" />

      {/* scanlines */}
      <div className="scanlines" />

      {/* aurora blobs */}
      {showAurora && (
        <>
          <div className="aurora absolute -top-24 -left-28 w-[46rem] h-[46rem]" />
          <div className="aurora aurora-2 absolute top-8 right-[-8rem] w-[36rem] h-[36rem]" />
          <div className="aurora aurora-3 absolute bottom-[-10rem] left-1/3 w-[40rem] h-[40rem]" />
        </>
      )}

      {/* drifting hex grid */}
      {showHex && (
        <div className="absolute inset-0 animate-hex-drift opacity-[0.10] pointer-events-none mix-blend-soft-light">
          <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
            <defs>
              <pattern id="bg-hex" width="40" height="34.64" patternUnits="userSpaceOnUse" patternTransform="translate(20,0)">
                <polygon
                  points="20,0 40,10 40,24.64 20,34.64 0,24.64 0,10"
                  fill="none"
                  stroke="rgba(148,163,184,0.55)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bg-hex)" />
          </svg>
        </div>
      )}

      {/* particles (on top, but non-interactive) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}