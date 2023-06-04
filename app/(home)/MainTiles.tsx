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
import { Slider } from "@/components/slider";

type Props = {
  macros: Macros;
};

const MainTiles = ({ macros }: Props) => {
  return (
    <section className="relative py-3 px-7">
      <div className="grid grid-cols-6 grid-rows-4 h-80 gap-x-7 gap-y-6 my-5">
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
          <GiCharcuterie size={"6rem"} />
        </MacroCard>
        <MacroCard
          header="Protein"
          className="hover:bg-[#FF7C46]"
          macro={macros.protein}
        >
          <GiMeat size={"6rem"} />
        </MacroCard>
        {/* <MainCard className="col-span-2 row-span-1">
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="justify-center mt-4"
          />
        </MainCard>
        <MainCard className="col-span-1 row-span-1">WaterDial</MainCard> */}
        <MainCard className="col-span-3 row-span-4 shadow-md cursor-pointer">
          <BoxHeader>Weight</BoxHeader>
          <ChartBox>
            <WeightChart />
          </ChartBox>
        </MainCard>
        <MacroCard
          header="Carbs"
          className="hover:bg-[#F95D67]"
          macro={macros.carbs}
        >
          <GiGrainBundle size={"6rem"} />
        </MacroCard>
        <MacroCard
          header="Fat"
          className="hover:bg-[#D45088]"
          macro={macros.fat}
        >
          <GiDroplets size={"6rem"} />
        </MacroCard>
        {/* <MainCard className="col-span-2 row-span-2">p</MainCard> */}
      </div>
    </section>
  );
};

export default MainTiles;
