export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-6 shadow-[0_6px_24px_rgba(15,76,129,0.08)] ${className}`}>{children}</div>;
}
