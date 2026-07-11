"use client";
import { useState } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/media/waterfam.jpg", alt: "Leo carrying a 5-gallon jug of Leo's Alkaline Water" },
  { src: "/products/jug-biweekly.jpg", alt: "A 5-gallon Leo's Alkaline Water jug on a doorstep" },
  { src: "/media/delivery.jpg", alt: "A fresh jug delivered and left at a customer's door" },
  { src: "/products/starter-pack.jpg", alt: "Leo with a jug beside the Leo's Alkaline Water delivery van" },
  { src: "/products/jug-payg.jpg", alt: "A 5-gallon jug ready for delivery beside the van" },
  { src: "/products/jug-weekly.jpg", alt: "A 5-gallon Leo's Alkaline Water jug ready for pickup" },
];

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const current = IMAGES[active];

  return (
    <div className="md:sticky md:top-28">
      <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 45vw"
          priority
        />
      </div>

      <div className="mt-3 grid grid-cols-6 gap-2">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1} of ${IMAGES.length}`}
            aria-current={i === active}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/60 ${
              i === active
                ? "border-brand-blue"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
