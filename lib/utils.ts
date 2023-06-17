import { UserDetails } from "@/app/types"
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

export function dateToString(date: Date): string {
  return date.toLocaleString().split(",")[0]
}

export function calculateTDEE(userDetails: UserDetails): number {
  const { age, gender, weight, height, activityLevel } = userDetails;
  let bmr: number;

  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let tdee: number;

  switch (activityLevel) {
    case 'sedentary':
      tdee = bmr * 1.2;
      break;
    case 'lightly active':
      tdee = bmr * 1.375;
      break;
    case 'moderately active':
      tdee = bmr * 1.55;
      break;
    case 'very active':
      tdee = bmr * 1.725;
      break;
    default:
      tdee = bmr;
      break;
  }

  return Math.round(tdee);
}
