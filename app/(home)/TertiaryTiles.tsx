"use client";

import React, { Suspense, useEffect, useState } from "react";
import Activity from "./Activity";
// import { Meal } from "@prisma/client";

import AddMeal from "./AddMeal";
import { ActivityData, Meal } from "../types";
import MealTable from "./MealTable";
import { useGlobalContext } from "../Context/store";
import BoxHeader from "../(shared)/BoxHeader";
import ChartBox from "../(shared)/ChartBox";
import MainCard from "../(shared)/MainCard";
import WeightChart from "./WeightChart";
import MacroRadarChart from "./MacroRadarChart";

type Props = {
  // meals: Array<Meal>;
};

const TertiaryTiles = (props: Props) => {
  const { meals, selectedDate } = useGlobalContext();
  const [dayMeals, setDayMeals] = useState<Meal[]>([]);
  useEffect(() => {
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
      <div className="grid grid-cols-9 grid-rows-1 gap-x-7 h-80">
        <MainCard className="col-span-4 row-span-1">
          <div className="flex justify-between items-center pb-2">
            <BoxHeader>Recent Meals</BoxHeader>
            <AddMeal />
          </div>
          <MealTable dayMeals={dayMeals} />
        </MainCard>
        <MainCard className="col-span-2 row-span-1">
          <BoxHeader>Radar Chart</BoxHeader>
          <MacroRadarChart />
        </MainCard>
        <MainCard className="col-span-3 row-span-1">
          <BoxHeader>Weight</BoxHeader>
          <ChartBox>
            <WeightChart />
          </ChartBox>
        </MainCard>
      </div>
    </section>
  );
};

export default TertiaryTiles;
