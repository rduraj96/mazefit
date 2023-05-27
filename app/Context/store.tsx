"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const today = new Date().toISOString().split("T")[0];

const GlobalContext = createContext<ContextProps>({
  selectedDate: today,
  setSelectedDate: (): string => "",
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <GlobalContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
