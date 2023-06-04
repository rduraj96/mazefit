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
    <ScrollArea className="rounded-xl">
      {dayMeals &&
        dayMeals.map((meal) => (
          <Dialog key={meal.id}>
            <DialogTrigger asChild>
              <div>
                <TableRow key={meal.id} meal={meal} />
              </div>
            </DialogTrigger>
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
                  <Button type="submit" onClick={() => handleDelete(meal.id)}>
                    Delete Meal
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
    </ScrollArea>
  );
};

export default MealTable;
