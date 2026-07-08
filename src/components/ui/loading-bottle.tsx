// Loading Jug — an animated 5-gallon water-cooler jug loader (the jug Leo delivers):
// wide body, ridge bands, tapered bottom, short cap. Water rises with a rippling
// surface and bubbles drift up. Pure SVG + CSS keyframes (globals.css: law-jug-*).
// Goes still under prefers-reduced-motion via the global animation reset.

// Wide cooler-jug silhouette with rounded shoulders and a tapered bottom point.
const JUG =
  "M48,28 L72,28 L72,32 C72,37 100,38 100,54 L100,184 L60,208 L20,184 L20,54 C20,38 48,37 48,32 Z";
const WAVE_FRONT =
  "M-60,86 q15,-7 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V220 H-60 Z";
const WAVE_BACK =
  "M-60,88 q15,-4 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V220 H-60 Z";

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
        <rect x="46" y="8" width="28" height="16" rx="3" fill="#0F4C81" />
        <rect x="46" y="8" width="28" height="5" rx="2" fill="#1d6aa8" />
        <rect x="49" y="22" width="22" height="7" fill="#0F4C81" />

        {/* contents (clipped to the jug) */}
        <g clipPath="url(#lawJugClip)">
          {/* light-blue empty jug body */}
          <rect x="0" y="0" width="120" height="220" fill="#d6edf7" />
          {/* rising water */}
          <g className="law-jug-fill">
            <rect x="0" y="86" width="120" height="160" fill="url(#lawWaterGrad)" />
            <path className="law-jug-wave slow" d={WAVE_BACK} fill="#4AB7D8" opacity="0.55" />
            <path className="law-jug-wave" d={WAVE_FRONT} fill="url(#lawWaterGrad)" opacity="0.95" />
          </g>
          {/* rising bubbles */}
          <g fill="#ffffff">
            <circle className="law-jug-bubble" style={{ animationDelay: "0s" }} cx="44" cy="196" r="3" opacity="0.7" />
            <circle className="law-jug-bubble" style={{ animationDelay: "0.8s" }} cx="62" cy="200" r="2.2" opacity="0.6" />
            <circle className="law-jug-bubble" style={{ animationDelay: "1.5s" }} cx="74" cy="194" r="3.4" opacity="0.65" />
            <circle className="law-jug-bubble" style={{ animationDelay: "2.1s" }} cx="54" cy="202" r="2" opacity="0.6" />
          </g>
          {/* ridge bands (cooler-jug rings) */}
          <g fill="#ffffff" opacity="0.28">
            <rect x="0" y="56" width="120" height="12" />
            <rect x="0" y="120" width="120" height="11" />
            <rect x="0" y="164" width="120" height="11" />
          </g>
        </g>

        {/* brand label */}
        <rect x="41" y="94" width="38" height="20" rx="3" fill="#ffffff" opacity="0.92" />
        <text
          x="60"
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
