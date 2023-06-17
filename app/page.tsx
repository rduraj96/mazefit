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
          protein: Math.round((goalCalories * 0.4) / 4),
          carbs: Math.round((goalCalories * 0.3) / 4),
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
      } else {
        formattedData.push({
          day: dateToString(new Date(meal.day)),
          calories: meal.calories,
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
        res.push(sortedEntry);
      } else {
        res.push({ day: dateToString(currentDate), calories: 0 });
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
    <main className="flex w-full h-screen">
      {/* <Navbar /> */}
      <div
        className={`${
          profileClicked ? "basis-4/5" : "basis-full"
        } duration-700 max-h-full`}
      >
        <UserBar />
        <MainTiles macros={macros} activityData={activityData} />
        <TertiaryTiles />
        <SecondaryTiles />
      </div>
      {profileClicked && (
        <div
          className="basis-1/5 duration-700"
          style={{ transitionDelay: "1300ms" }}
        >
          <UserDetails />
        </div>
      )}
    </main>
  );
}
