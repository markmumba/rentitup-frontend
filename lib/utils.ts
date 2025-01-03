import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export const admin = ["ADMIN"];
export const customer = ["CUSTOMER"];
export const owner = ["OWNER"];
export const allRoles = ["ADMIN","OWNER","CUSTOMER"];

export function shortenDescription(description: string) {
  const maxlength: number = 100

  if (description.length <= maxlength) {
    return description
  }
  return description.slice(0, maxlength - 3) + "..."
}

export function dateConverter(date: string): string {
  const dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  return dateObj.toLocaleString('en-US', options);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
