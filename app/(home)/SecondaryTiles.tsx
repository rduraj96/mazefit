import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type Props = {};

const SecondaryTiles = (props: Props) => {
  return (
    <section className="px-7 mt-10">
      {/* <div className="text-white font-semibold pb-5 text-lg">
        Suggested Meals
      </div> */}
      <div className="flex justify-between h-28 gap-x-7">
        <div className="basis-1/4 transition bg-[#1b1b1b] hover:bg-[#F46082] ease-in-out hover:transition-all hover:translate-y-1 hover:scale-100 rounded-3xl duration-300">
          <div className="flex items-center justify-start gap-4 h-full w-full px-6">
            <Avatar className="rounded-xl aspect-auto h-14 w-14">
              <AvatarImage src="https://thecozycook.com/wp-content/uploads/2022/08/Chicken-Parmesan-Recipe-1.jpg" />
              <AvatarFallback>Food</AvatarFallback>
            </Avatar>
            <h1 className="text-gray-300 font-bold text-lg">Chicken Parm</h1>
          </div>
        </div>
        <div className="basis-1/4 bg-[#1b1b1b] hover:bg-[#F46082] rounded-3xl">
          <div className="flex items-center justify-start gap-4 h-full w-full px-6">
            <Avatar className="rounded-xl aspect-auto h-14 w-14">
              <AvatarImage src="https://assets.bonappetit.com/photos/624f3dc73a6e981591892a9d/1:1/w_2240,c_limit/0407-bibimbap-at-home-lede.jpg" />
              <AvatarFallback>Food</AvatarFallback>
            </Avatar>
            <h1 className="text-gray-300 font-bold text-lg">Bibimbap</h1>
          </div>
        </div>
        <div className="basis-1/4 bg-[#1b1b1b] hover:bg-[#F46082] rounded-3xl">
          <div className="flex items-center justify-start gap-4 h-full w-full px-6">
            <Avatar className="rounded-xl aspect-auto h-14 w-14">
              <AvatarImage src="https://natashaskitchen.com/wp-content/uploads/2023/02/Penne-alla-Vodka-SQ.jpg" />
              <AvatarFallback>Food</AvatarFallback>
            </Avatar>
            <h1 className="text-gray-300 font-bold text-lg">
              Penne Alla Vodka
            </h1>
          </div>
        </div>
        <div className="basis-1/4 bg-[#1b1b1b] hover:bg-[#F46082] rounded-3xl">
          <div className="flex items-center justify-start gap-4 h-full w-full px-6">
            <Avatar className="rounded-xl aspect-auto h-14 w-14">
              <AvatarImage src="https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/02/how-to-cook-steak-1061w.jpg" />
              <AvatarFallback>Food</AvatarFallback>
            </Avatar>
            <h1 className="text-gray-300 font-bold text-lg">Steak</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryTiles;
