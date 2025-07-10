import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { rarityStyles } from "../constants/rarityStyles";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: string | number,
  currency: string = "ETH"
): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `${numPrice.toFixed(3)} ${currency}`;
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const getRarityStyle = (
  rarity: string,
  type: "base" | "gradient" | "glow"
): string => {
  const rarityLower = rarity.toLowerCase();
  return (
    rarityStyles[rarityLower as keyof typeof rarityStyles]?.[type] ||
    rarityStyles.default[type]
  );
};
