import { UserDetails, WeightData } from "@/app/types";
import { Weight } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { parse, startOfMonth } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPercentage(macro: number, calories: number) {
  let res = Math.round((macro / calories) * 100);
  if (res > 100) return 100;
  else return res;
}

export function dateToString(date: Date): string {
  return date.toLocaleString().split(",")[0];
}

export function calculateTDEE({
  age,
  sex,
  weight,
  height,
  activityLevel,
}: UserDetails): number {
  // const { age, sex, weight, height, activityLevel } = userDetails;
  let bmr: number;

  if (sex.toLowerCase() === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let tdee: number;

  switch (activityLevel) {
    case "sedentary":
      tdee = bmr * 1.2;
      break;
    case "lightly active":
      tdee = bmr * 1.375;
      break;
    case "moderately active":
      tdee = bmr * 1.55;
      break;
    case "very active":
      tdee = bmr * 1.725;
      break;
    default:
      tdee = bmr;
      break;
  }

  return Math.round(tdee);
}

export function calculateAveragedData(weightData: WeightData[]): WeightData[] {
  const latestDay = weightData[weightData.length - 1].day;
  const startDate = new Date(latestDay);
  startDate.setFullYear(startDate.getFullYear() - 1);

  const filteredData = weightData.filter(
    (data) => data.day >= startDate.getTime()
  );

  const averagedData: Record<string, { totalWeight: number; count: number }> =
    {};

  for (const data of filteredData) {
    const date = new Date(data.day);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (averagedData.hasOwnProperty(monthYear)) {
      averagedData[monthYear].totalWeight += data.weight;
      averagedData[monthYear].count += 1;
    } else {
      averagedData[monthYear] = { totalWeight: data.weight, count: 1 };
    }
  }

  const result: WeightData[] = [];

  for (const monthYear in averagedData) {
    const { totalWeight, count } = averagedData[monthYear];
    const averageWeight = totalWeight / count;
    const date = parse(monthYear, "MM/yyyy", startOfMonth(new Date()));
    const timestamp = date.getTime();

    console.log("Month-Year:", monthYear);
    console.log("Total Weight:", totalWeight);
    console.log("Count:", count);
    console.log("Average Weight:", averageWeight);

    result.push({ day: timestamp, weight: averageWeight });
  }
  console.log(result);

  return result;
}

export function calculateWeightPrediction(
  startDate: Date,
  startWeight: number,
  TDEE: number,
  dailyCalories: number,
  goalWeight: number
): { weightPredictions: WeightData[]; goalDay?: number } {
  const weightPredictions: WeightData[] = [];

  let currentDate = new Date(startDate);
  let currentWeight = startWeight;
  let goalDay: number | undefined = undefined;

  while (currentWeight > goalWeight) {
    const day = currentDate.getTime();
    weightPredictions.push({ day, weight: currentWeight });

    // Calculate weight loss based on calorie deficit
    const calorieDeficit = (TDEE - dailyCalories) / 3500; // Assuming 3500 calories is equal to 1 pound of weight loss
    currentWeight -= calorieDeficit;

    // Check if goal weight is reached
    if (currentWeight <= goalWeight) {
      goalDay = day;
      break;
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { weightPredictions, goalDay };
}
