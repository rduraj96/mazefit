import React from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import { Progress } from "@/components/ui/progress";
import MainCard from "../(shared)/MainCard";

type Props = {
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

const MainTiles = ({ macros }: Props) => {
  return (
    <section className="relative py-3 px-7">
      {/* <h1 className="text-white pb-3 font-semibold text-lg">Overview</h1> */}
      <div className="grid grid-cols-4 grid-rows-1 h-44 gap-x-7 gap-y-6 my-5">
        <MainCard className="bg-[#F46082] hover:shadow-[#F46082] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <AiFillFire size={30} />
            <p className="font-bold text-xl">Calories</p>
          </div>
          <div className="p-4">
            <p className="font-extrabold text-4xl">
              {macros.calories}
              {/* <span className="font-bold text-lg">cal</span> */}
            </p>
            <Progress
              value={(macros.calories / 20000) * 100}
              className="mt-2"
            />
          </div>
        </MainCard>
        <MainCard className="bg-[#867BFC] hover:shadow-[#867BFC] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <MdAccessTimeFilled size={30} />
            <p className="font-bold text-xl">Protein</p>
          </div>
          <div className="p-4">
            <p className="font-bold text-3xl">{macros.protein}</p>
            <Progress value={(macros.protein / 2000) * 100} className="mt-2" />
          </div>
        </MainCard>
        <MainCard className="bg-[#51D8D8] hover:shadow-[#51D8D8] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <MdAccessTimeFilled size={30} />
            <p className="font-bold text-xl">Carbs</p>
          </div>
          <div className="p-4">
            <p className="font-extrabold text-4xl">
              {macros.carbs}
              {/* <span className="font-bold text-lg">min</span> */}
            </p>
            <Progress value={(macros.carbs / 2000) * 100} className="mt-2" />
          </div>
        </MainCard>
        <MainCard className="bg-[#F97A4D] hover:shadow-[#F97A4D] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <GiPathDistance size={30} />
            <p className="font-bold text-xl">Fat</p>
          </div>
          <div className="p-4">
            <p className="font-extrabold text-4xl">
              {macros.fat}
              {/* <span className="font-bold text-lg">mi</span> */}
            </p>
            <Progress value={(macros.fat / 2000) * 100} className="mt-2" />
          </div>
        </MainCard>
      </div>
    </section>
  );
};

export default MainTiles;
