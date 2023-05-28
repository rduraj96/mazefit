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
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useGlobalContext } from "../Context/store";

type Props = {};

const AddMeal = (props: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const { selectedDate, setMeals } = useGlobalContext();

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
        day: new Date(selectedDate),
        carbs: 40,
        fat: 15,
      }),
    });

    const data = await response.json();
    console.log(data);

    setName("");
    setStatus("");
    setProtein("");
    setCalories("");
    setMeals((meals) => [...meals, data]);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Add Meal</Button> */}
          <div
            className="h-9 w-9 bg-foreground rounded-xl flex justify-center items-center 
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
            <DialogTitle>Add Meal</DialogTitle>
            <DialogDescription>
              Add a meal here. Click save changes to log the meal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-white">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Status
              </Label>
              <Select onValueChange={setStatus} defaultValue={status}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                </SelectContent>
              </Select>
              {/* <Input
                id="status"
                value={status}
                className="col-span-3"
                onChange={(e) => setStatus(e.target.value)}
              /> */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Meal
              </Label>
              <Input
                id="meal"
                value={name}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Protein
              </Label>
              <Input
                id="protein"
                value={protein}
                className="col-span-3"
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Calories
              </Label>
              <Input
                id="calories"
                value={calories}
                className="col-span-3"
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMeal;
