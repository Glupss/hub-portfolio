import { KEY_APIFLASH } from "@/components/config";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getScreenshot = (url) => {
  const apiKey = KEY_APIFLASH || process.env.NEXT_PUBLIC_APIFLASH;
  if (!apiKey) return "";
  return `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(
    url
  )}&width=1200&height=800&format=png&wait_until=page_loaded&delay=1&full_page=false`;
};
