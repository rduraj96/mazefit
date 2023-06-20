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
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "../Context/store";

type Props = {};

const UserDetails = (props: Props) => {
  const { data: session } = useSession();
  const { userDetails } = useGlobalContext();

  return (
    <section className="h-fit w-full pt-5 mr-7">
      <div className="relative bg-foreground h-full shadow-md px-7 py-5 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-black text-lg font-bold">Profile</p>
          <div>
            <Dialog>
              <DialogTrigger>
                <div className="h-10 w-10 flex justify-center items-center cursor-pointer">
                  <BsThreeDots size={20} className="text-black" />
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
          <div className="text-black text-xl font-bold flex items-center justify-center mt-5">
            {session?.user?.name}
          </div>
          <div className="mt-8 flex text-sm justify-around text-neutral-600 py-3 rounded-xl bg-[#a8bbd1] shadow-md">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="font-semibold text-lg text-gray-100">
                {userDetails.weight} lb
              </p>
              <p>Weight</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="font-semibold text-lg text-gray-100">
                {Math.floor(userDetails.height / 12)}ft{" "}
                {userDetails.height % 12}in
              </p>
              <p>Height</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="font-semibold text-lg text-gray-100">
                {userDetails.age}
              </p>
              <p>Age</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-black text-md font-bold">Goals</p>
          {/* <WeightChart data={data} /> */}
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
