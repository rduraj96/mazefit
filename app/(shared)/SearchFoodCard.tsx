import React from "react";
import MacroBar from "./MacroBar";
import { FoodItem } from "../types";
import { ShieldCheck } from "lucide-react";

type Props = {
  food: FoodItem;
};

const SearchFoodCard = ({ food }: Props) => {
  return (
    <div className="w-full h-20 cursor-pointer flex items-center justify-between bg-card rounded-xl shadow-sm mb-3 text-card-foreground border-x-2 border-y-1 py-2 px-3">
      <div className="w-3/4 h-full">
        <div className="flex items-center justify-start gap-2 h-1/2 ">
          <p className="font-bold line-clamp-1 whitespace-nowrap flex items-center h-full w-fit">
            {food.brand ? food.brand : " "}
          </p>
          {food.brand && (
            <div className={`h-full flex items-center justify-center`}>
              <ShieldCheck className="text-green-600 relative" size={18} />
            </div>
          )}
        </div>

        <div className="flex w-full items-center">
          <p className="line-clamp-1 pt-1">{food.name}</p>
        </div>
      </div>
      <div className="w-1/4 text-center h-full">
        <p className="font-bold text-lg p-2 h-3/4">
          {food.calories}
          <span className="text-sm font-normal"> cal</span>
        </p>
        <MacroBar
          calories={food.calories}
          protein={food.protein}
          carbs={food.carbs}
          fat={food.fat}
          className="h-2 hover:text-transparent hover:scale-100"
        />
      </div>
    </div>
  );
};

export default SearchFoodCard;
