import FillName from "./FillName";
import CustomMotion from "@/components/ui/custom-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
}

const StepThree = ({ onNext, onBack }: StepThreeProps): JSX.Element => {
  const { watch } = useFormContext();
  const name = watch("name");

  return (
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
          <Button
            disabled={name?.length <= 3}
            onClick={onNext}
            className="gap-3 h-12"
          >
            Agendar horário
            <MoveRight />
          </Button>
        </div>
      </div>
    </CustomMotion>
  );
};

export default StepThree;
