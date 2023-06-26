import React, { useEffect, useState } from "react";
import { ActivityData, Macros } from "../types";
import CaloriesRadialChart from "./CaloriesRadialChart";
import ChartBox from "../(shared)/ChartBox";
import Activity from "./Activity";
import MacroCard from "../(shared)/MacroCard";
import SuplementList from "./SuplementList";
import { DropdownMenuCheckboxes } from "../(shared)/ActivityDropdownMenu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import NewMainCard from "../(shared)/NewMainCard";
import { CardTitle } from "@/components/ui/card";

type Props = {
  macros: Macros;
  activityData: Array<ActivityData>;
};

type Checked = DropdownMenuCheckboxItemProps["checked"];

const MainTiles = ({ macros, activityData }: Props) => {
  const [proteinEnabled, setProteinEnabled] = useState<Checked>(true);
  const [carbsEnabled, setCarbsEnabled] = useState<Checked>(true);
  const [fatEnabled, setFatEnabled] = useState<Checked>(true);

  return (
    <section className="relative mx-7 pt-5">
      <div className="w-full grid gap-7 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        <NewMainCard
          // header={<BoxHeader>Overview</BoxHeader>}
          title="Overview"
          className="cursor-pointer col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-2 2xl:col-span-1"
        >
          <ChartBox>
            <CaloriesRadialChart macros={macros} />
          </ChartBox>
        </NewMainCard>
        <div className="grid grid-auto-fit-md 2xl:grid-auto-fit-sm col-span-1 sm:col-span-2 lg: gap-7">
          <MacroCard
            header="Calories"
            hoverColor="hover:bg-calories"
            // numberColor="bg-calories"
            macro={macros.calories}
          ></MacroCard>
          <MacroCard
            header="Protein"
            hoverColor="hover:bg-protein"
            // numberColor="bg-protein"
            macro={macros.protein}
          ></MacroCard>
          <MacroCard
            header="Carbs"
            hoverColor="hover:bg-carbs"
            // numberColor="bg-carbs"
            macro={macros.carbs}
          ></MacroCard>
          <MacroCard
            header="Fat"
            hoverColor="hover:bg-fat"
            // numberColor={"bg-fat"}
            macro={macros.fat}
          ></MacroCard>
        </div>
        <NewMainCard
          className="cursor-pointer col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 2xl:col-span-2"
          header={
            <CardTitle className="flex justify-between items-center w-full">
              {"Recent Activity"}
              <DropdownMenuCheckboxes
                protein={proteinEnabled}
                setProtein={setProteinEnabled}
                carbs={carbsEnabled}
                setCarbs={setCarbsEnabled}
                fat={fatEnabled}
                setFat={setFatEnabled}
              />
            </CardTitle>
          }
        >
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
        </NewMainCard>
        <div
          // title="Supplements"
          className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1"
        >
          {/* <BoxHeader>Suplements</BoxHeader> */}
          <SuplementList />
        </div>
      </div>
    </section>
  );
};

export default MainTiles;
