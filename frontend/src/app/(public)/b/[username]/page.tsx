"use client";

import { useParams, useRouter } from "next/navigation";
import { BusinessProvider } from "./utils/context/BusinessDataContext";
import { useGetBusiness } from "./appointment/application/hooks/useGetBusiness";
import Welcome from "./onboarding/presentation/screens/Welcome";
import { useState } from "react";
import Appointment from "./appointment/presentation/screens/Appointment";
import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { CustomForm } from "@/components/ui/form";
import { useForm } from "react-hook-form";
setDefaultOptions({ locale: ptBR });

export default function Page() {
  const form = useForm({});
  const [currentScreen, setCurrentScreen] = useState(1);

  const onSubmit = () => {
    console.log("TEST");
  };

  return (
    <CustomMotion>
      <CustomForm
        form={form}
        onSubmit={onSubmit}
        className="space-y-8 max-w-screen-md"
      >
        {currentScreen === 1 ? (
          <Welcome onFinish={() => setCurrentScreen(2)} />
        ) : (
          <Appointment />
        )}
      </CustomForm>
    </CustomMotion>
  );
}
