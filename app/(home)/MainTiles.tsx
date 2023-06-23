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
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "../Context/store";
import { DropdownMenuCheckboxes } from "../(shared)/ActivityDropdownMenu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Props = {
  macros: Macros;
  activityData: Array<ActivityData>;
};

type Checked = DropdownMenuCheckboxItemProps["checked"];

const MainTiles = ({ macros, activityData }: Props) => {
  const [proteinEnabled, setProteinEnabled] = useState<Checked>(false);
  const [carbsEnabled, setCarbsEnabled] = useState<Checked>(false);
  const [fatEnabled, setFatEnabled] = useState<Checked>(false);

  return (
    <section className="relative mx-7 pt-5">
      <div className="w-full grid grid-auto-fit-md gap-7 mx-auto">
        <MainCard className="cursor-pointer sm:col-span-1 col-span-2">
          <BoxHeader>Overview</BoxHeader>
          <ChartBox>
            <CaloriesRadialChart macros={macros} />
          </ChartBox>
        </MainCard>
        <div className="grid grid-auto-fit-md col-span-2 gap-7">
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
        <MainCard className="sm:col-span-1 col-span-2">
          {/* <BoxHeader>Suplements</BoxHeader> */}
          <SuplementList />
        </MainCard>
        <MainCard className="shadow-md cursor-pointer md:col-span-1 lg:col-span-2 col-span-2">
          <BoxHeader>
            {"Recent Activity"}
            <DropdownMenuCheckboxes
              protein={proteinEnabled}
              setProtein={setProteinEnabled}
              carbs={carbsEnabled}
              setCarbs={setCarbsEnabled}
              fat={fatEnabled}
              setFat={setFatEnabled}
            />
          </BoxHeader>
          <ChartBox>
            <Activity
              activityData={activityData}
              flags={{
                protein: proteinEnabled as boolean,
                carbs: carbsEnabled as boolean,
                fat: fatEnabled as boolean,
              }}
            />
          </ChartBox>
        </MainCard>
      </div>
    </section>
  );
};

export default MainTiles;
