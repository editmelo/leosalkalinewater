import Link from "next/link";

type Variant = "primary" | "aqua" | "green" | "outline";
const styles: Record<Variant, string> = {
  primary: "bg-brand-blue text-white hover:bg-[#0c3f6c]",
  aqua: "bg-brand-aqua text-brand-blue hover:brightness-95",
  green: "bg-brand-green text-white hover:brightness-110",
  outline: "bg-transparent text-current border border-current/40 hover:border-current",
};

export function Button({
  href, onClick, children, variant = "primary", className = "", type = "button",
}: {
  href?: string; onClick?: () => void; children: React.ReactNode;
  variant?: Variant; className?: string; type?: "button" | "submit";
}) {
  const cls = `inline-flex items-center justify-center rounded-full px-7 py-3 font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide transition ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
