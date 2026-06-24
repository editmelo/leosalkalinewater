// Animated wave that melts one section's color into the next.
// `fill` = the color of the section BELOW this divider.
export function WaveDivider({ fill, flip = false, animate = true }: { fill: string; flip?: boolean; animate?: boolean }) {
  // One full, smooth period. Start and end share the same y AND tangent, so the two
  // tiled copies meet seamlessly (no kink) as the group scrolls -50%.
  const path = "M0,60 C240,10 480,10 720,60 C960,110 1200,110 1440,60 L1440,140 L0,140 Z";
  return (
    <div aria-hidden className="relative -mt-px -mb-px leading-[0]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="block h-[70px] w-full sm:h-[110px]">
        <g className={animate ? "[animation:law-wave-x_18s_linear_infinite] motion-reduce:[animation:none]" : ""}>
          <path d={path} fill={fill} />
          <path d={path} fill={fill} transform="translate(1440,0)" />
        </g>
      </svg>
    </div>
  );
}
