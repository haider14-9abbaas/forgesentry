import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SplashScreen
 * - Shows full-screen loader on first visit
 * - Fades out after `minDuration` or whenever you call onFinish()
 *
 * Props:
 *  imageSrc      - path to your splash image (/src/assets/loader.png)
 *  message       - welcome text
 *  minDuration   - ms to keep the splash at minimum (default 1800)
 *  onFinish      - callback when splash should disappear
 */
export default function SplashScreen({
  imageSrc = "/src/assets/loader.png",
  message = "Welcome to ForgeSentry",
  minDuration = 1800,
  onFinish,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Prevent scroll while splash is shown
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ensure we show for at least `minDuration`
    const timer = setTimeout(() => setReady(true), minDuration);

    // Also wait for the image to load (so it doesn't pop in late)
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setReady((r) => r && true);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
    };
  }, [imageSrc, minDuration]);

  // When both timers & image are ready, trigger fade-out
  useEffect(() => {
    if (ready && onFinish) {
      const t = setTimeout(onFinish, 300); // wait for exit animation
      return () => clearTimeout(t);
    }
  }, [ready, onFinish]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{
            background:
              "radial-gradient(1200px 600px at 50% 10%, rgba(34,211,238,0.18), transparent 40%), var(--cn-bg)",
          }}
          aria-label="Loading ForgeSentry"
          role="status"
        >
          <div className="text-center px-6">
            {/* Image / Logo */}
            <div className="w-28 h-28 mx-auto rounded-2xl bg-slate-900/40 ring-1 ring-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
              <img
                src={imageSrc}
                alt="ForgeSentry"
                className="w-20 h-20 object-contain"
                draggable="false"
              />
            </div>

            {/* Message */}
            <h1 className="mt-6 text-2xl sm:text-3xl font-display font-bold">
              <span className="gradient-text animate-hue">Forge</span>
              <span className="gradient-text animate-hue">Sentry</span>
            </h1>

            <p
              className="mt-2 text-[var(--cn-sub)] typing"
              aria-live="polite"
            >
              {message}
            </p>

            {/* Progress bar */}
            <div className="mt-6 mx-auto h-1 w-56 bg-white/10 rounded overflow-hidden">
              <div className="h-full w-1/3 splash-bar" />
            </div>

            {/* Skip link for accessibility */}
            <button
              className="mt-6 text-xs text-[var(--cn-cyan)] underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[var(--cn-cyan)] rounded"
              onClick={onFinish}
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
