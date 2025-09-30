import { useEffect, useRef } from "react";

/**
 * Alive background:
 * - <picture> with SVG (desktop) + JPG fallback (mobile / Save-Data)
 * - spotlight that follows cursor/touch (fast, no lag)
 * - drifting hex grid
 * - light sweep + scanlines
 * - aurora blobs
 * - tiny particles (desktop only)
 */
export default function BackgroundFX({
  srcSvg = "/hero-bg.svg",
  srcMobile = "/hero-bg-mobile.jpg", // <= add this file in /public
  alt = "",
  showHex = true,
  showAurora = true,
  showParticles = true,
  parallax = true,
}) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  /* ---------- Spotlight (mouse + touch) ---------- */
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    let raf = 0, mx = 0.5, my = 0.4;

    const setSpot = (x, y) => {
      mx = x; my = y;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${mx * 100}%`);
          el.style.setProperty("--my", `${my * 100}%`);
          raf = 0;
        });
      }
    };

    const onMouse = (e) => setSpot(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    const onTouch = (e) => {
      const t = e.touches?.[0];
      if (t) setSpot(t.clientX / window.innerWidth, t.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- Tiny particles (desktop only) ---------- */
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
      W = c.clientWidth * DPR;
      H = c.clientHeight * DPR;
      c.width = W; c.height = H;
      pts.length = 0;
      const density = Math.max(18, Math.floor((W * H) / (220000 * DPR)));
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

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      ctx.globalAlpha = 0.38;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9800 * DPR) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(79,70,229,0.10)"; // indigo
            ctx.lineWidth = 1 * DPR;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.6;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 * DPR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(163,230,53,0.22)"; // lime-ish
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    init();
    step();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [showParticles]);

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 overflow-hidden bg-scene"
      style={{ background: "#0B0F19", willChange: "transform" }}
      aria-hidden
    >
      {/* base image with mobile fallback */}
      <picture>
        {/* If the browser supports SVG (most do), use it */}
        <source srcSet={srcSvg} type="image/svg+xml" />
        {/* Fallback for mobile / save-data / odd SVG bugs */}
        <img
          src={srcMobile}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover will-change-transform bg-pan"
          loading="eager"
          draggable={false}
        />
      </picture>

      {/* contrast gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,.26) 40%, rgba(0,0,0,.36) 100%)",
        }}
      />

      {/* spotlight following cursor/touch */}
      <div className="cursor-spotlight" />

      {/* light sweep + scanlines */}
      <div className="light-sweep" />
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

      {/* particles (desktop only) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
