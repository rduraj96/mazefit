"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  RiHomeSmile2Fill,
  RiUser3Fill,
  RiMessage3Fill,
  RiPieChartFill,
  RiSettings3Fill,
  RiHeart3Fill,
} from "react-icons/ri";
import { IoLogOut, IoBarbell } from "react-icons/io5";
import Image from "next/image";
import Logo from "../../public/assets/logo3.png";
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

type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const menus = [
    { name: "Dashboard", link: "/", icon: RiHomeSmile2Fill },
    { name: "Profile", link: "/profile", icon: RiUser3Fill },
    { name: "Workouts", link: "/", icon: IoBarbell },
    { name: "Analytics", link: "/", icon: RiPieChartFill },
    { name: "Saved", link: "/", icon: RiHeart3Fill },
    { name: "Settings", link: "/", icon: RiSettings3Fill },
    // { name: "Log Out", link: "/", icon: IoLogOut, auth: true },
  ];

  return (
    <section className="flex gap-6">
      <div
        className={`${
          open ? "w-72" : "w-16"
        } duration-500  min-h-screen bg-foreground text-gray-400 px-4 rounded-r-3xl flex flex-col justify-between shadow-md`}
      >
        <div className="mt-10 flex justify-center">
          <Image
            alt="logo"
            src={Logo}
            width={48}
            height={48}
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
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
              className={`group flex ${
                open && "w-2/3"
              } items-center text-sm gap-3.5 font-medium py-1 px-0.5 hover:bg-[#51d8d8] hover:text-black rounded-md selected:bg-[#51d8d8]`}
            >
              <div>{React.createElement(menu?.icon, { size: "30" })}</div>
              <h2
                style={
                  {
                    // transitionDelay: `${i + 3}00ms`,
                  }
                }
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={` ${
                  open && "hidden"
                } absolute z-10 left-48 bg-foreground font-semibold whitespace-pre text-gray-300 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
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
              <div>{React.createElement(IoLogOut, { size: "26" })}</div>
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
                } absolute z-10 left-48 bg-foreground font-semibold whitespace-pre text-gray-300 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Log Out
              </h2>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-foreground border-0">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-100">
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-gray-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-gray-200 text-black hover:bg-red-400 hover:text-gray-200"
                  onClick={() => signOut()}
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
