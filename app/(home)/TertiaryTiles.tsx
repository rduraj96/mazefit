"use client";

import React, { Suspense, useEffect, useState } from "react";
import AddMeal from "./AddMeal";
import MealTable from "./MealTable";
import { useGlobalContext } from "../Context/store";
import BoxHeader from "../(shared)/BoxHeader";
import ChartBox from "../(shared)/ChartBox";
import MainCard from "../(shared)/MainCard";
import MacroRadarChart from "./MacroRadarChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { dateToString } from "@/lib/utils";
import { GiWeight, GiWeightScale } from "react-icons/gi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiFillEdit, AiOutlineRadarChart } from "react-icons/ai";
import WeightChart from "./WeightChart";
import { formatISO } from "date-fns";

type Props = {};

const TertiaryTiles = (props: Props) => {
  const { meals, selectedDate } = useGlobalContext();
  const { toast } = useToast();
  const [isNewWeight, setIsNewWeight] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [range, setRange] = useState("week");
  const [showChart, setShowChart] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const reponse = await fetch(`/api/weight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: formatISO(selectedDate as Date),
          weight: Number(newWeight),
        }),
      });
      if (reponse.ok) {
        const data = await reponse.json();
        console.log(data);
        setIsNewWeight(false);
        setNewWeight("");
        toast({
          description: `Weight: ${newWeight}lb logged for ${dateToString(
            selectedDate as Date
          )}!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative mx-7 mt-7">
      <div className="w-full grid grid-auto-fit-lg gap-7 mx-auto">
        {/* RECENT MEALS TABLE*/}
        <MainCard className="col-span-2 min-h-full">
          <div className="flex justify-between items-center pb-2">
            <BoxHeader>Recent Meals</BoxHeader>
            <div className="lg:h-full">
              <AddMeal />
            </div>
          </div>
          <MealTable />
        </MainCard>
        {/* JOURNAL AND CHART*/}
        <MainCard className="lg:col-span-1 col-span-2">
          <div className="flex justify-between items-center gap-3">
            <BoxHeader>Journal</BoxHeader>
            <Button
              form="journal-form"
              type="submit"
              className="text-neutral-400"
              // onClick={() => setShowChart(!showChart)}
            >
              {!showChart ? <AiOutlineRadarChart /> : <AiFillEdit />}
            </Button>
          </div>
          <ChartBox>
            <MacroRadarChart
              showChart={showChart}
              setShowChart={setShowChart}
            />
          </ChartBox>
        </MainCard>
        {/* WEIGHT CHART */}
        <MainCard className="col-span-2">
          <div className="flex justify-between items-center gap-3">
            <BoxHeader>Weight</BoxHeader>
            <div className="flex gap-3">
              <Button variant="default" className="group p-0">
                {!isNewWeight ? (
                  <div
                    className="flex text-neutral-400 shadow-sm items-center justify-center h-full mx-3"
                    onClick={() => setIsNewWeight(true)}
                  >
                    {/* {"Log Weight"} */}
                    <GiWeightScale />
                  </div>
                ) : (
                  <form
                    className="flex justify-between items-center h-full"
                    onSubmit={handleSubmit}
                  >
                    <Input
                      id="weight"
                      type="number"
                      value={newWeight}
                      placeholder={`Log weight for ${dateToString(
                        selectedDate as Date
                      )}`}
                      onBlur={() => setIsNewWeight(false)}
                      autoFocus={true}
                      className="h-full w-full m-0 border-none py-0 text-neutral-700 focus-visible:ring-0 focus-visible:border-[#191b1b]"
                      onChange={(e) => setNewWeight(e.target.value)}
                    />
                    <div className="h-full w-10 text-md bg-[#191b1b] rounded-r-lg text-neutral-500 flex justify-center items-center">
                      lb
                    </div>
                  </form>
                )}
              </Button>
              <Select onValueChange={setRange} defaultValue={range}>
                <SelectTrigger className="text-black border-none bg-background w-fit line-clamp-1">
                  <SelectValue placeholder="Range" className="text-black" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">7 Days</SelectItem>
                  <SelectItem value="month">30 Days</SelectItem>
                  <SelectItem value="sixmonths" disabled>
                    {"6 Months (Avg)"}
                  </SelectItem>
                  <SelectItem value="year" disabled>
                    {"Year (Avg)"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ChartBox>
            <WeightChart range={range} />
          </ChartBox>
        </MainCard>
      </div>
    </section>
  );
};

export default TertiaryTiles;
