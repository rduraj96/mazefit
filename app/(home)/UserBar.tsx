"use client";

import React from "react";
import { IoLocationSharp, IoNotificationsOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDatePicker } from "./DatePicker";

type Props = {};

const UserBar = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div className="relative flex mt-10 mb-14">
      <div className="absolute left-7 py-2 flex items-center justify-center">
        <CalendarDatePicker />
      </div>

      <div className="absolute right-7 flex items-center justify-center py-2">
        <div className="flex items-center right-0 gap-x-3">
          <Popover>
            <PopoverTrigger>
              <div className="h-10 w-10 bg-foreground rounded-xl flex justify-center items-center">
                <IoNotificationsOutline size={18} className="text-gray-300" />
              </div>
            </PopoverTrigger>
            <PopoverContent>No new notifications.</PopoverContent>
          </Popover>
          <Avatar className="rounded-xl aspect-auto h-11 w-11">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" />
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
