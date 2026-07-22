"use client";
import { useEffect, useRef } from "react";
import { isGoogleMapsConfigured, loadGoogleMaps } from "@/lib/google-maps";

export interface PickedAddress {
  address1: string;
  city: string;
  state: string;
  zip: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// A Google Places search box that fills the manual address fields below it when a
// place is chosen. Renders nothing (and costs nothing) when no API key is set — the
// customer just uses the normal fields.
export function AddressAutocomplete({ onPick }: { onPick: (a: PickedAddress) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Keep the latest callback without re-initializing the widget.
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    if (!isGoogleMapsConfigured()) return;
    let element: any;
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !hostRef.current) return;
        const places = (window as any).google?.maps?.places;
        if (!places?.PlaceAutocompleteElement) return;

        element = new places.PlaceAutocompleteElement({
          componentRestrictions: { country: "us" },
          types: ["address"],
        });
        element.style.width = "100%";
        hostRef.current.appendChild(element);

        element.addEventListener("gmp-select", async (event: any) => {
          try {
            const place = event.placePrediction.toPlace();
            await place.fetchFields({ fields: ["addressComponents"] });
            const comps: any[] = place.addressComponents ?? [];
            const get = (type: string, short = false) => {
              const c = comps.find((x) => x.types?.includes(type));
              return c ? (short ? c.shortText : c.longText) ?? "" : "";
            };
            onPickRef.current({
              address1: [get("street_number"), get("route")].filter(Boolean).join(" "),
              city: get("locality") || get("sublocality_level_1") || get("postal_town"),
              state: get("administrative_area_level_1", true),
              zip: get("postal_code"),
            });
          } catch {
            /* selection parse failed — customer can still fill fields manually */
          }
        });
      })
      .catch(() => {
        /* couldn't load Google Maps — silently fall back to manual entry */
      });

    return () => {
      cancelled = true;
      if (element && hostRef.current?.contains(element)) hostRef.current.removeChild(element);
    };
  }, []);

  if (!isGoogleMapsConfigured()) return null;

  return (
    <div className="mb-2">
      <div ref={hostRef} className="law-address-autocomplete" />
      <p className="mt-1 text-xs text-brand-text/50">🔎 Start typing your address — we&apos;ll fill in the rest.</p>
    </div>
  );
}
