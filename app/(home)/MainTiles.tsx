import React, { useEffect, useState } from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import { Progress } from "@/components/ui/progress";
import MainCard from "../(shared)/MainCard";
import { ActivityData, Macros } from "../types";
import { useGlobalContext } from "../Context/store";
import CaloriesRadialChart from "./CaloriesRadialChart";
import WeightChart from "./WeightChart";
import BoxHeader from "../(shared)/BoxHeader";
import ChartBox from "../(shared)/ChartBox";
import Activity from "./Activity";

type Props = {
  macros: Macros;
  activityData: Array<ActivityData>;
};

const MainTiles = ({ macros, activityData }: Props) => {
  const { calories } = useGlobalContext();

  return (
    <section className="relative py-3 px-7">
      <div className="grid grid-cols-6 grid-rows-2 h-80 gap-x-7 gap-y-6 my-5">
        <MainCard className="cursor-pointer col-span-1 row-span-2">
          <BoxHeader>Overview</BoxHeader>
          {/* <div className="grid grid-cols-2 grid-rows-1 h-full w-full"> */}
          <ChartBox
          // className="cols-span-1 row-span-1"
          >
            <CaloriesRadialChart macros={macros} />
          </ChartBox>
          {/* <div className="cols-span-1 row-span-1 text-white"> */}
          {/* <h1>{macros.calories}</h1> */}
          {/* <h1>{macros.protein}</h1> */}
          {/* <h1>{macros.carbs}</h1> */}
          {/* <h1>{macros.fat}</h1> */}
          {/* </div> */}
          {/* </div> */}
        </MainCard>
        <MainCard className="hover:bg-[#FFA600] delay-150 bg-opacity-75 hover:bg-opacity-100 duration-500 hover:scale-110 hover:translate-x-2 hover:-translate-y-2 ease-in-out hover:transition-all col-span-1 row-span-1">
          <BoxHeader>Calories</BoxHeader>
          <h1 className="hidden hover:visible text-white"> Poopies</h1>
        </MainCard>
        <MainCard className="hover:bg-[#FF7C46] col-span-1 row-span-1">
          <BoxHeader>Protein</BoxHeader>
        </MainCard>
        <MainCard className="col-span-3 row-span-2 shadow-md cursor-pointer">
          <BoxHeader>Activity</BoxHeader>
          <ChartBox>
            <Activity activityData={activityData} />
          </ChartBox>
        </MainCard>
        <MainCard className="hover:bg-[#F95D67] col-span-1 row-span-1">
          <BoxHeader>Carbs</BoxHeader>
        </MainCard>
        <MainCard className="hover:bg-[#D45088] col-span-1 row-span-1">
          <BoxHeader>Fat</BoxHeader>
        </MainCard>
      </div>
    </section>
  );
};

export default MainTiles;
