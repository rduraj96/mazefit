"use client";

// import { Meal } from "@prisma/client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ActivityData, Meal } from "../types";

interface ContextProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  meals: Meal[];
  setMeals: Dispatch<SetStateAction<Meal[]>>;
  activityData: ActivityData[];
  setActivityData: Dispatch<SetStateAction<ActivityData[]>>;
}

const today = new Date().toISOString().split("T")[0];

const GlobalContext = createContext<ContextProps>({
  selectedDate: today,
  setSelectedDate: (): string => "",
  meals: [],
  setMeals: (): Meal[] => [],
  activityData: [],
  setActivityData: (): ActivityData[] => [],
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [meals, setMeals] = useState<Meal[] | []>([]);
  const [activityData, setActivityData] = useState<ActivityData[] | []>([]);

  return (
    <GlobalContext.Provider
      value={{
        meals,
        setMeals,
        activityData,
        setActivityData,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
