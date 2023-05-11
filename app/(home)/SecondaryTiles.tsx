import React from "react";

type Props = {};

const SecondaryTiles = (props: Props) => {
  return (
    <section className="px-7">
      <div className="flex justify-between h-52 gap-x-7">
        <div className="basis-1/3 bg-[#1b1b1b] rounded-3xl"></div>
        <div className="basis-1/3 bg-[#1b1b1b] rounded-3xl"></div>
        <div className="basis-1/3 bg-[#1b1b1b] rounded-3xl"></div>
      </div>
    </section>
  );
};

export default SecondaryTiles;
