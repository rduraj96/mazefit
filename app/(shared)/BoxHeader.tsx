import React from "react";

type Props = {
  children: React.ReactNode;
};

const BoxHeader = ({ children }: Props) => {
  return (
    <div className="mb-2">
      <h1 className="text-white p-2 font-semibold text-md">{children}</h1>
    </div>
  );
};

export default BoxHeader;
