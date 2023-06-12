import AddMeal from "@/app/(home)/AddMeal";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SpeedDial = ({ children }: Props) => {
  return (
    <div data-dial-init className="flex group">
      <div
        id="speed-dial-menu-horizontal"
        className="group-hover:flex group-hover:items-center mr-4 hidden space-x-2 group-hover:transition-all"
      >
        {children}
      </div>
      <div
        data-dial-toggle="speed-dial-menu-horizontal"
        aria-controls="speed-dial-menu-horizontal"
        aria-expanded="false"
        className="flex items-center justify-center text-white bg-[#a8bbd1] rounded-xl w-9 h-9"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 transition-transform group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span className="sr-only">Open actions menu</span>
      </div>
    </div>
  );
};

export default SpeedDial;
