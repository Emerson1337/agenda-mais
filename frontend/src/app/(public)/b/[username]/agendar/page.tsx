"use client";

import { useState } from "react";
import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import Appointment from "./presentation/screens/Appointment";
setDefaultOptions({ locale: ptBR });

export default function Page() {
  return (
    <CustomMotion>
      <Appointment />
    </CustomMotion>
  );
}
