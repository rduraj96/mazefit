import React from "react";
import NewMainCard from "../(shared)/NewMainCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen w-full p-7">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Saved Meals</CardTitle>
          <CardDescription>
            List of your favorite meals. Add meals to this list for quick logs
            in the future.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-screen">
            <div className="grid grid-auto-fit-md mb-10 gap-5 mx-auto">
              <NewMainCard className="bg-black">MEAL</NewMainCard>
              <NewMainCard className="bg-black">MEAL</NewMainCard>
              <NewMainCard className="bg-black">MEAL</NewMainCard>
              <NewMainCard className="bg-black">MEAL</NewMainCard>
              <NewMainCard className="bg-black">MEAL</NewMainCard>
              <NewMainCard className="bg-black">MEAL</NewMainCard>
              <NewMainCard className="bg-black">MEAL</NewMainCard>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default page;
