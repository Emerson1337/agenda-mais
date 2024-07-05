"use client";

import { AnimatePresence } from "framer-motion";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Props {
  onFinish: () => void;
}

const OnboardingFlow = ({ onFinish }: Props): JSX.Element => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => setStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setStep((step) => Math.min(step - 1, 3));

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

  const progress = ((step - 1) / 3) * 100;

  return (
    <>
      <AnimatePresence>{renderStep()}</AnimatePresence>
      <div className="absolute bottom-4 flex justify-center w-full">
        <div className="h-2 w-64 bg-secondary relative rounded">
          <div
            className="h-full bg-primary rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default OnboardingFlow;
