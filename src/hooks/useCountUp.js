import { useEffect, useState } from "react";
export function useCountUp(to = 100, ms = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, ms]);
  return n;
}
