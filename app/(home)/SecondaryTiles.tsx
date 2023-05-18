import React from "react";

type Props = {};

const SecondaryTiles = (props: Props) => {
  return (
    <section className="px-7 mt-10">
      <div className="text-white font-semibold pb-5 text-lg">
        Suggested Meals
      </div>
      <div className="flex justify-between h-28 gap-x-7">
        <div className="basis-1/4 bg-[#1b1b1b] rounded-3xl"></div>
        <div className="basis-1/4 bg-[#1b1b1b] rounded-3xl"></div>
        <div className="basis-1/4 bg-[#1b1b1b] rounded-3xl"></div>
        <div className="basis-1/4 bg-[#1b1b1b] rounded-3xl"></div>
      </div>
    </section>
  );
};

export default SecondaryTiles;
