// Loading Jug — an animated 5-gallon water-cooler jug loader (the jug Leo delivers):
// tall narrow neck, sloping shoulders, wide body with ROUNDED bottom corners (no bevels),
// and ridge bands. Water rises with a rippling surface and bubbles drift up.
// Pure SVG + CSS keyframes (globals.css: law-jug-*). Still under prefers-reduced-motion.

// Narrow neck → sloping shoulders → broad body → rounded bottom corners (flat base).
const JUG =
  "M62,14 L62,36 C62,46 16,50 16,74 L16,146 Q16,162 32,162 L108,162 Q124,162 124,146 L124,74 C124,50 78,46 78,36 L78,14 Z";
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

        {/* cap on the neck */}
        <rect x="56" y="3" width="28" height="14" rx="3" fill="#0F4C81" />
        <rect x="56" y="3" width="28" height="5" rx="2" fill="#1d6aa8" />

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
            <circle className="law-jug-bubble" style={{ animationDelay: "0s" }} cx="46" cy="150" r="3" opacity="0.7" />
            <circle className="law-jug-bubble" style={{ animationDelay: "0.8s" }} cx="70" cy="156" r="2.2" opacity="0.6" />
            <circle className="law-jug-bubble" style={{ animationDelay: "1.5s" }} cx="94" cy="148" r="3.4" opacity="0.65" />
            <circle className="law-jug-bubble" style={{ animationDelay: "2.1s" }} cx="58" cy="158" r="2" opacity="0.6" />
          </g>
          {/* ridge bands (cooler-jug rings) */}
          <g fill="#ffffff" opacity="0.3">
            <rect x="0" y="74" width="140" height="14" />
            <rect x="0" y="112" width="140" height="14" />
            <rect x="0" y="142" width="140" height="12" />
          </g>
        </g>

        {/* brand label */}
        <rect x="48" y="94" width="44" height="20" rx="3" fill="#ffffff" opacity="0.92" />
        <text
          x="70"
          y="108"
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
