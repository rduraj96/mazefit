import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiOutlineSearch } from "react-icons/ai";
import React, { Dispatch, useEffect, useState } from "react";
import SearchFoodCard from "../(shared)/SearchFoodCard";
import { FoodItem, Macros, Measure } from "../types";
import Spinner from "@/components/Spinner";

type Props = {
  setName: Dispatch<React.SetStateAction<string>>;
  setCalories: Dispatch<React.SetStateAction<number>>;
  setProtein: Dispatch<React.SetStateAction<number>>;
  setCarbs: Dispatch<React.SetStateAction<number>>;
  setFat: Dispatch<React.SetStateAction<number>>;
  setCollapsed: Dispatch<React.SetStateAction<boolean>>;
  setServing: Dispatch<React.SetStateAction<string>>;
  setServingList: Dispatch<React.SetStateAction<Measure[]>>;
  setMacrosCoef: Dispatch<React.SetStateAction<Macros | null>>;
};

const AddMealSearch = ({
  setName,
  setCalories,
  setProtein,
  setCarbs,
  setFat,
  setCollapsed,
  setServing,
  setServingList,
  setMacrosCoef,
}: Props) => {
  const [searchFood, setSearchFood] = useState("");
  const [foodList, setFoodList] = useState<Array<FoodItem>>([]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [searching, setSearching] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  // const [macros, setMacros] = useState<Macros>();

  useEffect(() => {
    setFoodList([]);
    setSearchClicked(false);
    setSearching(false);
    setSearchFood("");
  }, [setCollapsed]);

  const handleSearch = async (viewMore?: string | null) => {
    if (!viewMore) {
      setFoodList([]);
    }
    setSearchClicked(true);
    try {
      setSearching(true);
      const response = await fetch(
        `/api/search?food=${searchFood}${
          viewMore ? "&session=" + viewMore : ""
        }`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const params = new URL(data._links.next.href).searchParams;
        const session = params.get("session");
        setNextPage(session);
        data.hints.forEach((item: any) => {
          setFoodList((foodList) => [
            ...foodList,
            {
              brand: item.food.brand,
              name: item.food.label,
              calories: Math.round(item.food.nutrients.ENERC_KCAL),
              protein: Math.round(item.food.nutrients.PROCNT),
              carbs: Math.round(item.food.nutrients.CHOCDF),
              fat: Math.round(item.food.nutrients.FAT),
              serving: item.measures[0].label,
              nutrients: {
                foodId: item.food.foodId,
                measureUri: item.measures[0].uri,
              },
              measures: item.measures,
            },
          ]);
          console.log(item.measures.label);
        });
        setSearching(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNutritionSearch = async (food: FoodItem) => {
    try {
      const response = await fetch(`/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: [
            {
              quantity: 1,
              measureURI: food.nutrients.measureUri,
              foodId: food.nutrients.foodId,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Food Nutrients: ", data);
        const weight = food.measures[0].weight;
        setMacrosCoef({
          calories: data.calories / weight,
          protein: data.protein / weight,
          carbs: data.carbs / weight,
          fat: data.fat / weight,
        });
        setName(food.name);
        setCalories(data.calories);
        setProtein(data.protein);
        setCarbs(data.carbs);
        setFat(data.fat);
        setServing(food.measures[0].label);
        setServingList(food.measures);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center justify-between g-3">
        <Input
          id="name"
          value={searchFood}
          placeholder="Search for a food"
          className="col-span-1 text-black flex-grow"
          onChange={(e) => setSearchFood(e.target.value)}
        />
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => handleSearch()}
        >
          <AiOutlineSearch className="text-black" size={20} />
        </div>
      </div>
      {searchClicked && (
        <div className="w-full h-10 pt-2">
          <div className="flex items-center h-full">
            {searching ? (
              <div className="flex items-center gap-3">
                <p className="text-md text-black font-bold">Searching</p>
                <Spinner />
              </div>
            ) : (
              <div className="text-md text-black font-bold">Search Results</div>
            )}
          </div>
        </div>
      )}

      <ScrollArea className="mt-2 pr-3 h-96">
        {foodList.map((food, index) => (
          <div key={index} onClick={() => handleNutritionSearch(food)}>
            <SearchFoodCard food={food} />
          </div>
        ))}
        {foodList.length != 0 && (
          <p
            className="w-full h-2 text-center text-white hover:text-blue-400 text-sm cursor-pointer"
            onClick={() => handleSearch(nextPage)}
          >
            Load More
          </p>
        )}
      </ScrollArea>
    </div>
  );
};

export default AddMealSearch;
