import React from "react";
import { Meal } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const MacroBar = ({ className, calories, protein, carbs, fat }: Props) => {
  const proteinPer = Math.round(((protein * 4) / calories) * 100);
  const carbsPer = Math.round(((carbs * 4) / calories) * 100);
  const fatPer = 100 - (proteinPer + carbsPer);

  return (
    <div
      className={cn(
        "relative text-transparent hover:text-gray-200 shadow-md w-full h-4 overflow-hidden flex items-center rounded-full text-xs hover:scale-125 hover:transition-all",
        className
      )}
    >
      <div
        className={`text-center bg-[#FF7C46] h-full`}
        style={{
          width: `${proteinPer}%`,
        }}
      >
        {protein}
      </div>
      <div
        className={`text-center bg-[#F95D67] h-full`}
        style={{
          width: `${carbsPer}%`,
        }}
      >
        {carbs}
      </div>
      <div
        className={`text-center bg-[#D45088] rounded-r-xl h-full`}
        style={{
          width: `${fatPer}%`,
        }}
      >
        {fat}
      </div>
    </div>
  );
};

export default MacroBar;
