import React from "react";
import { PieChart, Pie, Cell } from "recharts";

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

const MealPieChart = ({ data }: Props) => {
  const COLORS = [
    "hsl(var(--protein))",
    "hsl(var(--carbs))",
    "hsl(var(--fat))",
  ];
  return (
    <div className="h-48 w-full flex items-center justify-center">
      <PieChart width={200} height={175}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={""}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default MealPieChart;
