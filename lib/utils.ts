import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPercentage(macro: number, calories: number) {
  let res = Math.round((macro / calories) * 100)
  if(res > 100) return 100
  else return res
}