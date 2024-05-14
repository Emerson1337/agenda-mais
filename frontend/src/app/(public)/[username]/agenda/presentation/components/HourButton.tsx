import React from "react";
import { MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";

export interface HourButtonDTO {
  onClick?: MouseEventHandler;
  children: JSX.Element | string;
}

const HourButton = ({ children, onClick }: HourButtonDTO): JSX.Element => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={"text-black border-black rounded-none"}
    >
      {children}
    </Button>
  );
};

export default HourButton;
