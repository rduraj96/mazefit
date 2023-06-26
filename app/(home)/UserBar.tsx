"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDatePicker } from "./DatePicker";
import { useGlobalContext } from "../Context/store";
import ThemeToggle from "../(shared)/ThemeToggle";
import { Button } from "@/components/ui/button";
import { StickyNote, Gauge, Bell } from "lucide-react";

type Props = {};

const UserBar = (props: Props) => {
  const { data: session } = useSession();
  const { profileClicked, setProfileClicked, userDetails } = useGlobalContext();

  const handleClick = () => {
    setProfileClicked((prev) => !prev);
    console.log("Clicked!");
  };

  return (
    <div className="flex mt-10 h-fit justify-between mx-7 py-2 rounded-lg">
      <div className="left-7 py-2 flex items-center justify-center">
        <CalendarDatePicker />
      </div>

      <div className="right-7 flex items-center justify-center py-2">
        <div className="flex items-center right-0 gap-x-1">
          <ThemeToggle />
          <Button
            // className="h-10 w-10 rounded-xl flex justify-center items-center cursor-pointer bg-foreground"
            size={"icon"}
            variant={"ghost"}
            // style={{
            //   background: profileClicked ? "hsl(var(--accent))" : "",
            // }}
            onClick={handleClick}
          >
            {/* <GiStairsGoal size={20} /> */}
            <Gauge size={20} />
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button size={"icon"} variant={"ghost"}>
                <Bell
                  size={20}
                  // className="text-neutral-700"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent>No new notifications.</PopoverContent>
          </Popover>
          {/* <span className="absolute flex top-2 left-[30%] h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span> */}
          <Avatar
            className="aspect-auto h-10 w-10 cursor-pointer hidden sm:block ring ring-offset-1 ring-offset-background ring-alternate mx-2"
            onClick={handleClick}
          >
            <AvatarImage
              className=""
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            />
            <AvatarFallback>
              {session?.user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default UserBar;
