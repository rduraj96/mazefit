"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsPlus } from "react-icons/bs";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  LineChart,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import Activity from "./Activity";
import WeightChart from "./WeightChart";

type Props = {};

type Meal = {
  meal: string;
  status: string;
  protein: string;
  calories: string;
};

const TertiaryTiles = (props: Props) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [meal, setMeal] = useState("");
  const [status, setStatus] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");

  const data = [
    {
      name: "Monday",
      protein: 4000,
      calories: 2400,
      amt: 2400,
    },
    {
      name: "Tuesday",
      protein: 3000,
      calories: 1398,
      amt: 2210,
    },
    {
      name: "Wednesday",
      protein: 2000,
      calories: 2800,
      amt: 2290,
    },
    {
      name: "Thursday",
      protein: 2780,
      calories: 3908,
      amt: 2000,
    },
    {
      name: "Friday",
      protein: 1890,
      calories: 1800,
      amt: 2181,
    },
    {
      name: "Saturday",
      protein: 1890,
      calories: 1450,
      amt: 2181,
    },
    {
      name: "Sunday",
      protein: 1890,
      calories: 2230,
      amt: 2181,
    },
  ];

  const handleSubmit = () => {
    setMeals((prevMeals) => [
      ...prevMeals,
      {
        meal: meal,
        status: status,
        protein: protein,
        calories: calories,
      },
    ]);
    setMeal("");
    setStatus("");
    setProtein("");
    setCalories("");
  };

  return (
    <section className="px-7">
      <div className="flex justify-between gap-x-7">
        <div className="basis-3/5">
          <div className="flex justify-between pb-4 items-center">
            <div className="text-white font-semibold text-lg">Recent Meals</div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  {/* <Button variant="outline">Add Meal</Button> */}
                  <div
                    className="h-9 w-9 bg-foreground rounded-xl flex justify-center items-center 
                  hover:bg-gray-200 hover:text-foreground cursor-pointer"
                  >
                    <BsPlus
                      size={24}
                      className="text-gray-200 hover:text-black"
                    />
                  </div>

                  {/* <h1 className="text-gray-200 hover:text-white text-sm cursor-pointer">
                    Add Meal
                  </h1> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Meal</DialogTitle>
                    <DialogDescription>
                      Add a meal here. Click save changes to log the meal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 text-white">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Meal
                      </Label>
                      <Input
                        id="meal"
                        value={meal}
                        className="col-span-3"
                        onChange={(e) => setMeal(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Status
                      </Label>
                      <Input
                        id="status"
                        value={status}
                        className="col-span-3"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Protein
                      </Label>
                      <Input
                        id="protein"
                        value={protein}
                        className="col-span-3"
                        onChange={(e) => setProtein(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Calories
                      </Label>
                      <Input
                        id="calories"
                        value={calories}
                        className="col-span-3"
                        onChange={(e) => setCalories(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <ScrollArea className="bg-[#1b1b1b] h-80 rounded-3xl">
            <Table className="p-2 max-h-fit overflow-scroll">
              {/* <TableCaption>Add todays meals here.</TableCaption> */}
              {meals.length === 0 && (
                <TableCaption className="text-gray-300">
                  Add todays meals here.
                </TableCaption>
              )}
              <TableHeader>
                <TableRow className="bg-black">
                  <TableHead className="">Meal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Protein (g)</TableHead>
                  <TableHead className="text-right">Calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="hover:bg-transparent gap-3">
                {meals &&
                  meals.map((meal) => (
                    <TableRow
                      key={meal.meal}
                      className="text-gray-300 font-semibold"
                    >
                      <TableCell className="font-medium">{meal.meal}</TableCell>
                      <TableCell>{meal.status}</TableCell>
                      <TableCell>{meal.protein}</TableCell>
                      <TableCell className="text-right" role="checkbox">
                        {meal.calories}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <div className="basis-2/5 h-80">
          <div className="flex justify-between pb-5 items-center">
            <div className="text-white font-semibold text-lg">Activity</div>
          </div>
          {/* <div className="bg-[#1b1b1b] rounded-3xl"> */}
          <Activity data={data} />
        </div>
        {/* <div className="basis-1/4">
          <h1 className="text-white pb-3 font-semibold">Streak</h1>
          <div className="bg-[#1b1b1b] rounded-3xl">poop</div>
        </div> */}
      </div>
    </section>
  );
};

export default TertiaryTiles;
function setState(arg0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}
