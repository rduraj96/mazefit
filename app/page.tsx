"use client";

import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { Meal } from "@prisma/client";
import { ActivityData, Macros } from "./types";
import { useGlobalContext } from "./Context/store";
import { useEffect, useState } from "react";

export default function Home(date?: string) {
  const [meals, setMeals] = useState<Meal[] | []>([]);
  // const [isLoading, setLoading] = useState(false);
  const { selectedDate } = useGlobalContext();

  useEffect(() => {
    console.log(selectedDate);
    // setLoading(true);
    fetch("/api/meals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMeals(
          data.filter(
            (meal: { day: string }) => meal.day.split("T")[0] === selectedDate
          )
        );
        // setLoading(false);
      });
  }, [selectedDate]);

  // function formatActivityData(): ActivityData[] {
  //   const formattedData: ActivityData[] = [];

  //   meals.forEach((meal) => {
  //     const existingData = formattedData.find(
  //       (data) => data.day === meal.day.toISOString().split("T")[0]
  //     );

  //     if (existingData) {
  //       existingData.calories += meal.calories;
  //     } else {
  //       formattedData.push({
  //         day: meal.day.toISOString().split("T")[0],
  //         calories: meal.calories,
  //       });
  //     }
  //   });

  //   // while (formattedData.length < 5) {
  //   //   const currentFurthest = new Date(formattedData[0].day);
  //   //   currentFurthest.setDate(currentFurthest.getDate() - 1);
  //   //   formattedData.unshift({
  //   //     day: currentFurthest.toISOString().split("T")[0],
  //   //     calories: 0,
  //   //   });
  //   // }

  //   const sortedData = [...formattedData].sort(
  //     (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  //   );
  //   console.log(formattedData);
  //   return sortedData;
  // }

  const formatMacros = (meals: Array<Meal>) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meals?.forEach((meal) => {
      calories += meal.calories;
      protein += meal.protein;
      carbs += meal.carbs;
      fat += meal.fat;
    });

    return { calories, protein, carbs, fat };
  };

  const macros = formatMacros(meals);
  // const activityData = formatActivityData();

  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-4/5">
        <UserBar />
        <MainTiles macros={macros} />
        <TertiaryTiles
          meals={meals}
          // activityData={activityData}
        />
        <SecondaryTiles />
      </div>
      <div className="basis-1/5">
        <UserDetails />
      </div>
    </main>
  );
}
