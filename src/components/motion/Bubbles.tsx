// Decorative rising bubbles. Deterministic positions (no Math.random in render).
const BUBBLES = [
  { left: "8%", size: 10, delay: 0, dur: 7 },
  { left: "22%", size: 6, delay: 1.5, dur: 9 },
  { left: "40%", size: 14, delay: 0.8, dur: 8 },
  { left: "58%", size: 8, delay: 2.2, dur: 10 },
  { left: "74%", size: 5, delay: 1.1, dur: 7.5 },
  { left: "88%", size: 11, delay: 0.4, dur: 9.5 },
];

export function Bubbles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-white/25 [animation:law-rise_var(--d)_ease-in_infinite] motion-reduce:hidden"
          style={{ left: b.left, width: b.size, height: b.size, ["--d" as string]: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}
