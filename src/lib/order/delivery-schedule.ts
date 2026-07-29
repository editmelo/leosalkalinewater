import { normalizeZip } from "@/lib/service-area";

// Leo's weekly delivery routes — Indianapolis split into four quadrants, one per day,
// starting Tuesday. Source of truth for "when do I get my water?" across the site.
export type DeliveryDay = {
  day: string; // "Tuesday"
  region: string; // "Southwest"
  emoji: string; // colored dot matching the route map
  accent: string; // hex for borders/dots
  zips: readonly string[];
};

export const DELIVERY_SCHEDULE: readonly DeliveryDay[] = [
  {
    day: "Tuesday",
    region: "Southwest",
    emoji: "🟢",
    accent: "#2F7D45",
    zips: ["46221", "46241", "46231", "46214", "46224", "46234", "46113", "46183"],
  },
  {
    day: "Wednesday",
    region: "Northwest",
    emoji: "🔵",
    accent: "#0F4C81",
    zips: ["46254", "46268", "46278", "46228", "46260", "46208", "46222"],
  },
  {
    day: "Thursday",
    region: "Northeast",
    emoji: "🟣",
    accent: "#6D4AA0",
    zips: ["46240", "46250", "46256", "46220", "46205", "46218", "46216", "46226", "46235", "46229", "46236", "46055"],
  },
  {
    day: "Friday",
    region: "Southeast & South",
    emoji: "🟠",
    accent: "#E08A2B",
    zips: ["46201", "46203", "46219", "46239", "46237", "46227", "46217", "46225", "46107", "46163"],
  },
];

const ZIP_TO_DAY: ReadonlyMap<string, DeliveryDay> = new Map(
  DELIVERY_SCHEDULE.flatMap((d) => d.zips.map((z) => [z, d] as const)),
);

// Returns the delivery day for a ZIP, or null if it's serviced but not on a fixed route
// (e.g. downtown / outer suburbs — Leo confirms those manually).
export function getDeliveryDay(rawZip: string): DeliveryDay | null {
  return ZIP_TO_DAY.get(normalizeZip(rawZip)) ?? null;
}
