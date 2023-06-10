import React, { useEffect, useState } from "react";
import { BsFillDropletFill } from "react-icons/bs";
import {
  GiSlicedBread,
  GiDroplets,
  GiGrainBundle,
  GiCharcuterie,
  GiMeat,
} from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import MainCard from "../(shared)/MainCard";
import { ActivityData, Macros } from "../types";
import CaloriesRadialChart from "./CaloriesRadialChart";
import WeightChart from "./WeightChart";
import BoxHeader from "../(shared)/BoxHeader";
import ChartBox from "../(shared)/ChartBox";
import Activity from "./Activity";
import MacroCard from "../(shared)/MacroCard";
import SuplementList from "./SuplementList";

type Props = {
  macros: Macros;
  activityData: Array<ActivityData>;
};

const MainTiles = ({ macros, activityData }: Props) => {
  return (
    <section className="relative py-3 px-7">
      <div className="grid grid-cols-6 grid-rows-4 h-80 gap-7 my-5">
        <MainCard className="cursor-pointer col-span-1 row-span-4">
          <BoxHeader>Overview</BoxHeader>
          <ChartBox>
            <CaloriesRadialChart macros={macros} />
          </ChartBox>
        </MainCard>
        <MacroCard
          header="Calories"
          className="hover:bg-[#FFA600]"
          macro={macros.calories}
        >
          <GiCharcuterie size={"5rem"} />
        </MacroCard>
        <MacroCard
          header="Protein"
          className="hover:bg-[#FF7C46]"
          macro={macros.protein}
        >
          <GiMeat size={"5rem"} />
        </MacroCard>
        <MainCard className="col-span-2 row-span-4 shadow-md cursor-pointer">
          <BoxHeader>Recent Activity</BoxHeader>
          <ChartBox>
            <Activity activityData={activityData} />
          </ChartBox>
        </MainCard>
        <MainCard className="col-span-1 row-span-4">
          <BoxHeader>Suplements</BoxHeader>
          <SuplementList />
        </MainCard>
        <MacroCard
          header="Carbs"
          className="hover:bg-[#F95D67]"
          macro={macros.carbs}
        >
          <GiGrainBundle size={"5rem"} />
        </MacroCard>
        <MacroCard
          header="Fat"
          className="hover:bg-[#D45088]"
          macro={macros.fat}
        >
          <GiDroplets size={"5rem"} />
        </MacroCard>
      </div>
    </section>
  );
};

export default MainTiles;
