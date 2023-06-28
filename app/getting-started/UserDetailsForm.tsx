"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateTDEE, calculateWeightPrediction } from "@/lib/utils";
import React, { useState, MutableRefObject, useEffect } from "react";
import { useGlobalContext } from "../Context/store";
import { CreditCard, Loader2, Moon, Sun } from "lucide-react";
import Image from "next/image";
import "./styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {};

const UserDetailsForm = (props: Props) => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const { userDetails, setUserDetails } = useGlobalContext();
  const [step, setStep] = useState(0);
  const [goalWeight, setGoalWeight] = useState("");
  const [predictionDate, setPredictionDate] = useState("");
  const [pace, setPace] = useState("comfortable");

  const myForm = React.useRef<HTMLFormElement>(null);

  const getTdee = () => {
    const userDetails = {
      age: Number(age),
      sex: sex,
      weight: Number(weight),
      height: Number(heightFt) * 12 + Number(heightIn),
      activityLevel: activityLevel,
      currentWeight: Number(weight),
      goalWeight: Number(goalWeight),
      pace: pace,
      predictedDate: "",
      startDate: new Date().toISOString(),
    };

    return calculateTDEE(userDetails);
  };

  const paceGroup = {
    comfortable: Math.round(getTdee() * 0.85),
    moderate: Math.round(getTdee() * 0.825),
    strenuous: Math.round(getTdee() * 0.8),
  };

  const predictDate = (newCalories: number) => {
    const { weightPredictions, goalDay } = calculateWeightPrediction(
      new Date(),
      Number(weight),
      getTdee(),
      newCalories,
      Number(goalWeight)
    );
    console.log(weightPredictions);
    setCalories(newCalories);
    setPredictionDate(new Date(goalDay as number).toLocaleDateString());
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(age),
          sex: sex,
          height: Number(heightFt) * 12 + Number(heightIn),
          weight: Number(weight),
          calories: calories,
          goalWeight: Number(goalWeight),
          pace: pace,
          predictedDate: new Date(predictionDate),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserDetails(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (!myForm.current?.checkValidity()) {
      myForm.current?.focus();
      return;
    }
    setStep(step + 1);
  };

  const PersonalDetails = () => (
    <div className="grid grid-col gap-3 animate-in fade-in-80">
      <div className="w-full items-center gap-1.5 col-span-1">
        <Label className=" font-semibold text-lg">Age</Label>
        <Input
          id="age"
          value={age}
          type="number"
          required
          placeholder={"Ex: 25"}
          onChange={(e) => setAge(e.target.value)}
          className=""
        />
      </div>
      <div className="grid w-full items-center gap-1.5 col-span-1">
        <Label className=" font-semibold text-lg">Sex</Label>
        <Select onValueChange={setSex} defaultValue={sex}>
          <SelectTrigger className="">
            <SelectValue placeholder="Serving" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const Measurements = () => (
    <div className="grid grid-cols-2 gap-3 animate-in fade-in-80">
      <div className="grid w-full items-center gap-1.5 col-span-2">
        <Label className=" font-semibold text-lg">Weight</Label>
        <Input
          id="weight"
          value={weight}
          type="number"
          required
          placeholder="Pounds (lb)"
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5 col-span-1">
        <Label className=" font-semibold text-lg">Height</Label>
        <Input
          id="heightFt"
          value={heightFt}
          type="number"
          required
          placeholder="Feet (ft)"
          onChange={(e) => setHeightFt(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5 col-span-1">
        <Label className="invisible font-semibold text-lg">Height</Label>
        <Input
          id="heightIn"
          value={heightIn}
          required
          placeholder="Inches (in)"
          onChange={(e) => setHeightIn(e.target.value)}
        />
      </div>
    </div>
  );

  const ActivityLevel = () => (
    <div className="grid grid-col w-full items-center gap-3">
      <div>
        <Label className=" font-semibold text-lg">Activity Level</Label>
        <Select onValueChange={setActivityLevel} defaultValue={activityLevel}>
          <SelectTrigger className="">
            <SelectValue placeholder="Activity" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="lightly active">Lightly Active</SelectItem>
            <SelectItem value="moderately active">Moderately Active</SelectItem>
            <SelectItem value="very active">Very Active</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full items-center gap-1.5 col-span-1">
        <Label className=" font-semibold text-lg">Goal Weight</Label>
        <Input
          id="goal weight"
          value={goalWeight}
          type="number"
          required
          placeholder={"Ex: 185"}
          onChange={(e) => setGoalWeight(e.target.value)}
          className=""
        />
      </div>
    </div>
  );

  const handleLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const Results = () => {
    // useEffect(() => {
    //   predictDate(paceGroup[pace as keyof typeof paceGroup]);
    // }, [pace]);

    return (
      <section>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="h-16 w-16 animate-spin rounded-full" />
          </div>
        ) : (
          <form
          // className="w-full h-16 grid grid-cols-3 gap-5 transition-all animate-in fade-in-80"
          >
            <RadioGroup
              // defaultValue="comfortable"
              required
              className="grid grid-cols-3 gap-4"
              value={pace}
              onValueChange={(value: string) => {
                setPace(value),
                  predictDate(paceGroup[value as keyof typeof paceGroup]),
                  console.log(predictionDate);
              }}
            >
              <Label
                htmlFor="comfortable"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="comfortable"
                  id="comfortable"
                  className="sr-only"
                />
                <h1 className="mb-3 text-2xl font-bold text-green-400">
                  {Math.round(getTdee() * 0.85)}
                </h1>
                Comfortable
              </Label>
              <Label
                htmlFor="moderate"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="moderate"
                  id="moderate"
                  className="sr-only"
                />
                <h1 className="mb-3 text-2xl font-bold text-orange-400">
                  {Math.round(getTdee() * 0.825)}
                </h1>
                Moderate
              </Label>
              <Label
                htmlFor="strenuous"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="strenuous"
                  id="strenuous"
                  className="sr-only"
                />
                <h1 className="mb-3 text-2xl font-bold text-red-400">
                  {Math.round(getTdee() * 0.8)}
                </h1>
                Strenuous
              </Label>
            </RadioGroup>
            <div className="text-center mt-10">
              <h3 className="text-muted-foreground">Predicted Date: </h3>
              <h2 className="text-xl font-bold">
                {predictionDate ? predictionDate : "(Select an option above)"}
              </h2>
            </div>
          </form>
        )}
      </section>
    );
  };

  const Finished = () => (
    <section>
      {loading ? (
        <Loader2 className="h-16 w-16 animate-spin" />
      ) : (
        <div>
          <h1>All Set</h1>
          <Link href={"/"}>Go to Dashboard</Link>
        </div>
      )}
    </section>
  );

  const Navigation = () => (
    <section className={"navigationControls"}>
      {step === fieldGroups.length - 2 && (
        <Button
          type="submit"
          form="results"
          // className={"submitButton"}
          onClick={() => {
            handleSubmit();
            setFinished(true);
            setStep(step + 1);
          }}
        >
          SAVE
        </Button>
      )}
      {step === fieldGroups.length - 3 && (
        <Button
          type="submit"
          form="activity"
          // disabled={!loading}
          // className={"nextButton"}
          onClick={() => {
            setStep(step + 1);

            handleLoader();
          }}
        >
          CALCULATE
        </Button>
      )}

      {step < fieldGroups.length - 3 && (
        <Button
          type="submit"
          variant={"secondary"}
          // className={"nextButton"}
          onClick={handleNext}
        >
          NEXT
        </Button>
      )}
      {!finished && <Reference />}
      {step > 0 && (
        <Button
          type="button"
          variant={"outline"}
          // className={"backButton"}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          BACK
        </Button>
      )}
    </section>
  );

  const Reference = () => (
    <footer className={"reference"}>{renderMarkers()}</footer>
  );

  function renderMarkers() {
    let markers = [];
    for (let i = 0; i < fieldGroups.length; i++)
      markers.push(
        <span
          className={`${
            step >= i ? "bg-primary rounded-" : "bg-accent"
          } rounded-full w-2 h-2`}
        />
      );
    return markers;
  }

  let fieldGroups = [
    {
      form: "personal",
      element: PersonalDetails(),
      header: "Personal Details",
      description: "General day to day activity level. Be conservative.",
    },
    {
      form: "measurements",
      element: Measurements(),
      header: "Measurements",
      description: "General day to day activity level. Be conservative.",
    },
    {
      form: "activity",
      element: ActivityLevel(),
      header: "Activity Level",
      description: "General day to day activity level. Be conservative.",
    },
    {
      form: "results",
      element: Results(),
      header: "Results",
      description: "General day to day activity level. Be conservative.",
    },
    {
      form: "finished",
      element: Finished(),
      header: "All Set",
      description: "General day to day activity level. Be conservative.",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex justify-center items-center pt-10">
        {/* <Image
          src="/assets/tape-line-svgrepo-com.svg"
          alt="Tape Logo"
          height={96}
          width={96}
        /> */}
        <CardTitle>{fieldGroups[step].header}</CardTitle>
        <CardDescription>{fieldGroups[step].description}</CardDescription>
      </CardHeader>
      <CardContent className="h-64 flex justify-center items-center">
        <form
          className="space-y-8 w-full sm:w-[425px]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          ref={myForm}
        >
          {fieldGroups[step].element}
        </form>
      </CardContent>
      <CardFooter>{!finished && <Navigation />}</CardFooter>
    </Card>
  );
};

export default UserDetailsForm;
