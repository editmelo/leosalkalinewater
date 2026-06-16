// Animated wave that melts one section's color into the next.
// `fill` = the color of the section BELOW this divider.
export function WaveDivider({ fill, flip = false, animate = true }: { fill: string; flip?: boolean; animate?: boolean }) {
  const path = "M0,40 C240,90 480,0 720,30 C960,60 1200,15 1440,45 L1440,120 L0,120 Z";
  return (
    <div aria-hidden className="relative -mt-px leading-[0]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-[60px] w-full sm:h-[90px]">
        <g className={animate ? "[animation:law-wave-x_14s_linear_infinite] motion-reduce:[animation:none]" : ""}>
          <path d={path} fill={fill} />
          <path d={path} fill={fill} transform="translate(1440,0)" />
        </g>
      </svg>
    </div>
  );
}
