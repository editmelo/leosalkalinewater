import { SERVICE_AREA_ZIPS } from "./indy-zips";

export function normalizeZip(raw: string): string {
  return (raw ?? "").trim().slice(0, 5);
}

export function isInServiceArea(raw: string): boolean {
  const zip = normalizeZip(raw);
  if (!/^\d{5}$/.test(zip)) return false;
  return SERVICE_AREA_ZIPS.has(zip);
}
