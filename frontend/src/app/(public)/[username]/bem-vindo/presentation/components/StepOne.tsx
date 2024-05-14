import BusinessIntroduction from "./BusinessIntroduction";
import CustomMotion from "@/components/ui/custom-motion";
import { Button } from "@/components/ui/button";

interface StepOneProps {
  onNext: () => void;
}

const StepOne = ({ onNext }: StepOneProps): JSX.Element => (
  <CustomMotion className="max-w-lg">
    <div className="text-white text-center">
      <BusinessIntroduction />
      <Button
        className="mt-8 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-50"
        onClick={onNext}
      >
        Agendar atendimento
      </Button>
    </div>
  </CustomMotion>
);

export default StepOne;
