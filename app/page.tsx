"use client";

import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { ActivityData, Macros, Meal } from "./types";
import { useGlobalContext } from "./Context/store";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const { meals, setMeals, selectedDate } = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    fetch("/api/meals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      });
  }, [setMeals]);
  // eslint-disable-line react-hooks/exhaustive-deps

  const sortActivityData = (data: Meal[]) => {
    const formattedData: ActivityData[] = [];

    data.forEach((meal) => {
      const existingData = formattedData.find(
        (data) => data.day === new Date(meal.day).toLocaleString().split(",")[0]
      );

      if (existingData) {
        existingData.calories += meal.calories;
      } else {
        formattedData.push({
          day: new Date(meal.day).toLocaleString().split(",")[0],
          calories: meal.calories,
        });
      }
    });

    const sortedData = [...formattedData].sort(
      (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    return sortedData;
  };

  const formatMacros = (meals: Array<Meal>) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    const dayMeals = meals.filter(
      (meal) =>
        new Date(meal.day).toLocaleString().split(",")[0] ===
        selectedDate?.toLocaleString().split(",")[0]
    );

    dayMeals?.forEach((meal) => {
      calories += meal.calories;
      protein += meal.protein;
      carbs += meal.carbs;
      fat += meal.fat;
    });

    return { calories, protein, carbs, fat };
  };

  const macros = formatMacros(meals);
  const activityData = sortActivityData(meals);

  if (isLoading) return <Loading />;

  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-4/5">
        <UserBar />
        <MainTiles macros={macros} />
        <TertiaryTiles activityData={activityData} />
        <SecondaryTiles />
      </div>
      <div className="basis-1/5">
        <UserDetails />
      </div>
    </main>
  );
}
