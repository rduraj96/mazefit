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
import SpeedDial from "@/components/SpeedDial";

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
    <section className="relative mx-7 mt-7">
      <div className="w-full grid grid-auto-fit-lg gap-7 mx-auto">
        <MainCard className="col-span-2 min-h-full">
          <div className="flex justify-between items-center pb-2">
            <BoxHeader>Recent Meals</BoxHeader>
            <div className="lg:h-full">
              {/* <SpeedDial> */}
              <AddMeal />
              {/* <AddMeal /> */}
              {/* </SpeedDial> */}
            </div>

            {/* <AddMeal /> */}
          </div>
          <MealTable dayMeals={dayMeals} />
        </MainCard>
        <MainCard className="lg:col-span-1 col-span-2">
          <BoxHeader>Radar Chart</BoxHeader>
          <ChartBox>
            <MacroRadarChart />
          </ChartBox>
        </MainCard>
        <MainCard className="col-span-2">
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
