"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Menu } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/store", label: "Store 1" },
  { href: "/store-simple", label: "Store 2" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Leo's Alkaline Water" width={240} height={70} priority className="h-14 w-auto sm:h-16" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="font-[family-name:var(--font-heading)] text-sm font-semibold text-brand-blue/90 hover:text-brand-blue">{n.label}</Link>
          ))}
          <Button href="/store" variant="aqua">Order</Button>
          <Link href="/cart" className="relative" aria-label="Cart">
            <ShoppingCart className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            {count > 0 && <span className="absolute -right-2 -top-1 rounded-full bg-brand-blue px-1.5 text-[10px] font-bold text-white">{count}</span>}
          </Link>
        </nav>
        <button className="lg:hidden" aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(o => !o)}>
          <Menu className="h-6 w-6 text-brand-blue" aria-hidden="true" />
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-black/5 bg-white px-5 py-3 lg:hidden">
          {NAV.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 font-[family-name:var(--font-heading)] font-semibold text-brand-blue">{n.label}</Link>)}
          <Link href="/cart" onClick={() => setOpen(false)} className="py-2 font-[family-name:var(--font-heading)] font-semibold text-brand-blue">Cart ({count})</Link>
        </nav>
      )}
    </header>
  );
}
