import React from "react";
import { Meal } from "../types";

type Props = {
  meal: Meal;
};

const MacroBar = ({ meal }: Props) => {
  const protein = Math.round(((meal.protein * 4) / meal.calories) * 100);
  const carbs = Math.round(((meal.protein * 4) / meal.calories) * 100);
  const fat = 100 - (protein + carbs);
  console.log(protein, carbs, fat);
  return (
    <div className="relative text-transparent hover:text-gray-200 shadow-md w-full h-4 overflow-hidden flex items-center rounded-full text-xs hover:scale-125 hover:transition-all">
      <div
        className={`text-center bg-[#FF7C46] h-full`}
        style={{
          width: `${protein}%`,
        }}
      >
        {meal.protein}
      </div>
      <div
        className={`text-center bg-[#F95D67] h-full`}
        style={{
          width: `${carbs}%`,
        }}
      >
        {meal.carbs}
      </div>
      <div
        className={`text-center bg-[#D45088] rounded-r-xl h-full`}
        style={{
          width: `${fat}%`,
        }}
      >
        {meal.fat}
      </div>
    </div>
  );
};

export default MacroBar;
