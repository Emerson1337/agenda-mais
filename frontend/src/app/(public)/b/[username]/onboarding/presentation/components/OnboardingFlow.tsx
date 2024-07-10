"use client";

import { AnimatePresence } from "framer-motion";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomForm } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useBusinessContext } from "@/public/b/[username]/utils/context/BusinessDataContext";
import { ReloadIcon } from "@radix-ui/react-icons";

const OnboardingFlow = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setStep((step) => Math.min(step - 1, 3));
  const { business } = useBusinessContext();
  const router = useRouter();
  const isOnboarded = localStorage.getItem("onboarding");

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={nextStep} />;
      case 2:
        return <StepTwo onNext={nextStep} onBack={previousStep} />;
      case 3:
        return <StepThree onBack={previousStep} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isOnboarded && business.username)
      router.replace(`/b/${business.username}/agendar`);
  }, [business.username, isOnboarded, router]);

  const progress = ((step - 1) / 3) * 100;

  const form = useForm({
    defaultValues: {
      name: localStorage.getItem("name") || undefined,
      phone: localStorage.getItem("phone") || undefined,
    },
  });
  const onSubmit = (data: { phone: string; name: string }) => {
    localStorage.setItem("onboarding", "1");
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("name", data.name);

    router.replace(`/b/${business.username}/agendar`);
  };

  if (isOnboarded) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  return (
    <CustomForm form={form} onSubmit={onSubmit} className="space-y-8">
      <AnimatePresence>{renderStep()}</AnimatePresence>
      <div className="flex justify-center">
        <div className="h-2 w-64 bg-secondary relative rounded">
          <div
            className="h-full bg-primary rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </CustomForm>
  );
};

export default OnboardingFlow;
