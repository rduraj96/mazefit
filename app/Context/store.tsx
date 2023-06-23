"use client";

// import { Meal } from "@prisma/client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ActivityData, Macros, Meal, Supplements, UserDetails } from "../types";

interface ContextProps {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  meals: Meal[];
  setMeals: Dispatch<SetStateAction<Meal[]>>;
  activityData: ActivityData[];
  setActivityData: Dispatch<SetStateAction<ActivityData[]>>;
  macroGoals: Macros;
  setMacroGoals: Dispatch<SetStateAction<Macros>>;
  supplements: Supplements[];
  setSupplements: Dispatch<SetStateAction<Supplements[]>>;
  profileClicked: Boolean;
  setProfileClicked: Dispatch<SetStateAction<Boolean>>;
  userDetails: UserDetails;
  setUserDetails: Dispatch<SetStateAction<UserDetails>>;
  loading: Boolean;
  setLoading: Dispatch<SetStateAction<Boolean>>;
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
  supplements: [],
  setSupplements: () => {},
  profileClicked: true,
  setProfileClicked: () => {},
  userDetails: {
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    activityLevel: "",
  },
  setUserDetails: () => {},
  loading: false,
  setLoading: () => {},
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
  const [supplements, setSupplements] = useState<Supplements[] | []>([]);
  const [profileClicked, setProfileClicked] = useState<Boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    activityLevel: "",
  });
  const [loading, setLoading] = useState<Boolean>(false);

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
        supplements,
        setSupplements,
        userDetails,
        setUserDetails,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
