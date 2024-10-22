import BusinessIntroduction from "./BusinessIntroduction";
import CustomMotion from "@/components/ui/custom-motion";
import { Button } from "@/components/ui/button";

interface StepOneProps {
  onNext: () => void;
}

const StepOne = ({ onNext }: StepOneProps): JSX.Element => (
  <CustomMotion className="max-w-lg">
    <div className="text-center">
      <BusinessIntroduction />
      <Button
        className="mt-8 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-primary bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary"
        onClick={onNext}
      >
        Agendar atendimento
      </Button>
    </div>
  </CustomMotion>
);

export default StepOne;
