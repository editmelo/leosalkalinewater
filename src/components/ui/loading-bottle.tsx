// Loading Jug — an animated 5-gallon water-cooler jug loader (the jug Leo delivers):
// wide squat body, ridge bands, short cap, and a FLAT base (it sits upright, no point).
// Water rises with a rippling surface and bubbles drift up. Pure SVG + CSS keyframes
// (globals.css: law-jug-*). Goes still under prefers-reduced-motion.

// Wide cooler-jug silhouette: short neck, shoulders flaring to a broad body,
// gently tapering to a flat base.
const JUG =
  "M58,20 L82,20 L82,28 C82,34 124,36 124,50 L124,140 L104,164 L36,164 L16,140 L16,50 C16,36 58,34 58,28 Z";
const WAVE_FRONT =
  "M-60,80 q15,-7 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V190 H-60 Z";
const WAVE_BACK =
  "M-60,82 q15,-4 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V190 H-60 Z";

export default function LoadingBottle({
  label = "Loading your water…",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center gap-4 ${className}`}>
      <svg viewBox="0 0 140 180" className="h-40 w-auto" aria-hidden="true">
        <defs>
          <linearGradient id="lawWaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4AB7D8" />
            <stop offset="1" stopColor="#0F4C81" />
          </linearGradient>
          <clipPath id="lawJugClip">
            <path d={JUG} />
          </clipPath>
        </defs>

        {/* cap + neck */}
        <rect x="56" y="4" width="28" height="15" rx="3" fill="#0F4C81" />
        <rect x="56" y="4" width="28" height="5" rx="2" fill="#1d6aa8" />
        <rect x="59" y="17" width="22" height="6" fill="#0F4C81" />

        {/* contents (clipped to the jug) */}
        <g clipPath="url(#lawJugClip)">
          {/* light-blue empty jug body */}
          <rect x="0" y="0" width="140" height="180" fill="#d6edf7" />
          {/* rising water */}
          <g className="law-jug-fill">
            <rect x="0" y="80" width="140" height="130" fill="url(#lawWaterGrad)" />
            <path className="law-jug-wave slow" d={WAVE_BACK} fill="#4AB7D8" opacity="0.55" />
            <path className="law-jug-wave" d={WAVE_FRONT} fill="url(#lawWaterGrad)" opacity="0.95" />
          </g>
          {/* rising bubbles */}
          <g fill="#ffffff">
            <circle className="law-jug-bubble" style={{ animationDelay: "0s" }} cx="48" cy="152" r="3" opacity="0.7" />
            <circle className="law-jug-bubble" style={{ animationDelay: "0.8s" }} cx="70" cy="158" r="2.2" opacity="0.6" />
            <circle className="law-jug-bubble" style={{ animationDelay: "1.5s" }} cx="92" cy="150" r="3.4" opacity="0.65" />
            <circle className="law-jug-bubble" style={{ animationDelay: "2.1s" }} cx="60" cy="160" r="2" opacity="0.6" />
          </g>
          {/* ridge bands (cooler-jug rings) */}
          <g fill="#ffffff" opacity="0.28">
            <rect x="0" y="52" width="140" height="12" />
            <rect x="0" y="98" width="140" height="10" />
            <rect x="0" y="128" width="140" height="10" />
          </g>
        </g>

        {/* brand label */}
        <rect x="51" y="86" width="38" height="20" rx="3" fill="#ffffff" opacity="0.92" />
        <text
          x="70"
          y="100"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#0c2e4f"
          fontFamily="var(--font-heading), sans-serif"
        >
          {"LEO'S"}
        </text>

        {/* outline */}
        <path d={JUG} fill="none" stroke="#0F4C81" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <p className="font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide text-brand-blue">
        {label}
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
