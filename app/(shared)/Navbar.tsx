"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/assets/5.svg";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert/alert-dialog";
import { usePathname } from "next/navigation";
import {
  Dumbbell,
  Heart,
  Home,
  LineChart,
  LogOut,
  PieChart,
  Settings,
  User,
} from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const menus = [
    { name: "Dashboard", link: "/", icon: Home },
    { name: "Profile", link: "/profile", icon: User },
    // { name: "Workouts", link: "/", icon: Dumbbell },
    { name: "Analytics", link: "/analytics", icon: LineChart },
    { name: "Saved", link: "/saved", icon: Heart },
    { name: "Settings", link: "/", icon: Settings },
    // { name: "Log Out", link: "/", icon: IoLogOut, auth: true },
  ];
  const COLORS = ["FFA600", "F6951B", "EE8436", "E57252", "DD616D", "D45088"];
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/getting-started"
  ) {
    return <></>;
  }

  return (
    <aside className="z-40 h-screen sticky sm:flex hidden top-0 gap-6 border">
      <div
        className={`${open ? "w-72" : "w-16"} 
        duration-500  min-h-screen bg-card text-muted-foreground px-4 rounded-r-lg flex flex-col justify-between shadow-lg`}
      >
        <div className="mt-10 flex justify-center">
          <Image
            alt="logo"
            src={Logo}
            width={48}
            height={48}
            onClick={() => setOpen(!open)}
            className="cursor-pointe hover:animate-pulse"
          />
        </div>
        <div
          className={`mt-14 flex flex-col ${
            open && "items-center"
          } gap-6 relative`}
        >
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              onClick={() => {
                setIndex(i);
              }}
              className={`group flex ${open && "w-2/3"} ${
                index === i && `bg-[#F6951B] text-black`
              } items-center text-sm gap-3.5 font-medium py-1 px-0.5 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "26" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={` ${
                  open && "hidden"
                } absolute z-0 left-48 bg-card font-semibold whitespace-pre text-card-foreground rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className={`my-14 flex flex-col ${open && "items-center"} gap-6`}>
          <AlertDialog>
            <AlertDialogTrigger
              className={`group ${
                open && "w-2/3"
              } flex gap-3.5 items-center font-medium text-sm p-1 hover:text-red-400 cursor-pointer`}
            >
              <div>{React.createElement(LogOut, { size: "26" })}</div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Log Out
              </h2>
              <h2
                className={` ${
                  open && "hidden"
                } absolute z-10 left-48 bg-card font-semibold whitespace-pre text-card-foreground rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Log Out
              </h2>
            </AlertDialogTrigger>
            <AlertDialogContent className="">
              <AlertDialogHeader>
                <AlertDialogTitle className="">
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  // className="bg-gray-200 text-black hover:bg-red-400 hover:text-gray-200"
                  onClick={() => signOut()}
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
