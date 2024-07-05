"use client";

import { useParams, useRouter } from "next/navigation";
import { BusinessProvider } from "./appointment/application/context/BusinessDataContext";
import { useBusinessFacade } from "./appointment/application/business.facade";
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
  const { username }: { username: string } = useParams();
  const { data, isPending, isError } = useBusinessFacade({ username });
  const router = useRouter();
  const form = useForm({
    defaultValues: data,
  });
  const [currentScreen, setCurrentScreen] = useState(1);

  if (isError) return router.replace("/not-found");

  if (isPending) {
    return <div>Loading...</div>;
  }

  const onSubmit = () => {
    console.log("TEST");
  };

  return (
    <BusinessProvider initialData={data!}>
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
    </BusinessProvider>
  );
}
