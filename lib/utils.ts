import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
export function createQueryString(
  keyVals: Record<string, string | null>,
  currentSearchParams: URLSearchParams
) {
  const params = new URLSearchParams(currentSearchParams.toString());

  for (const [key, value] of Object.entries(keyVals)) {
    if (value !== null) {
      params.set(key, encodeURIComponent(value));
    }
  }

  return `?${params.toString()}`;
}
