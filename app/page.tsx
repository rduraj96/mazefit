"use client";

import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { ActivityData, Macros, Meal } from "./types";
import { useGlobalContext } from "./Context/store";
import { useEffect, useState } from "react";
import { dateToString } from "@/lib/utils";
import Loading from "./loading";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const {
    meals,
    setMeals,
    selectedDate,
    profileClicked,
    setMacroGoals,
    setSupplements,
    setUserDetails,
  } = useGlobalContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch("/api/meals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      });
  }, [setMeals]);

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const goalCalories = Number(data.calories);
        setUserDetails(data);
        setMacroGoals({
          calories: goalCalories,
          protein: Math.round((goalCalories * 0.35) / 4),
          carbs: Math.round((goalCalories * 0.35) / 4),
          fat: Math.round((goalCalories * 0.3) / 9),
        });
      });
  }, [setMacroGoals, setUserDetails]);

  useEffect(() => {
    fetch(`api/supplements?date=${dateToString(selectedDate as Date)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSupplements(data);
      });
  }, [selectedDate, setSupplements]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortActivityData = (data: Meal[]) => {
    const formattedData: ActivityData[] = [];

    data.forEach((meal) => {
      const existingData = formattedData.find(
        (data) => data.day === dateToString(new Date(meal.day))
      );

      if (existingData) {
        existingData.calories += meal.calories;
        existingData.protein += meal.protein;
        existingData.carbs += meal.protein;
        existingData.fat += meal.fat;
      } else {
        formattedData.push({
          day: dateToString(new Date(meal.day)),
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
        });
      }
    });

    const sortedData = [...formattedData].sort(
      (b, a) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    const res: ActivityData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      const sortedEntry = sortedData.find(
        (entry) => entry.day === dateToString(currentDate)
      );

      if (sortedEntry) {
        res.push({
          day: sortedEntry.day,
          formattedDay: sortedEntry.day.slice(0, -5),
          calories: sortedEntry.calories,
          protein: sortedEntry.protein * 4,
          carbs: sortedEntry.carbs * 4,
          fat: sortedEntry.fat * 9,
        });
      } else {
        res.push({
          day: dateToString(currentDate),
          formattedDay: dateToString(currentDate).slice(0, -5),
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        });
      }
    }

    return res.reverse();
  };

  const formatMacros = (meals: Array<Meal>) => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    const dayMeals = meals.filter(
      (meal) =>
        dateToString(new Date(meal.day)) === dateToString(selectedDate as Date)
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

  if (!mounted) {
    return <Loading />;
  }

  return (
    <ScrollArea className="w-full h-screen">
      <UserBar />
      {/* <div className={`flex w-full`}> */}
      {/* <div className={`grid grid-cols-1 grid-rows-2`}> */}
      {/* <div className="col-span-1 row-span-1"> */}
      <MainTiles macros={macros} activityData={activityData} />
      {/* </div> */}
      {/* <div className="col-span-1 row-span-1"> */}
      <TertiaryTiles />
      {/* </div> */}
      {/* </div> */}
      {/* <SecondaryTiles /> */}
      {/* <div className="basis-1/5">
          <UserDetails />
        </div> */}
      {/* </div> */}
    </ScrollArea>
  );
}
