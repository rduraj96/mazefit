"use client";

// import { Meal } from "@prisma/client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ActivityData, Macros, Meal } from "../types";

interface ContextProps {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  meals: Meal[];
  setMeals: Dispatch<SetStateAction<Meal[]>>;
  activityData: ActivityData[];
  setActivityData: Dispatch<SetStateAction<ActivityData[]>>;
  macroGoals: Macros;
  setMacroGoals: Dispatch<SetStateAction<Macros>>;
  profileClicked: Boolean;
  setProfileClicked: Dispatch<SetStateAction<Boolean>>;
}

// const today = new Date().toISOString().split("T")[0];

const GlobalContext = createContext<ContextProps>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
  meals: [],
  setMeals: (): Meal[] => [],
  activityData: [],
  setActivityData: (): ActivityData[] => [],
  macroGoals: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  setMacroGoals: () => undefined,
  profileClicked: true,
  setProfileClicked: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [meals, setMeals] = useState<Meal[] | []>([]);
  const [activityData, setActivityData] = useState<ActivityData[] | []>([]);
  const [macroGoals, setMacroGoals] = useState<Macros>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [profileClicked, setProfileClicked] = useState<Boolean>(true);

  return (
    <GlobalContext.Provider
      value={{
        meals,
        setMeals,
        activityData,
        setActivityData,
        selectedDate,
        setSelectedDate,
        profileClicked,
        setProfileClicked,
        macroGoals,
        setMacroGoals,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
