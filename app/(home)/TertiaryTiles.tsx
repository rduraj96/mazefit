"use client";

import React, { useState } from "react";
import AddMeal from "./AddMeal";
import MealTable from "./MealTable";
import { useGlobalContext } from "../Context/store";
import ChartBox from "../(shared)/ChartBox";
import MacroRadarChart from "./MacroRadarChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { dateToString } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WeightChart from "./WeightChart";
import { formatISO } from "date-fns";
import NewMainCard from "../(shared)/NewMainCard";
import { CardTitle } from "@/components/ui/card";
import { Edit2, Save, Scale } from "lucide-react";

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
      <div className="w-full grid grid-auto-fit-lg lg:grid-cols-3 2xl:grid-cols-5 gap-7 mx-auto">
        {/* RECENT MEALS TABLE*/}
        <NewMainCard
          className="col-span-2"
          header={
            <div className="flex justify-between items-center">
              <CardTitle>Recent Meals</CardTitle>
              <div className="lg:h-full">
                <AddMeal />
              </div>
            </div>
          }
        >
          <MealTable />
        </NewMainCard>
        {/* JOURNAL AND CHART*/}
        <NewMainCard
          className="lg:col-span-1 col-span-2"
          header={
            <div className="flex justify-between items-center gap-3">
              <CardTitle>Journal</CardTitle>
              <Button
                form="journal-form"
                type="submit"
                className=""
                variant={"outline"}
                size={"icon"}
                // onClick={() => setShowChart(!showChart)}
              >
                {!showChart ? <Save size={18} /> : <Edit2 size={16} />}
              </Button>
            </div>
          }
        >
          <ChartBox>
            <MacroRadarChart
              showChart={showChart}
              setShowChart={setShowChart}
            />
          </ChartBox>
        </NewMainCard>
        {/* WEIGHT CHART */}
        <NewMainCard
          className="col-span-2 lg:col-span-3 2xl:col-span-2"
          header={
            <div className="flex justify-between items-center gap-3">
              <CardTitle>Weight</CardTitle>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="group w-full border-2"
                  size={"icon"}
                >
                  {!isNewWeight ? (
                    <div
                      className="flex items-center justify-center h-full mx-2 my-1"
                      onClick={() => setIsNewWeight(true)}
                    >
                      {/* {"Log Weight"} */}
                      <Scale size={18} />
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
                        max={500}
                        placeholder={`Log weight for ${dateToString(
                          selectedDate as Date
                        )}`}
                        onBlur={() => setIsNewWeight(false)}
                        autoFocus={true}
                        className="h-full w-full m-0 py-0 text-neutral-700 focus-visible:ring-0 focus-visible:border-primary rounded-r-none"
                        onChange={(e) => setNewWeight(e.target.value)}
                      />
                      <div className="h-full w-10 text-md bg-primary rounded-r-sm text-primary-foreground flex justify-center items-center">
                        lb
                      </div>
                    </form>
                  )}
                </Button>
                <Select onValueChange={setRange} defaultValue={range}>
                  <SelectTrigger className="w-fit line-clamp-1 shrink-0">
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
          }
        >
          <ChartBox>
            <WeightChart range={range} isNewWeight={isNewWeight} />
          </ChartBox>
        </NewMainCard>
      </div>
    </section>
  );
};

export default TertiaryTiles;
