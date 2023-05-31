import React, { useEffect, useState } from "react";
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
import { ActivityData, Meal } from "../types";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useGlobalContext } from "../Context/store";

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
    <ScrollArea className="bg-[#1b1b1b] h-80 rounded-3xl">
      <Table className="p-2 max-h-fit overflow-scroll">
        {dayMeals.length === 0 && (
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
          {dayMeals &&
            dayMeals.map((meal) => (
              <TableRow key={meal.id} className="text-gray-300 font-semibold">
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
  );
};

export default MealTable;
