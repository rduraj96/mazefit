import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  // TableRow,
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
import { ActivityData, Meal } from "../types";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useGlobalContext } from "../Context/store";
import TableRow from "../(shared)/TableRow";
import UpdateMeal from "../(shared)/UpdateMeal";

type Props = {
  dayMeals: Array<Meal>;
};

const MealTable = ({ dayMeals }: Props) => {
  const { meals, setMeals } = useGlobalContext();
  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setMeals(meals.filter((meal, i) => meal.id !== id));
    const data = await response.json();
    console.log(data);
  };

  return (
    <ScrollArea className="rounded-xl h-72">
      {dayMeals &&
        dayMeals.map((meal) => (
          <Dialog key={meal.id}>
            <DialogTrigger asChild>
              <div>
                <TableRow key={meal.id} meal={meal} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-black">{meal.name}</DialogTitle>
                <DialogDescription className="text-black">
                  Edit or delete your meal.
                </DialogDescription>
              </DialogHeader>
              <UpdateMeal meal={meal} />
            </DialogContent>
          </Dialog>
        ))}
    </ScrollArea>
  );
};

export default MealTable;
