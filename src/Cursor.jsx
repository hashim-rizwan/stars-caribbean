import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export default function Cursor() {
  const [on, setOn] = useState(false);
  const [state, setState] = useState("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const allow = () => fine.matches && !reduce.matches;
    const sync = () => {
      const next = allow();
      setOn(next);
      document.documentElement.classList.toggle("has-cursor", next);
    };
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    const move = (event) => {
      if (!allow()) return;
      x.set(event.clientX);
      y.set(event.clientY);
      const next = event.target.closest("[data-cursor]")?.dataset.cursor || "default";
      setState((current) => (current === next ? current : next));
    };

    window.addEventListener("pointermove", move);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!on) return null;

  return (
    <motion.div
      className="cursor"
      data-state={state}
      style={{ x, y }}
      aria-hidden="true"
    />
  );
}
