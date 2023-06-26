import React from "react";
import MacroBar from "./MacroBar";
import { Meal } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

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
    <div className="group gap-5 h-14 flex justify-between items-center rounded-lg px-3 cursor-pointer hover:bg-muted">
      <div className="sm:basis-3/5 basis-1/2 text-left min-w-0">
        <div className="flex items-center justify-start gap-3">
          <Avatar className="rounded-xl aspect-auto h-8 w-8">
            <AvatarImage src={images[`${meal.type as keyof typeof images}`]} />
            <AvatarFallback>Food</AvatarFallback>
          </Avatar>
          <Label className="line-clamp-1 text-md">{meal.name}</Label>
        </div>
      </div>
      {/* <div className="basis-1/4 text-center">{meal.type}</div> */}
      <div className="sm:flex sm:basis-2/5 hidden">
        <MacroBar
          calories={meal.calories}
          protein={meal.protein}
          carbs={meal.carbs}
          fat={meal.fat}
        />
      </div>
      <div className="basis-1/2 sm:basis-1/5 flex-1 md:justify-end font-bold flex justify-center items-center w-full gap-2">
        {/* <p className="text-center text-red-500 text-xs">24%</p> */}
        {/* <Badge variant="outline" className=""> */}
        <Label className="font-bold text-md">{meal.calories}</Label>
        {/* <AiFillFire /> */}
        {/* </Badge> */}
      </div>
    </div>
  );
};

export default TableRow;
