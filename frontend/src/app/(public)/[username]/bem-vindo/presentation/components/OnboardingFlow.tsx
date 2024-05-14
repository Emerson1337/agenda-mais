"use client";

import { AnimatePresence } from "framer-motion";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const OnboardingFlow = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => setStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setStep((step) => Math.min(step - 1, 3));
  const { username }: { username: string } = useParams();
  const onFinish = () => router.push(`/${username}/agenda`);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={nextStep} />;
      case 2:
        return <StepTwo onNext={nextStep} onBack={previousStep} />;
      case 3:
        return <StepThree onNext={onFinish} onBack={previousStep} />;
      default:
        return null;
    }
  };

  const progress = ((step - 1) / 2) * 100;

  return (
    <>
      <AnimatePresence>{renderStep()}</AnimatePresence>
      <div className="absolute bottom-4 flex justify-center w-full">
        <div className="h-2 w-64 bg-gray-400 relative rounded">
          <div
            className="h-full bg-slate-400 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default OnboardingFlow;
