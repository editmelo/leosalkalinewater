// Loading Jug — an animated 5-gallon water jug loader (the jug Leo delivers).
// Water rises/sloshes with a rippling surface and bubbles drift up.
// Pure SVG + CSS keyframes (see globals.css: law-jug-*). Goes still under
// prefers-reduced-motion via the global animation reset.

const JUG =
  "M52,22 L52,32 C52,42 22,44 22,72 L22,188 Q22,200 34,200 L86,200 Q98,200 98,188 L98,72 C98,44 68,42 68,32 L68,22 Z";
const WAVE_FRONT =
  "M-60,78 q15,-7 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V220 H-60 Z";
const WAVE_BACK =
  "M-60,80 q15,-4 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V220 H-60 Z";

export default function LoadingBottle({
  label = "Loading your water…",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center gap-4 ${className}`}>
      <svg viewBox="0 0 120 220" className="h-40 w-auto" aria-hidden="true">
        <defs>
          <linearGradient id="lawWaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4AB7D8" />
            <stop offset="1" stopColor="#0F4C81" />
          </linearGradient>
          <clipPath id="lawJugClip">
            <path d={JUG} />
          </clipPath>
        </defs>

        {/* cap + neck collar */}
        <rect x="47" y="8" width="26" height="15" rx="3" fill="#0F4C81" />
        <rect x="47" y="8" width="26" height="5" rx="2" fill="#1d6aa8" />
        <rect x="50" y="20" width="20" height="6" fill="#0F4C81" />

        {/* contents (clipped to the jug) */}
        <g clipPath="url(#lawJugClip)">
          <rect x="0" y="0" width="120" height="220" fill="#eef6fb" />
          <g className="law-jug-fill">
            <rect x="0" y="78" width="120" height="160" fill="url(#lawWaterGrad)" />
            <path className="law-jug-wave slow" d={WAVE_BACK} fill="#4AB7D8" opacity="0.55" />
            <path className="law-jug-wave" d={WAVE_FRONT} fill="url(#lawWaterGrad)" opacity="0.95" />
          </g>
          <g fill="#ffffff">
            <circle className="law-jug-bubble" style={{ animationDelay: "0s" }} cx="44" cy="192" r="3" opacity="0.7" />
            <circle className="law-jug-bubble" style={{ animationDelay: "0.8s" }} cx="62" cy="196" r="2.2" opacity="0.6" />
            <circle className="law-jug-bubble" style={{ animationDelay: "1.5s" }} cx="74" cy="190" r="3.4" opacity="0.65" />
            <circle className="law-jug-bubble" style={{ animationDelay: "2.1s" }} cx="54" cy="198" r="2" opacity="0.6" />
          </g>
        </g>

        {/* brand label */}
        <rect x="42" y="118" width="36" height="22" rx="3" fill="#ffffff" opacity="0.9" />
        <text
          x="60"
          y="133"
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
