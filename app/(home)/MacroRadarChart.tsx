import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { dateToString } from "@/lib/utils";
import { JournalLog } from "@prisma/client";
import { Loader, Loader2 } from "lucide-react";
import LoadingSpinner from "../(shared)/LoadingSpinner";
import { formatISO } from "date-fns";

type Props = {
  showChart: boolean;
  setShowChart: Dispatch<SetStateAction<boolean>>;
};

type ChartData = {
  attribute: string;
  mark: number;
  fullMark: number;
};

const MacroRadarChart = ({ showChart, setShowChart }: Props) => {
  const { selectedDate } = useGlobalContext();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [mood, setMood] = useState(0);
  const [cravings, setCravings] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [stress, setStress] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(
        `/api/journal?date=${dateToString(selectedDate as Date)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          handleSetChartData(data[0]);
          setMood(data[0].mood);
          setCravings(data[0].cravings);
          setEnergy(data[0].energy);
          setStress(data[0].stress);
          setHappiness(data[0].happiness);
          setShowChart(true);
          setIsLoading(false);
        } else {
          setMood(0);
          setCravings(0);
          setEnergy(0);
          setStress(0);
          setHappiness(0);
          setShowChart(false);
        }
      }
    })();
  }, [selectedDate]);

  const handleSetChartData = (data: JournalLog) => {
    setChartData([
      {
        attribute: "Mood",
        mark: data.mood,
        fullMark: 5,
      },
      {
        attribute: "Cravings",
        mark: data.cravings,
        fullMark: 5,
      },
      {
        attribute: "Energy",
        mark: data.energy,
        fullMark: 5,
      },
      {
        attribute: "Stress",
        mark: data.stress,
        fullMark: 5,
      },
      {
        attribute: "Happiness",
        mark: data.happiness,
        fullMark: 5,
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: formatISO(selectedDate as Date),
          mood: mood,
          cravings: cravings,
          energy: energy,
          stress: stress,
          happiness: happiness,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleSetChartData(data);
        setShowChart(true);
        setIsLoading(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GeneratedChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="attribute" style={{ fontSize: "12px" }} />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 5]}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="mark"
          stroke="hsl(var(--muted-foreground))"
          fill="hsl(var(--muted-foreground))"
          fillOpacity={0.8}
          isAnimationActive={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );

  const JournalForm = () => (
    <form
      id="journal-form"
      className="p-4 flex flex-col items-center justify-between h-full py-6"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center w-full gap-4">
        <Label className="font-bold basis-1/4">Mood</Label>
        <Slider
          defaultValue={[mood]}
          max={5}
          step={1}
          onValueCommit={(value: number[]) => setMood(value[0])}
          className="basis-3/4"
        />
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <Label className="font-bold  basis-1/4">Cravings</Label>
        <Slider
          defaultValue={[cravings]}
          max={5}
          step={1}
          onValueCommit={(value: number[]) => setCravings(value[0])}
          className="basis-3/4"
        />
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <Label className="font-bold  basis-1/4">Energy</Label>
        <Slider
          defaultValue={[energy]}
          max={5}
          step={1}
          onValueCommit={(value: number[]) => setEnergy(value[0])}
          className="basis-3/4"
        />
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <Label className="font-bold  basis-1/4">Stress</Label>
        <Slider
          defaultValue={[stress]}
          max={5}
          step={1}
          onValueCommit={(value: number[]) => setStress(value[0])}
          className="basis-3/4"
        />
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <Label className="font-bold  basis-1/4">Happiness</Label>
        <Slider
          defaultValue={[happiness]}
          max={5}
          step={1}
          onValueCommit={(value: number[]) => setHappiness(value[0])}
          className="basis-3/4"
        />
      </div>
    </form>
  );

  return (
    <div className="h-full w-full place-content-center">
      {showChart ? (
        !isLoading ? (
          <GeneratedChart />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <JournalForm />
      )}
    </div>
  );
};

export default MacroRadarChart;
