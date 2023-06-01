"use client";

import React, { useEffect, useState } from "react";
import Activity from "./Activity";
// import { Meal } from "@prisma/client";

import AddMeal from "./AddMeal";
import { ActivityData, Meal } from "../types";
import MealTable from "./MealTable";
import { useGlobalContext } from "../Context/store";

type Props = {
  // meals: Array<Meal>;
  activityData: Array<ActivityData>;
};

const TertiaryTiles = ({ activityData }: Props) => {
  const { meals, selectedDate } = useGlobalContext();
  const [dayMeals, setDayMeals] = useState<Meal[]>([]);
  useEffect(() => {
    console.log(meals);
    setDayMeals(
      meals.filter(
        (meal) =>
          new Date(meal.day).toLocaleString().split(",")[0] ===
          selectedDate?.toLocaleString().split(",")[0]
      )
    );
  }, [selectedDate, meals]);

  return (
    <section className="px-7">
      <div className="flex justify-between gap-x-7">
        <div className="basis-1/2">
          <div className="flex justify-between pb-4 items-center">
            <div className="text-white font-semibold text-lg">Recent Meals</div>
            <AddMeal />
          </div>
          <MealTable dayMeals={dayMeals} />
        </div>
        <div className="basis-1/2 h-80">
          <div className="flex justify-between pb-5 items-center">
            <div className="text-white font-semibold text-lg">Activity</div>
          </div>
          <Activity activityData={activityData} />
        </div>
      </div>
    </section>
  );
};

export default TertiaryTiles;
