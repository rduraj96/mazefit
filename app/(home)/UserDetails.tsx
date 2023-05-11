"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BsPlus, BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const UserDetails = (props: Props) => {
  const { data: session } = useSession();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="my-10 mr-7">
      <div className="relative bg-[#1b1b1b] px-7 py-5 rounded-3xl">
        <div className="flex justify-between items-center">
          <p className="text-gray-300 text-md font-bold">Profile</p>
          <div>
            <Dialog>
              <DialogTrigger>
                <div className="h-10 w-10 flex justify-center items-center cursor-pointer">
                  <BsThreeDots
                    size={20}
                    className="text-gray-200 hover:text-white"
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Why is this not rendering?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-center items-center">
            <Avatar className="rounded-full aspect-auto h-20 w-20">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" />
              <AvatarFallback>
                {session?.user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-gray-200 text-xl font-bold flex items-center justify-center mt-5">
            {session?.user?.name}
          </div>
          <div className="mt-8 flex justify-around text-gray-200 py-3 rounded-xl border-2 border-neutral-700">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="font-bold text-lg">189 lb</p>
              <p className="text-neutral-500">Weight</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="font-bold text-lg">6ft 0in</p>
              <p className="text-neutral-500">Height</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="font-bold text-lg">26</p>
              <p className="text-neutral-500">Age</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-gray-300 text-md font-bold">Calendar</p>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
