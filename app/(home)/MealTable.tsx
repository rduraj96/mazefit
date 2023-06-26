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
import { Separator } from "@/components/ui/separator";

type Props = {};

const MealTable = ({}: Props) => {
  const { meals, selectedDate, loading } = useGlobalContext();
  const [dayMeals, setDayMeals] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>();

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
        <span className="inline-flex bg-background rounded-md border px-1 py-2 text-xs">
          Add Meal
        </span>{" "}
        to log a meal.
      </p>
    </div>
  );

  return loading ? (
    <LoadingSpinner />
  ) : dayMeals.length > 0 ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <ScrollArea className="rounded-lg min-h-64 pr-3 h-full">
        {dayMeals &&
          dayMeals.map((meal) => (
            <DialogTrigger
              key={meal.id}
              onClick={() => setCurrentMeal(meal)}
              asChild
            >
              <div>
                <TableRow meal={meal} />
                <Separator />
              </div>
            </DialogTrigger>
          ))}

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {currentMeal?.name}
            </DialogTitle>
            <DialogDescription className="">
              Edit or delete your meal.
            </DialogDescription>
          </DialogHeader>
          <UpdateMeal meal={currentMeal as Meal} setOpen={setOpen} />
        </DialogContent>
      </ScrollArea>
    </Dialog>
  ) : (
    <MissingData />
  );
};

export default MealTable;
