// Animated wave that melts one section's color into the next.
// `fill` = the color of the section BELOW this divider.
export function WaveDivider({ fill, flip = false, animate = true }: { fill: string; flip?: boolean; animate?: boolean }) {
  // ONE continuous path spanning two identical periods (0→2880). Because it's a single
  // shape there's no internal abutting edge (kills the antialiasing seam line), and the
  // two periods are identical, so scrolling the group -50% (= -1440 = one period) loops
  // perfectly — no visible reset, it just flows.
  const path =
    "M0,60 C240,10 480,10 720,60 C960,110 1200,110 1440,60 C1680,10 1920,10 2160,60 C2400,110 2640,110 2880,60 L2880,140 L0,140 Z";
  return (
    <div aria-hidden className="relative -mt-px -mb-px leading-[0]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="block h-[70px] w-full sm:h-[110px]">
        <g className={animate ? "[animation:law-wave-loop_22s_linear_infinite] motion-reduce:[animation:none]" : ""}>
          <path d={path} fill={fill} />
        </g>
      </svg>
    </div>
  );
}
