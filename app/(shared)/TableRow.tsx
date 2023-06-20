import React from "react";
import MacroBar from "./MacroBar";
import { Meal } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiFillFire } from "react-icons/ai";

type Props = {
  meal: Meal;
};

const TableRow = ({ meal }: Props) => {
  const images = {
    Breakfast: "https://i.gyazo.com/5a3032c18809460607b9699fe7c06aa1.png",
    Lunch: "https://i.gyazo.com/f28d12efcdd67d4a8babb00f20768237.png",
    Dinner: "https://i.gyazo.com/08c04aac06126db7062ada26437943ac.png",
    Snack: "https://i.gyazo.com/8b8bdba3bd3a4dbd39464162343ed96f.png",
  };
  return (
    <div className="gap-5 text-black text-sm font-semibold h-14 hover:bg-[#a8bbd1] hover:bg-opacity-50 flex justify-between items-center rounded-xl mb-4 px-2 cursor-pointer">
      <div className="basis-2/4 text-left min-w-0 flex-1">
        <div className="flex items-center justify-start gap-3 whitespace-nowrap overflow-hidden">
          <Avatar className="rounded-xl aspect-auto h-8 w-8">
            <AvatarImage src={images[`${meal.type as keyof typeof images}`]} />
            <AvatarFallback>Food</AvatarFallback>
          </Avatar>
          {meal.name}
        </div>
      </div>
      {/* <div className="basis-1/4 text-center">{meal.type}</div> */}
      <div className="sm:flex sm:basis-1/4 hidden">
        <MacroBar
          calories={meal.calories}
          protein={meal.protein}
          carbs={meal.carbs}
          fat={meal.fat}
        />
      </div>
      <div className="basis-1/5 sm:justify-end font-bold flex justify-start items-center min-w-fit shrink gap-2">
        {/* <p className="text-center text-red-500 text-xs">24%</p> */}
        <AiFillFire />
        <p className="w-1/2">{meal.calories}</p>
      </div>
    </div>
  );
};

export default TableRow;
