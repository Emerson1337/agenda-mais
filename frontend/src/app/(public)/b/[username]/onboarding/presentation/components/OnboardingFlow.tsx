"use client";

import { AnimatePresence } from "framer-motion";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomForm } from "@/components/ui/form";

const OnboardingFlow = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setStep((step) => Math.min(step - 1, 3));

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
  };

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
