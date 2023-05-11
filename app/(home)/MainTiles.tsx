import React from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import { Progress } from "@/components/ui/progress";
import MainCard from "../(shared)/MainCard";

type Props = {};

const MainTiles = (props: Props) => {
  const dailyData = [
    {
      date: "2023-05-09",
      time: 23,
      distance: 5.6,
      calories: 1734,
      sleep: 7,
    },
    {
      date: "2023-05-08",
      time: 45,
      distance: 0.6,
      calories: 1245,
      sleep: 9,
    },
  ];

  return (
    <section className="relative px-7 py-5">
      <div className="grid grid-cols-4 grid-rows-1 h-48 gap-x-7 gap-y-6 my-5">
        <MainCard className="bg-[#51D8D8] hover:shadow-[#51D8D8] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <MdAccessTimeFilled size={30} />
            <p className="font-bold text-xl">Time</p>
          </div>
          <div className="p-4">
            <p className="font-extrabold text-4xl">
              {dailyData[0].time} <span className="font-bold text-lg">min</span>
            </p>
            <Progress value={dailyData[0].time} className="mt-2" />
          </div>
        </MainCard>
        <MainCard className="bg-[#F97A4D] hover:shadow-[#F97A4D] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <GiPathDistance size={30} />
            <p className="font-bold text-xl">Distance</p>
          </div>
          <div className="p-4">
            <p className="font-extrabold text-4xl">
              [7.2] <span className="font-bold text-lg">mi</span>
            </p>
            <Progress value={23} className="mt-2" />
          </div>
        </MainCard>
        <MainCard className="bg-[#F46082] hover:shadow-[#F46082] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <AiFillFire size={30} />
            <p className="font-bold text-xl">Calories</p>
          </div>
          <div className="p-4">
            <p className="font-extrabold text-4xl">
              2088 <span className="font-bold text-lg">cal</span>
            </p>
            <Progress value={63} className="mt-2" />
          </div>
        </MainCard>
        <MainCard className="bg-[#867BFC] hover:shadow-[#867BFC] shadow-md cursor-pointer">
          <div className="flex gap-3 p-4 items-center">
            <MdAccessTimeFilled size={30} />
            <p className="font-bold text-xl">Sleep</p>
          </div>
          <div className="p-4">
            <p className="font-bold text-3xl">6h 32m</p>
            <Progress value={54} className="mt-2" />
          </div>
        </MainCard>
      </div>
    </section>
  );
};

export default MainTiles;
