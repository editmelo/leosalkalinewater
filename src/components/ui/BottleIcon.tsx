// A simple 5-gallon water-jug/bottle icon (stroke-based, matches the lucide set).
// Inherits color via currentColor.
export function BottleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.5 2h5v2c0 1.2 3 1.6 3 4.5V19a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3V8.5C6.5 5.6 9.5 5.2 9.5 4V2Z" />
      <path d="M6.7 12.5h10.6" />
    </svg>
  );
}
