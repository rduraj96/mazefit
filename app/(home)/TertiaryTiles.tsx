import React from "react";

type Props = {};

const TertiaryTiles = (props: Props) => {
  return (
    <section className="px-7 mt-10">
      <div className="flex justify-between h-72 gap-x-7">
        <div className="basis-1/2 bg-[#1b1b1b] rounded-3xl"></div>
        <div className="basis-1/2 bg-[#1b1b1b] rounded-3xl"></div>
      </div>
    </section>
  );
};

export default TertiaryTiles;
