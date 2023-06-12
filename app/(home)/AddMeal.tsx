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
import { TbBoxMultiple } from "react-icons/tb";
import { useGlobalContext } from "../Context/store";

import { useToast } from "@/components/ui/use-toast";
import MealPieChart from "../(shared)/MealPieChart";
import AddMealSearch from "./AddMealSearch";

type Props = {};

const AddMeal = (props: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const { selectedDate, setMeals } = useGlobalContext();

  const [collapsed, setCollapsed] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    setName("");
    setStatus("");
    setProtein("");
    setCalories("");
    setCarbs("");
    setFat("");
    setCollapsed(true);
  }, []);

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
            className="h-8 w-8 rounded-xl flex justify-center items-center 
                  hover:bg-[#a8bbd1] hover:text-foreground cursor-pointer group"
          >
            <TbBoxMultiple
              size={16}
              className="text-gray-200 group-hover:text-black"
            />
          </div>
          {/* <h1 className="text-gray-200 hover:text-white text-sm cursor-pointer">
                    Add Meal
                  </h1> */}
        </DialogTrigger>
        <DialogContent
          className={`${
            collapsed ? "sm:max-w-[425px]" : "sm:max-w-[850px] grid grid-cols-2"
          } duration-500`}
        >
          <div className={`${collapsed ? "col-span-2" : "col-span-1"}`}>
            <DialogHeader>
              <DialogTitle className="text-black">Add Meal</DialogTitle>
              {/* <DialogDescription className="text-black">
                Add a meal here. Click save to log the meal.
              </DialogDescription> */}
            </DialogHeader>
            <MealPieChart data={data} />
            <div className="mb-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  {" "}
                  <Label
                    htmlFor="meal"
                    className="text-left text-black mb-0.25"
                  >
                    Name
                  </Label>
                  <Label
                    className="text-right text-black mb-0.25 hover:text-blue-400"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    {collapsed ? "Search for a food" : "Enter Manually"}
                  </Label>
                </div>

                <Input
                  id="meal"
                  value={name}
                  className="col-span-1 text-black"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 mb-2">
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
                <Label
                  htmlFor="status"
                  className="text-left text-black mb-0.25"
                >
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
            <div className="grid grid-cols-3 items-center gap-4 mb-2">
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
          </div>
          <div
            className={`${
              collapsed
                ? "hidden"
                : " duration-500 col-span-1 slide-in-from-left"
            }`}
          >
            <AddMealSearch
              setName={setName}
              setCalories={setCalories}
              setProtein={setProtein}
              setCarbs={setCarbs}
              setFat={setFat}
              setCollapsed={setCollapsed}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMeal;
