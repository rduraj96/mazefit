import { getServerSession } from "next-auth";
import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./(shared)/Navbar";
import { prisma } from "@/lib/client";

const getMeals = async () => {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session?.user?.id as string);

  const meals = await prisma.meal.findMany({
    where: {
      userId: userId,
      day: {
        lte: new Date(),
      },
    },
  });

  return meals;
};

export default async function Home() {
  const meals = await getMeals();
  const formatMacros = () => {
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

  const macros = formatMacros();

  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-4/5">
        <UserBar />
        <MainTiles macros={macros} />
        <TertiaryTiles userMeals={meals} />
        <SecondaryTiles />
      </div>
      <div className="basis-1/5">
        <UserDetails />
      </div>
    </main>
  );
}
