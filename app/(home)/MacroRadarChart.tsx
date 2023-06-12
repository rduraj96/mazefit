import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useGlobalContext } from "../Context/store";

type Props = {};

type Supplement = {
  name: string;
  taken: number;
  fullMark: number;
};

const MacroRadarChart = (props: Props) => {
  const { selectedDate, supplements } = useGlobalContext();
  const [chartData, setChartData] = useState<Supplement[]>([]);

  useEffect(() => {
    const transformArray = supplements.map((supplement) => {
      return {
        name: supplement.name,
        taken:
          supplement.supplementLogs &&
          supplement.supplementLogs[0] &&
          supplement.supplementLogs[0].isTaken
            ? 1
            : 0,
        fullMark: 1,
      };
    });

    setChartData(transformArray);
  }, [supplements, selectedDate]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" style={{ fontSize: "10px" }} />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 1.5]}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="taken"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default MacroRadarChart;
