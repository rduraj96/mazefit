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
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  meals: Meal[];
  setMeals: Dispatch<SetStateAction<Meal[]>>;
  activityData: ActivityData[];
  setActivityData: Dispatch<SetStateAction<ActivityData[]>>;
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
  profileClicked: false,
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
  const [profileClicked, setProfileClicked] = useState<Boolean>(false);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
