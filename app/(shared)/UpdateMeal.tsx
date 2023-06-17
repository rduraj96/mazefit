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
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useGlobalContext } from "../Context/store";
import { PieChart, Pie, Cell } from "recharts";
import { Meal } from "../types";
import { useToast } from "@/components/ui/use-toast";
import MealPieChart from "./MealPieChart";

type Props = {
  meal: Meal;
};

const UpdateMeal = ({ meal }: Props) => {
  const [name, setName] = useState(meal.name);
  const [status, setStatus] = useState(meal.type as string);
  const [protein, setProtein] = useState(meal.protein.toString());
  const [calories, setCalories] = useState(meal.calories.toString());
  const [carbs, setCarbs] = useState(meal.carbs.toString());
  const [fat, setFat] = useState(meal.fat.toString());
  const { meals, setMeals } = useGlobalContext();

  const { toast } = useToast();

  const handleUpdate = async (id: number) => {
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
    toast({
      title: "Meal updated successfully!",
    });
  };

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
    toast({
      title: "Meal deleted successfully!",
    });
  };

  const data = [
    { name: "Protein", value: parseInt(protein) },
    { name: "Carbs", value: parseInt(carbs) },
    { name: "Fat", value: parseInt(fat) },
  ];

  return (
    <div>
      <MealPieChart data={data} />
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="meal" className="text-left text-black mb-0.25">
            Name
          </Label>
          <Input
            id="meal"
            value={name}
            className="col-span-1 text-black"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center gap-4 mb-4">
        <div className="flex flex-col col-span-2 gap-2">
          <Label htmlFor="calories" className="text-left text-black mb-0.25">
            Calories
          </Label>
          <Input
            id="calories"
            value={calories}
            className="col-span-2 text-black"
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <Label htmlFor="status" className="text-left text-black mb-0.25">
            Status
          </Label>
          <Select onValueChange={setStatus} defaultValue={status || undefined}>
            <SelectTrigger className="text-black">
              <SelectValue placeholder="Type" className="text-black" />
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
          <Label htmlFor="protein" className="text-left text-black mb-0.25">
            Protein
          </Label>
          <Input
            id="protein"
            value={protein}
            className="col-span-1 text-black"
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="carbs" className="text-left text-black mb-0.25">
            Carbs
          </Label>
          <Input
            id="carbs"
            value={carbs}
            className="col-span-1 text-black"
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fat" className="text-left text-black mb-0.25">
            Fat
          </Label>
          <Input
            id="fat"
            value={fat}
            className="col-span-1 text-black"
            onChange={(e) => setFat(e.target.value)}
          />
        </div>
      </div>
      {/* </div> */}
      <DialogFooter>
        <div className="w-full flex justify-between items-center">
          <DialogClose>
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => {
                handleDelete(meal.id);
              }}
              className="bg-red-400"
            >
              Delete
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              type="submit"
              onClick={() => {
                handleUpdate(meal.id);
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </div>
  );
};

export default UpdateMeal;
