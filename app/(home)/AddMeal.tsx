import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useGlobalContext } from "../Context/store";

import { useToast } from "@/components/ui/use-toast";
import MealPieChart from "../(shared)/MealPieChart";

type Props = {};

const AddMeal = (props: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const { selectedDate, setMeals } = useGlobalContext();

  const { toast } = useToast();

  const handleSubmit = async () => {
    const response = await fetch(`/api/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        type: status,
        calories: parseInt(calories),
        protein: parseInt(protein),
        day: selectedDate,
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
    setMeals((meals) => [...meals, data]);
    toast({
      title: "Meal added successfully!",
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const data = [
    { name: "Protein", value: parseInt(protein, 10) || 1 },
    { name: "Carbs", value: parseInt(carbs, 10) || 1 },
    { name: "Fat", value: parseInt(fat, 10) || 1 },
  ];

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Add Meal</Button> */}
          <div
            className="h-9 w-9 bg-[#a8bbd1] rounded-xl flex justify-center items-center 
                  hover:bg-gray-200 hover:text-foreground cursor-pointer"
          >
            <BsPlus size={24} className="text-gray-200 hover:text-black" />
          </div>
          {/* <h1 className="text-gray-200 hover:text-white text-sm cursor-pointer">
                    Add Meal
                  </h1> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black">Add Meal</DialogTitle>
            <DialogDescription className="text-black">
              Add a meal here. Click save to log the meal.
            </DialogDescription>
          </DialogHeader>
          <MealPieChart data={data} />
          <div>
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
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="flex flex-col col-span-2 gap-2">
              <Label
                htmlFor="calories"
                className="text-left text-black mb-0.25"
              >
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
              <Select onValueChange={setStatus} defaultValue={status}>
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
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="protein"
                className="text-left text-black mb-0.25 flex items-center justify-between"
              >
                Protein
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-lg h-3 w-3 bg-[#FF7C46]"></span>
                </span>
              </Label>

              <Input
                id="protein"
                value={protein}
                className="col-span-1 text-black"
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="carbs"
                className="text-left text-black mb-0.25 flex items-center justify-between"
              >
                Carbs
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-lg h-3 w-3 bg-[#F95D67]"></span>
                </span>
              </Label>
              <Input
                id="carbs"
                value={carbs}
                className="col-span-1 text-black"
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="fat"
                className="text-left text-black mb-0.25 flex items-center justify-between"
              >
                Fat
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-lg h-3 w-3 bg-[#D45088]"></span>
                </span>
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
            <DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Add Meal
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMeal;
