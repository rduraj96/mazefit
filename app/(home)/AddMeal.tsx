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
import { Macros, Measure } from "../types";
import { Loader2 } from "lucide-react";

type Props = {};

const AddMeal = (props: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [protein, setProtein] = useState(0);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [macrosCoef, setMacrosCoef] = useState<Macros | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [serving, setServing] = useState("");
  const [servingList, setServingList] = useState<Array<Measure>>([]);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);

  const { selectedDate, setMeals } = useGlobalContext();

  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          type: status,
          calories: calories,
          protein: protein,
          day: selectedDate,
          carbs: carbs,
          fat: fat,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        handleDefaults();
        setMeals((meals) => [...meals, data]);
        setLoading(false);
        toast({
          title: "Meal added successfully!",
          // description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDefaults = () => {
    setOpen(false);
    setName("");
    setStatus("");
    setProtein(0);
    setCalories(0);
    setCarbs(0);
    setFat(0);
    setQuantity(1);
    setServing("");
    setServingList([]);
    setCollapsed(true);
  };

  const handleUpdateMacros = () => {
    const currentServing = servingList.filter((item) => item.label === serving);
    const weight = currentServing[0]?.weight;
    setCalories(Math.round(quantity * macrosCoef!.calories * weight));
    setProtein(Math.round(quantity * macrosCoef!.protein * weight));
    setCarbs(Math.round(quantity * macrosCoef!.carbs * weight));
    setFat(Math.round(quantity * macrosCoef!.fat * weight));
  };

  const data = [
    { name: "Protein", value: protein || 1 },
    { name: "Carbs", value: carbs || 1 },
    { name: "Fat", value: fat || 1 },
  ];

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Add Meal</Button> */}
          <div
            className="h-10 w-10 rounded-xl flex justify-center items-center 
                  hover:bg-[#a8bbd1] hover:text-foreground cursor-pointer group"
            onClick={() => handleDefaults}
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
            collapsed
              ? "sm:max-w-[425px]"
              : "sm:max-w-[850px] grid grid-cols-2 transition-all slide-in-from-left-0"
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
            <div className="grid grid-cols-3 items-center gap-4 mb-2">
              <div className="flex flex-col col-span-1 gap-2">
                <Label
                  htmlFor="status"
                  className="text-left text-black mb-0.25"
                >
                  Status
                </Label>
                <Select
                  onValueChange={setStatus}
                  defaultValue={status}
                  // value={servingList[0].label || undefined}
                >
                  <SelectTrigger className="text-black">
                    <SelectValue placeholder="Serving" className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <div className="flex justify-between items-center mb-0.25">
                  <Label htmlFor="meal" className="text-left text-black">
                    Name
                  </Label>
                  <Label
                    className="text-right text-black hover:text-blue-400"
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
            <div className="grid grid-cols-6 items-center gap-4 mb-2">
              <div className="flex flex-col col-span-3 gap-2">
                <Label
                  htmlFor="calories"
                  className="text-left text-black mb-0.25"
                >
                  Calories
                </Label>
                <Input
                  id="calories"
                  value={calories}
                  type="number"
                  className="col-span-2 text-black"
                  onChange={(e) => setCalories(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col col-span-1 gap-2">
                <Label
                  htmlFor="quantity"
                  className="text-left text-black mb-0.25"
                >
                  Qty
                </Label>
                <Input
                  id="quantity"
                  value={quantity}
                  className="col-span-2 text-black"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  onBlur={handleUpdateMacros}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <Label
                  htmlFor="serving"
                  className="text-left text-black mb-0.25"
                >
                  Serving
                </Label>
                <Select onValueChange={setServing} value={serving}>
                  <SelectTrigger className="text-black">
                    <SelectValue placeholder="Serving" className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    {servingList &&
                      servingList.map((serving, index) => (
                        <SelectItem key={index} value={serving.label}>
                          {serving.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 mb-5">
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
                  type="number"
                  className="col-span-1 text-black"
                  onChange={(e) => setProtein(Number(e.target.value))}
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
                  type="number"
                  className="col-span-1 text-black"
                  onChange={(e) => setCarbs(Number(e.target.value))}
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
                  type="number"
                  className="col-span-1 text-black"
                  onChange={(e) => setFat(Number(e.target.value))}
                />
              </div>
            </div>
            {/* </div> */}
            <DialogFooter className="sm:items-center sm:justify-center">
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit().then(() => handleDefaults());
                }}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Meal
              </Button>
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
              setServing={setServing}
              setServingList={setServingList}
              setMacrosCoef={setMacrosCoef}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMeal;
