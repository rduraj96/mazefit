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
import { ScrollArea } from "@/components/ui/scroll-area";
import Activity from "./Activity";
import { Meal } from "@prisma/client";
import AddMeal from "./AddMeal";
import { ActivityData } from "../types";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  userMeals: Array<Meal>;
  activityData: Array<ActivityData>;
};

const TertiaryTiles = ({ userMeals, activityData }: Props) => {
  // const data = [
  //   {
  //     name: "Monday",
  //     protein: 4000,
  //     calories: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Tuesday",
  //     protein: 3000,
  //     calories: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Wednesday",
  //     protein: 2000,
  //     calories: 2800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Thursday",
  //     protein: 2780,
  //     calories: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Friday",
  //     protein: 1890,
  //     calories: 1800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Saturday",
  //     protein: 1890,
  //     calories: 1450,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Sunday",
  //     protein: 1890,
  //     calories: 2230,
  //     amt: 2181,
  //   },
  // ];

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <section className="px-7">
      <div className="flex justify-between gap-x-7">
        <div className="basis-3/5">
          <div className="flex justify-between pb-4 items-center">
            <div className="text-white font-semibold text-lg">Recent Meals</div>
            <AddMeal />
          </div>
          <ScrollArea className="bg-[#1b1b1b] h-80 rounded-3xl">
            <Table className="p-2 max-h-fit overflow-scroll">
              {/* <TableCaption>Add todays meals here.</TableCaption> */}
              {userMeals.length === 0 && (
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
                {userMeals &&
                  userMeals.map((meal) => (
                    <TableRow
                      key={meal.id}
                      className="text-gray-300 font-semibold"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <TableCell className="font-medium cursor-pointer">
                            {meal.name}
                          </TableCell>
                        </DialogTrigger>
                        <TableCell>{meal.type}</TableCell>
                        <TableCell>{meal.protein}</TableCell>
                        <TableCell className="text-right" role="checkbox">
                          {meal.calories}
                        </TableCell>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{meal.name}</DialogTitle>
                            {/* <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </DialogDescription> */}
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button
                                type="submit"
                                onClick={() => handleDelete(meal.id)}
                              >
                                Delete Meal
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
          <Activity activityData={activityData} />
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
