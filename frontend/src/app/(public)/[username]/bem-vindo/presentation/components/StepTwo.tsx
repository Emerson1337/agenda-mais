import { Button } from "@/components/ui/button";
import CustomMotion from "@/components/ui/custom-motion";
import FillPhoneNumber from "./FillPhoneNumber";
import { MoveLeft, MoveRight } from "lucide-react";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
}

const StepTwo = ({ onNext, onBack }: StepTwoProps): JSX.Element => (
  <CustomMotion className="max-w-lg">
    <div className="px-8 w-full">
      <FillPhoneNumber />
      <div className="flex justify-between mt-12">
        <Button
          className="hover:bg-secondary hover:text-secondary-foreground text-primary-foreground bg-secondary-foreground h-12"
          onClick={onBack}
        >
          <MoveLeft />
        </Button>
        <Button onClick={onNext} className="gap-3 h-12">
          <MoveRight /> Avançar
        </Button>
      </div>
    </div>
  </CustomMotion>
);

export default StepTwo;
