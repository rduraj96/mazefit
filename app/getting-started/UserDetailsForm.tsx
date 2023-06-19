"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateTDEE } from "@/lib/utils";
import React, { useState } from "react";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import "./styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Spinner from "@/components/Spinner";

type Props = {};

const UserDetailsForm = (props: Props) => {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const { setUserDetails } = useGlobalContext();
  const [step, setStep] = useState(0);

  const getTdee = () => {
    const userDetails = {
      age: Number(age),
      gender: sex,
      weight: Number(weight),
      height: Number(heightFt) * 12 + Number(heightIn),
      activityLevel: activityLevel,
    };

    return calculateTDEE(userDetails);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(age),
          height: Number(heightFt) * 12 + Number(heightIn),
          weight: Number(weight),
          calories: calories,
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

  const PersonalDetails = () => (
    <section>
      <h1 className="font-bold text-2xl text-center text-black pb-7">
        General Information
      </h1>
      <div className="grid grid-cols-2 gap-3 animate-in fade-in-80">
        <div className="grid w-full items-center gap-1.5 col-span-1">
          <Label className="text-black font-semibold text-lg">Age</Label>
          <Input
            id="age"
            value={age}
            type="number"
            required
            placeholder={"Ex: 25"}
            onChange={(e) => setAge(e.target.value)}
            className="text-black"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 col-span-1">
          <Label className="text-black font-semibold text-lg">Sex</Label>
          <Select onValueChange={setSex} defaultValue={sex}>
            <SelectTrigger className="text-black">
              <SelectValue placeholder="Serving" className="text-black" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );

  const Measurements = () => (
    <section>
      <h1 className="font-bold text-2xl text-center text-black py-7">
        Mesurements
      </h1>
      <div className="grid grid-cols-4 gap-3 animate-in fade-in-80">
        <div className="grid w-full items-center gap-1.5 col-span-2">
          <Label className="text-black font-semibold text-lg">Weight</Label>
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
          <Label className="text-black font-semibold text-lg">Height</Label>
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
          <Label className="invisible text-black font-semibold text-lg">
            Height
          </Label>
          <Input
            id="heightIn"
            value={heightIn}
            placeholder="Inches (in)"
            onChange={(e) => setHeightIn(e.target.value)}
          />
        </div>
      </div>
    </section>
  );

  const ActivityLevel = () => (
    <section>
      <h1 className="font-bold text-2xl text-center text-black py-7">
        Activity Level
      </h1>
      <div className="grid w-full items-center gap-1.5">
        <Label className="text-black font-semibold text-lg">
          Activity Level
        </Label>
        <Select onValueChange={setActivityLevel} defaultValue={activityLevel}>
          <SelectTrigger className="text-black">
            <SelectValue placeholder="Activity" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="lightly active">Lightly Active</SelectItem>
            <SelectItem value="moderately active">Moderately Active</SelectItem>
            <SelectItem value="very active">Very Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );

  const handleLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const Results = () => (
    <section>
      <h1 className="font-bold text-2xl text-center text-black py-7">
        Results
      </h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin rounded-full text-blue-600" />
        </div>
      ) : (
        // <Spinner spinColor="h-16 w-16 text-center" />
        <div className="w-full h-16 grid grid-cols-3 gap-5 transition-all animate-in fade-in-80">
          <button
            type="button"
            className="rounded-xl bg-green-400 shadow-lg bg-opacity-75 col-span-1 focus:ring-2 focus:bg-opacity-100 ring-offset-2 cursor-pointer"
            onClick={() => setCalories(getTdee() - 500)}
          >
            <h1 className="text-sm">Slow</h1>
            <h2 className="font-bold text-2xl">{getTdee() - 500}</h2>
          </button>
          <button
            type="button"
            className="rounded-xl bg-orange-400 shadow-lg bg-opacity-75 col-span-1 focus:ring-4 focus-ring-black ring-offset-2 cursor-pointer"
            onClick={() => setCalories(getTdee() - 750)}
          >
            <h1 className="text-sm">Moderate</h1>
            <h2 className="font-bold text-xl">{getTdee() - 750}</h2>
          </button>
          <button
            type="button"
            className="rounded-xl bg-red-400 shadow-lg bg-opacity-75 col-span-1 focus:ring-4 focus-ring-black ring-offset-2 cursor-pointer"
            onClick={() => setCalories(getTdee() - 1000)}
          >
            <h1 className="text-sm">Fast</h1>
            <h2 className="font-bold text-xl">{getTdee() - 1000}</h2>
          </button>
        </div>
      )}
    </section>
  );

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
        <button
          type="button"
          className={"submitButton"}
          onClick={() => {
            handleSubmit();
            setFinished(true);
            setStep(step + 1);
          }}
        >
          SAVE
        </button>
      )}
      {step === fieldGroups.length - 3 && (
        <button
          type="button"
          // disabled={!loading}
          className={"nextButton"}
          onClick={() => {
            setStep(step + 1);

            handleLoader();
          }}
        >
          CALCULATE
        </button>
      )}

      {step < fieldGroups.length - 3 && (
        <button
          type="button"
          className={"nextButton"}
          onClick={() => {
            setStep(step + 1);
          }}
        >
          NEXT
        </button>
      )}
      {step > 0 && (
        <button
          type="button"
          className={"backButton"}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          BACK
        </button>
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
        <span className={step >= i ? "markerBlue" : "markerGray"} />
      );
    return markers;
  }

  let fieldGroups = [
    {
      key: 1,
      element: PersonalDetails(),
    },
    {
      key: 2,
      element: Measurements(),
    },
    {
      key: 3,
      element: ActivityLevel(),
    },
    {
      key: 4,
      element: Results(),
    },
    {
      key: 5,
      element: Finished(),
    },
  ];

  return (
    <div>
      <form className="space-y-8 w-full sm:w-[425px]" onSubmit={handleSubmit}>
        {fieldGroups[step].element}
        {!finished && <Navigation />}
        {!finished && <Reference />}
      </form>
    </div>
  );
};

export default UserDetailsForm;
