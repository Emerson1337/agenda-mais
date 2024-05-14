import FillName from "./FillName";
import CustomMotion from "@/components/ui/custom-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
}

const StepThree = ({ onNext, onBack }: StepThreeProps): JSX.Element => (
  <CustomMotion className="max-w-lg">
    <div className="px-8 w-full">
      <FillName />
      <div className="flex justify-between mt-12">
        <Button
          className="hover:bg-secondary hover:text-secondary-foreground text-primary-foreground bg-secondary-foreground h-12"
          onClick={onBack}
        >
          <MoveLeft />
        </Button>
        <Button onClick={onNext} className="gap-3 h-12">
          <MoveRight /> Agendar horário
        </Button>
      </div>
    </div>
  </CustomMotion>
);

export default StepThree;
