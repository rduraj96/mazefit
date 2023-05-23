import { getServerSession } from "next-auth";
import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./(shared)/Navbar";
import { prisma } from "@/lib/client";
import { Meal } from "@prisma/client";
import { ActivityData } from "./types";

const getMeals = async () => {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session?.user?.id as string);

  const meals = await prisma.meal.findMany({
    where: {
      userId: userId,
      // day: new Date("2023-05-23"),
    },
  });

  return meals;
};

export default async function Home() {
  const meals = await getMeals();
  const dayMeals = meals.filter(
    (meal) => meal.day.toISOString().split("T")[0] === "2023-05-23"
  );

  const formatMacros = () => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    dayMeals?.forEach((meal) => {
      calories += meal.calories;
      protein += meal.protein;
      carbs += meal.carbs;
      fat += meal.fat;
    });

    return { calories, protein, carbs, fat };
  };

  function formatActivityData(): ActivityData[] {
    const formattedData: ActivityData[] = [];

    meals.forEach((meal) => {
      const existingData = formattedData.find(
        (data) => data.day === meal.day.toISOString().split("T")[0]
      );

      if (existingData) {
        existingData.calories += meal.calories;
      } else {
        formattedData.push({
          day: meal.day.toISOString().split("T")[0],
          calories: meal.calories,
        });
      }
    });

    while (formattedData.length < 5) {
      const currentFurthest = new Date(formattedData[0].day);
      currentFurthest.setDate(currentFurthest.getDate() - 1);
      formattedData.unshift({
        day: currentFurthest.toISOString().split("T")[0],
        calories: 0,
      });
    }

    const sortedData = [...formattedData].sort(
      (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    return sortedData;
  }

  const macros = formatMacros();
  const activityData = formatActivityData();

  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-4/5">
        <UserBar />
        <MainTiles macros={macros} />
        <TertiaryTiles userMeals={dayMeals} activityData={activityData} />
        <SecondaryTiles />
      </div>
      <div className="basis-1/5">
        <UserDetails />
      </div>
    </main>
  );
}
