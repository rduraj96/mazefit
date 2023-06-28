import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import PredictionLineChart from "./PredictionLineChart";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen w-full p-7">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Select which chart you want to get displayed on the large screen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 my-10">
            <PredictionLineChart />
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground">
            Disclaimer: It is important to note that while the calculations
            provide estimates and guidelines for weight loss, individual results
            may vary. Factors such as genetics, overall health, exercise
            regimen, and dietary choices can influence weight loss outcomes.
            Consulting with a healthcare professional or a registered dietitian
            is recommended for personalized advice and guidance when embarking
            on a weight loss journey.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
