import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction, use, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { Meal } from "../types";
import { useToast } from "@/components/ui/use-toast";
import MealPieChart from "./MealPieChart";
import { Loader2 } from "lucide-react";

type Props = {
  meal: Meal;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UpdateMeal = ({ meal, setOpen }: Props) => {
  const [name, setName] = useState(meal.name);
  const [status, setStatus] = useState(meal.type as string);
  const [protein, setProtein] = useState(meal.protein.toString());
  const [calories, setCalories] = useState(meal.calories.toString());
  const [carbs, setCarbs] = useState(meal.carbs.toString());
  const [fat, setFat] = useState(meal.fat.toString());
  const { meals, setMeals } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);

  const { toast } = useToast();

  const handleUpdate = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          type: status,
          calories: parseInt(calories),
          protein: parseInt(protein),
          carbs: parseInt(carbs),
          fat: parseInt(fat),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setName("");
        setStatus("");
        setProtein("");
        setCalories("");
        setCarbs("");
        setFat("");
        const filteredMeals = meals.filter((meal) => meal.id != id);
        setMeals([...filteredMeals, data]);
        setOpen(false);
        setIsLoading(false);
        toast({
          title: "Meal updated successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDelLoading(true);
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMeals(meals.filter((meal, i) => meal.id !== id));
        setOpen(false);
        setIsDelLoading(false);
        toast({
          title: "Meal deleted successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = [
    { name: "Protein", value: parseInt(protein) },
    { name: "Carbs", value: parseInt(carbs) },
    { name: "Fat", value: parseInt(fat) },
  ];

  return (
    <div>
      <MealPieChart data={data} />
      {/* <form></form> */}
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="meal" className="text-left  mb-0.25">
            Name
          </Label>
          <Input
            id="meal"
            value={name}
            className="col-span-1 "
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center gap-4 mb-4">
        <div className="flex flex-col col-span-2 gap-2">
          <Label htmlFor="calories" className="text-left  mb-0.25">
            Calories
          </Label>
          <Input
            id="calories"
            value={calories}
            className="col-span-2 "
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <Label htmlFor="status" className="text-left  mb-0.25">
            Status
          </Label>
          <Select onValueChange={setStatus} defaultValue={status || undefined}>
            <SelectTrigger className="">
              <SelectValue placeholder="Type" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="protein" className="text-left  mb-0.25">
            Protein
          </Label>
          <Input
            id="protein"
            value={protein}
            className="col-span-1 "
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="carbs" className="text-left  mb-0.25">
            Carbs
          </Label>
          <Input
            id="carbs"
            value={carbs}
            className="col-span-1 "
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fat" className="text-left  mb-0.25">
            Fat
          </Label>
          <Input
            id="fat"
            value={fat}
            className="col-span-1 "
            onChange={(e) => setFat(e.target.value)}
          />
        </div>
      </div>
      {/* </div> */}
      <DialogFooter>
        <div className="w-full flex justify-between items-center">
          {/* <DialogClose> */}
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => {
              handleDelete(meal.id);
            }}
            className="bg-red-400"
          >
            {isDelLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
          {/* </DialogClose> */}
          {/* <DialogClose> */}
          <Button
            type="submit"
            onClick={() => {
              handleUpdate(meal.id);
            }}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
          {/* </DialogClose> */}
        </div>
      </DialogFooter>
    </div>
  );
};

export default UpdateMeal;
