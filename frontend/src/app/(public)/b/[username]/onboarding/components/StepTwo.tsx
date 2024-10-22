import { Button } from "@/components/ui/button";
import CustomMotion from "@/components/ui/custom-motion";
import FillPhoneNumber from "./FillPhoneNumber";
import { MoveLeft, MoveRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
}

const StepTwo = ({ onNext, onBack }: StepTwoProps): JSX.Element => {
  const { watch, setValue } = useFormContext();
  const phone = watch("phone");

  return (
    <CustomMotion className="max-w-lg">
      <div className="px-8 w-full">
        <FillPhoneNumber
          value={phone}
          onChange={(value) => setValue("phone", value)}
        />
        <div className="flex justify-between mt-12">
          <Button
            className="hover:bg-secondary hover:text-secondary-foreground text-secondary bg-secondary-foreground h-12"
            onClick={onBack}
          >
            <MoveLeft />
          </Button>
          <Button
            onClick={onNext}
            disabled={phone?.length !== 14}
            className="gap-3 h-12"
          >
            Avançar
            <MoveRight />
          </Button>
        </div>
      </div>
    </CustomMotion>
  );
};

export default StepTwo;
