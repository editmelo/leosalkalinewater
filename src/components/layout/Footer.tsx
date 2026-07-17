import Link from "next/link";
import { CONTACT } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-sm text-[#cfe3f0]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-[family-name:var(--font-heading)] text-lg font-extrabold text-white">LEO&apos;S ALKALINE WATER</div>
          <p className="mt-2 max-w-xs opacity-80">Premium alkaline water, delivered fresh across Indianapolis. Powered with Kangen Water™.</p>
          <p className="tagline mt-3 text-[#cdeefb]">We steward the Water. You steward your well-being.</p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/store" className="hover:text-white">Store</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Connect</h4>
          <ul className="space-y-2">
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
            <li><a href={CONTACT.phoneHref} className="hover:text-white">{CONTACT.phone}</a></li>
            <li><a href={CONTACT.social.instagram} className="hover:text-white">Instagram</a></li>
            <li><a href={CONTACT.social.facebook} className="hover:text-white">Facebook</a></li>
            <li><a href={CONTACT.social.linktree} className="hover:text-white">Linktree</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Leo&apos;s Alkaline Water · Minority Business Enterprise (City of Indianapolis) · WQA Gold Standard
      </div>
    </footer>
  );
}
