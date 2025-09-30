import { useEffect, useRef } from "react";

/**
 * Alive background with:
 * - full-bleed image (slow pan)
 * - cursor spotlight (fast follow)
 * - twinkling sparkles (canvas; lively)
 * - drifting hex grid
 * - aurora blobs
 * - parallax tilt on an overscanned inner scene (no edge seams)
 */
export default function BackgroundFX({
  src = "/hero-bg.svg",
  alt = "",
  showHex = true,
  showAurora = true,
  showSparkles = true,
  parallax = true,
}) {
  const canvasRef = useRef(null);
  const outerRef = useRef(null);     // stays fixed (no transform)
  const innerRef = useRef(null);     // moves slightly (overscanned)
  const mouseRef = useRef({ x: 0.5, y: 0.4 }); // spotlight & particles

  /* ---------------- Cursor spotlight position (fast follow) ---------------- */
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let raf = 0;
    let tx = 0.5, ty = 0.4;
    let cx = tx, cy = ty;

    const move = (e) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      tx = nx; ty = ny;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
      if (!raf) tick();
    };

    const tick = () => {
      // faster ease so it feels snappy
      cx += (tx - cx) * 0.28;
      cy += (ty - cy) * 0.28;
      el.style.setProperty("--mx", `${(cx * 100).toFixed(3)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(3)}%`);
      raf =
        Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008
          ? requestAnimationFrame(tick)
          : 0;
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------------- Parallax tilt (desktop only) on INNER scene ---------------- */
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ||
      window.innerWidth < 1024 ||
      !parallax;

    if (reduce) return;

    const el = innerRef.current;
    if (!el) return;

    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      // subtle amplitudes (px) — inner scene is overscanned, so no seams
      tx = nx * 10;
      ty = ny * 8;
      if (!raf) anim();
    };

    const anim = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx.toFixed(3)}px, ${cy.toFixed(3)}px, 0)`;
      raf =
        Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05
          ? requestAnimationFrame(anim)
          : 0;
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax]);

  /* ---------------- Sparkles (livelier + cursor attraction) ---------------- */
  useEffect(() => {
    if (!showSparkles) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const c = canvasRef.current;
    if (!c || reduce) return;

    const ctx = c.getContext("2d", { alpha: true });
    let raf, W, H, DPR;
    let t = 0;

    const colors = [
      [34, 211, 238],  // cyan
      [124, 58, 237],  // purple
      [163, 230, 53],  // lime
    ];

    const stars = [];

    const resetStar = (s) => {
      s.x = Math.random() * W;
      s.y = Math.random() * H;
      // a touch faster than before
      s.vx = (Math.random() - 0.5) * 0.20 * DPR;
      s.vy = (Math.random() - 0.5) * 0.20 * DPR;
      s.size = (Math.random() * 1.3 + 0.7) * DPR;
      s.phase = Math.random() * Math.PI * 2;
      s.col = colors[(Math.random() * colors.length) | 0];
      s.life = 0;
      s.ttl = 5 + Math.random() * 5;
    };

    const init = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = c.clientWidth * DPR;
      H = c.clientHeight * DPR;
      c.width = W; c.height = H;
      stars.length = 0;

      // a few more than before
      const count = Math.min(200, Math.max(80, Math.floor((W * H) / 160000)));
      for (let i = 0; i < count; i++) {
        const s = {};
        resetStar(s);
        stars.push(s);
      }
    };

    const drawStar = (s, alpha) => {
      const [r, g, b] = s.col;
      ctx.save();
      ctx.shadowBlur = 7 * DPR;
      ctx.shadowColor = `rgba(${r},${g},${b},${alpha})`;
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const step = (now) => {
      t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      // mouse attraction (tiny, to feel alive)
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      for (const s of stars) {
        // mild attraction towards mouse
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < (260 * DPR) ** 2) {
          // push away if very close, pull slightly if medium distance
          const f = dist2 < (120 * DPR) ** 2 ? -0.0009 : 0.00045;
          s.vx += dx * f;
          s.vy += dy * f;
        }

        // clamp velocity a bit
        s.vx = Math.max(-0.32 * DPR, Math.min(0.32 * DPR, s.vx));
        s.vy = Math.max(-0.32 * DPR, Math.min(0.32 * DPR, s.vy));

        // move & bounce
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > W) s.vx *= -1;
        if (s.y < 0 || s.y > H) s.vy *= -1;

        // twinkle: brighter range, slight color pulse
        const tw = 0.65 + 0.35 * Math.sin(s.phase + t * (0.85 + s.size * 0.06));
        const alpha = 0.22 + tw * 0.55;

        drawStar(s, alpha);

        s.life += 1 / 60;
        if (s.life > s.ttl) resetStar(s);
      }

      raf = requestAnimationFrame(step);
    };

    init();
    raf = requestAnimationFrame(step);
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [showSparkles]);

  return (
    // OUTER stays fixed → no seams
    <div
      ref={outerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0B0F19" }}
      aria-hidden
    >
      {/* INNER is overscanned and moves slightly for parallax */}
      <div
        ref={innerRef}
        className="bg-scene will-change-transform"
      >
        {/* base image with slow pan */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover will-change-transform bg-pan"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          style={{ transform: "translateZ(0)" }}
        />

        {/* top contrast gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,.26) 40%, rgba(0,0,0,.36) 100%)",
          }}
        />

        {/* cursor spotlight (follows --mx/--my on outer) */}
        <div className="cursor-spotlight pointer-events-none" />

        {/* subtle scanlines */}
        <div className="scanlines pointer-events-none" />

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

        {/* sparkles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </div>
  );
}
