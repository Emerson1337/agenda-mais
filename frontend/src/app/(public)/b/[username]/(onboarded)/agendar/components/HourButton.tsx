import React from "react";
import { Button } from "@/components/ui/button";

export interface HourButtonDTO {
  onClick?: (time: string) => void;
  children: string;
}

const HourButton = ({ children, onClick }: HourButtonDTO): JSX.Element => {
  return (
    <Button
      type="button"
      onClick={() => onClick?.(children)}
      className={"rounded-lg"}
    >
      {children}
    </Button>
  );
};

export default HourButton;
