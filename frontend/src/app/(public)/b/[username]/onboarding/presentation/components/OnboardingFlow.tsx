"use client";

import { AnimatePresence } from "framer-motion";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomForm } from "@/components/ui/form";
import { notFound, useRouter } from "next/navigation";
import { useBusinessContext } from "@/public/b/[username]/utils/context/BusinessDataContext";
import { ReloadIcon } from "@radix-ui/react-icons";

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const { business } = useBusinessContext();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "", // Empty initial values until local storage is loaded
      phone: "",
    },
  });

  // Check if localStorage values exist and update form state accordingly
  useEffect(() => {
    if (!business) notFound();

    if (typeof window === "undefined") return;

    const isOnboarded = localStorage.getItem("onboarding");
    if (isOnboarded) {
      return router.replace(`/b/${business.username}/agendar`);
    }

    form.setValue("name", localStorage.getItem("name") || "");
    form.setValue("phone", localStorage.getItem("phone") || "");
    setLoading(false);
  }, [business, form, router]);

  const nextStep = () => setStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setStep((step) => Math.max(step - 1, 1)); // Fixed range for decrementing

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

  if (loading) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  const onSubmit = (data: { phone: string; name: string }) => {
    // Set values in local storage upon form submission
    localStorage.setItem("onboarding", "1");
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("name", data.name);

    router.replace(`/b/${business?.username}/agendar`);
  };

  const progress = ((step - 1) / 3) * 100;

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
