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


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
