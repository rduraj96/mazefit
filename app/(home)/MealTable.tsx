import React, { useEffect, useState } from "react";
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
import { useGlobalContext } from "../Context/store";
import TableRow from "../(shared)/TableRow";
import UpdateMeal from "../(shared)/UpdateMeal";
import LoadingSpinner from "../(shared)/LoadingSpinner";

type Props = {};

const MealTable = ({}: Props) => {
  const { meals, selectedDate, loading } = useGlobalContext();
  const [dayMeals, setDayMeals] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDayMeals(
      meals.filter(
        (meal) =>
          new Date(meal.day).toLocaleString().split(",")[0] ===
          selectedDate?.toLocaleString().split(",")[0]
      )
    );
  }, [selectedDate, meals]);

  const MissingData = () => (
    <div className="text-neutral-400 flex items-center justify-center h-full w-full">
      <p>
        Click{" "}
        <span className="inline-flex bg-background rounded-md px-1 py-2 text-xs">
          Add Meal
        </span>{" "}
        to log a meal.
      </p>
    </div>
  );

  return loading ? (
    <LoadingSpinner />
  ) : dayMeals.length > 0 ? (
    <ScrollArea className="rounded-xl h-64">
      {dayMeals &&
        dayMeals.map((meal) => (
          <Dialog key={meal.id} open={open} onOpenChange={setOpen}>
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
              <UpdateMeal meal={meal} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        ))}
    </ScrollArea>
  ) : (
    <MissingData />
  );
};

export default MealTable;
