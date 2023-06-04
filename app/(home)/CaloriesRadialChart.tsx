import React from "react";
import { useGlobalContext } from "../Context/store";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
  Cell,
  Tooltip,
} from "recharts";
import { Macros } from "../types";
import { getPercentage } from "@/lib/utils";
import CustomTooltip from "../(shared)/CustomTooltip";

type Props = {
  macros: Macros;
};

const CaloriesRadialChart = ({ macros }: Props) => {
  const { macroGoals } = useGlobalContext();
  const duration = 1000;
  const data = [
    {
      name: "Fat",
      uv: getPercentage(macros.fat, macroGoals.fat),
      pv: macros.fat,
      fill: "#D45088",
    },
    {
      name: "Carbs",
      uv: getPercentage(macros.carbs, macroGoals.carbs),
      pv: macros.carbs,
      fill: "#F95D67",
    },
    {
      name: "Protein",
      uv: getPercentage(macros.protein, macroGoals.protein),
      pv: macros.protein,
      fill: "#FF7C46",
    },
    {
      name: "Calories",
      uv: getPercentage(macros.calories, macroGoals.calories),
      pv: macros.calories,
      fill: "#FFA600",
    },
  ];

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "30px",
    padding: 5,
    gapy: 10,
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="25%"
        outerRadius="110%"
        barSize={20}
        data={data}
        barCategoryGap="60%"
        // startAngle={135}
        // endAngle={-135}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          dataKey="uv"
          // fill="#0BEFF2"
          background={{ fill: "#1B1B1B" }}
          cornerRadius={10}
          animationDuration={duration}
        />

        {/* <Legend
          iconSize={6}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          fontSize={16}
        /> */}
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default CaloriesRadialChart;
