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
import React, { FormEvent, useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { useToast } from "@/components/ui/use-toast";
import MealPieChart from "../(shared)/MealPieChart";
import AddMealSearch from "./AddMealSearch";
import { Macros, Measure } from "../types";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const AddMeal = (props: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Breakfast");
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
  const [tab, setTab] = useState("manual");

  const { selectedDate, setMeals } = useGlobalContext();

  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    setOpen((prev) => !prev);
    setName("");
    setStatus("Breakfast");
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
    if (servingList.length > 0) {
      const currentServing = servingList.filter(
        (item) => item.label === serving
      );
      const weight = currentServing[0]?.weight || 1;
      setCalories(Math.round(quantity * macrosCoef!.calories * weight));
      setProtein(Math.round(quantity * macrosCoef!.protein * weight));
      setCarbs(Math.round(quantity * macrosCoef!.carbs * weight));
      setFat(Math.round(quantity * macrosCoef!.fat * weight));
    } else {
      setCalories((prev) => prev * quantity);
      setProtein((prev) => prev * quantity);
      setCarbs((prev) => prev * quantity);
      setFat((prev) => prev * quantity);
    }
  };

  const data = [
    { name: "Protein", value: protein || 1 },
    { name: "Carbs", value: carbs || 1 },
    { name: "Fat", value: fat || 1 },
  ];

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={() => {
          // console.log(open)
          // setOpen(!open),
          handleDefaults();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="group p-2">
            Add Meal
          </Button>
        </DialogTrigger>
        <DialogContent>
          {/* <DialogHeader> */}
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="flex flex-col items-center justify-center"
          >
            <DialogHeader className="flex justify-center">
              <TabsList className="bg-transparent border w-fit">
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="favorite">Favorites</TabsTrigger>
              </TabsList>
            </DialogHeader>
            <TabsContent value="manual">
              <MealPieChart data={data} />
              <form id="meal-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  <div className="flex flex-col col-span-1 gap-2">
                    <Label htmlFor="status" className="text-left mb-0.25">
                      Status
                    </Label>
                    <Select onValueChange={setStatus} value={status} required>
                      <SelectTrigger className="">
                        <SelectValue
                          // placeholder="Serving"
                          className=""
                        />
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
                      <Label htmlFor="meal" className="text-left">
                        Name
                      </Label>
                    </div>
                    <Input
                      id="meal"
                      value={name}
                      className="col-span-1  "
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 items-center gap-4 mb-4">
                  <div className="flex flex-col col-span-3 gap-2">
                    <Label htmlFor="calories" className="text-left   mb-0.25">
                      Calories
                    </Label>
                    <Input
                      id="calories"
                      value={calories}
                      type="number"
                      className="col-span-2  "
                      onChange={(e) => setCalories(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="flex flex-col col-span-1 gap-2">
                    <Label htmlFor="quantity" className="text-left   mb-0.25">
                      Qty
                    </Label>
                    <Input
                      id="quantity"
                      value={quantity}
                      className="col-span-2  "
                      onChange={(e) => {
                        setQuantity(Number(e.target.value));
                      }}
                      required
                      onBlur={handleUpdateMacros}
                      // disabled={collapsed}
                    />
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <Label htmlFor="serving" className="text-left   mb-0.25">
                      Serving
                    </Label>
                    <Select
                      onValueChange={setServing}
                      value={serving}
                      onOpenChange={handleUpdateMacros}
                      // disabled={collapsed}
                    >
                      <SelectTrigger className=" ">
                        <SelectValue placeholder="Serving" className=" " />
                      </SelectTrigger>
                      <SelectContent position="popper">
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
                      className="text-left   mb-0.25 flex items-center justify-between"
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
                      className="col-span-1  "
                      onChange={(e) => setProtein(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="carbs"
                      className="text-left   mb-0.25 flex items-center justify-between"
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
                      className="col-span-1  "
                      onChange={(e) => setCarbs(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="fat"
                      className="text-left   mb-0.25 flex items-center justify-between"
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
                      className="col-span-1  "
                      onChange={(e) => setFat(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </form>
              {/* </div> */}
              <DialogFooter className="sm:items-center sm:justify-center">
                <Button
                  type="submit"
                  form="meal-form"
                  // onClick={() => {
                  //   handleSubmit().then(() => handleDefaults());
                  // }}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Meal
                </Button>
              </DialogFooter>{" "}
            </TabsContent>
            <TabsContent value="search" className="w-full">
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
                setTab={setTab}
              />
            </TabsContent>
          </Tabs>
          {/* </DialogHeader> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMeal;
