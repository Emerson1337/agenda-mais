"use client";

import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import Appointment from "./presentation/screens/Appointment";
setDefaultOptions({ locale: ptBR });

export default function Page() {
  return (
    <CustomMotion>
      <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden relative">
        <Appointment />
      </div>
    </CustomMotion>
  );
}
