import React from "react";
import UserDetailsForm from "./UserDetailsForm";
import { Card, CardTitle } from "@/components/ui/card";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {/* <Card className=""> */}

      {/* <CardTitle></CardTitle> */}
      <UserDetailsForm />
      {/* </Card> */}
    </div>
  );
};

export default page;
