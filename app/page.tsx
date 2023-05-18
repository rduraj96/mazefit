import { getServerSession } from "next-auth";
import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./(shared)/Navbar";
import { prisma } from "@/lib/client";

// console.log(session);

// const getMeals = async () => {
//   const session = await getServerSession(authOptions);
//   const meals = await prisma.meal.findMany({
//     where: {
//       userId: session?.user?.id,
//     },
//   });
//   return meals;
// };

export default async function Home() {
  // const meals = await getMeals();
  // console.log(meals);

  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-4/5">
        <UserBar />
        <MainTiles />
        <TertiaryTiles />
        <SecondaryTiles />
      </div>
      <div className="basis-1/5">
        <UserDetails />
      </div>
    </main>
  );
}
