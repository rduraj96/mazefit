import React from "react";
import MacroBar from "./MacroBar";
import { Meal } from "../types";

type Props = {
  meal: Meal;
};

const TableRow = ({ meal }: Props) => {
  return (
    <div className="w-full text-gray-200 font-semibold h-14 bg-foreground flex justify-between items-center rounded-2xl mb-4 px-4 cursor-pointer">
      <div className="basis-1/4 text-left">{meal.name}</div>
      <div className="basis-1/4 text-left">{meal.type}</div>
      <div className="basis-1/4">
        <MacroBar meal={meal} />
      </div>
      <div className="basis-1/4 text-right">{meal.calories}</div>
    </div>
  );
};

export default TableRow;
