import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const NewMainCard = ({ title, header, children, className }: Props) => {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      {header && <CardHeader>{header}</CardHeader>}

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default NewMainCard;
