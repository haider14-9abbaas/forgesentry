import { useEffect, useState } from "react";
export function useParallax(multiplier = 0.08) {
  const [offset, set] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * multiplier * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * multiplier * 100;
      set({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [multiplier]);
  return offset;
}

