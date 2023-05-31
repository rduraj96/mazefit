import React from "react";
import { useGlobalContext } from "../Context/store";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { Macros } from "../types";
import { getPercentage } from "@/lib/utils";

type Props = {
  macros: Macros;
};

const CaloriesRadialChart = ({ macros }: Props) => {
  const { calories } = useGlobalContext();
  const data = [
    {
      name: "Fat",
      uv: getPercentage(macros.fat, calories, 9),
      pv: macros.fat,
      fill: "#F46082",
    },
    {
      name: "Carbs",
      uv: getPercentage(macros.carbs, calories, 4),
      pv: macros.carbs,
      fill: "#867BFC",
    },
    {
      name: "Protein",
      uv: getPercentage(macros.protein, calories, 4),
      pv: macros.protein,
      fill: "#51D8D8",
    },
    {
      name: "Calories",
      uv: (macros.calories * 100) / calories,
      pv: macros.calories,
      fill: "#F97A4D",
    },
  ];

  console.log(data);

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
    padding: 5,
    gapy: 10,
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="25%"
        cy="50%"
        innerRadius="25%"
        outerRadius="110%"
        barSize={13}
        data={data}
        barCategoryGap="60%"
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar dataKey="uv" background={{ fill: "gray" }} />
        <Legend
          iconSize={6}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          style={{
            fontWeight: "bold",
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default CaloriesRadialChart;
