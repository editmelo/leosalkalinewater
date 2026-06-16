// Single source of truth for brand values referenced in TS (e.g. inline SVG fills).
export const BRAND = {
  blue: "#0F4C81",
  aqua: "#4AB7D8",
  green: "#2F5D3A",
  navy: "#0c2e4f",
  gold: "#C69A2D",
  bg: "#F7F5F1",
  text: "#2B2B2B",
} as const;

export const CONTACT = {
  email: "leo@leosalkalinewater.com",
  phone: "317-985-0966",
  phoneHref: "tel:+13179850966",
  social: {
    instagram: "https://www.instagram.com/leosalkalinewater/",
    facebook: "https://www.facebook.com/share/1CeqmakfxE/",
    linktree: "https://linktr.ee/leosalkalinewater",
  },
} as const;
