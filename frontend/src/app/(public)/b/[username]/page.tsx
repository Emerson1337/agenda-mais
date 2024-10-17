"use client";

import Welcome from "./onboarding/screens/Welcome";
import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { useBusinessContext } from "./utils/context/BusinessDataContext";
setDefaultOptions({ locale: ptBR });

export default function Page() {
  const { layout } = useBusinessContext();
  return (
    <CustomMotion>
      <div className={`${layout}`}>
        <Welcome />
      </div>
    </CustomMotion>
  );
}
