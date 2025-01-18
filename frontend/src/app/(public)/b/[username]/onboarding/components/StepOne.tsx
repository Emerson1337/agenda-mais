import BusinessIntroduction from "./BusinessIntroduction";
import CustomMotion from "@/components/ui/custom-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { hslToHex } from "@/shared/utils/themeUtils";

interface StepOneProps {
  onNext: () => void;
}

const StepOne = ({ onNext }: StepOneProps): JSX.Element => {
  const [primaryColor, setPrimaryColor] = useState<string>("#000");

  useEffect(() => {
    // Access the CSS variable value
    const getPrimaryColor = () => {
      const bodyThemeElement = document.getElementById("body-theme");

      if (bodyThemeElement) {
        const [h, s, l] = getComputedStyle(bodyThemeElement)
          .getPropertyValue("--primary")
          .split(" ");

        return hslToHex(h, s, l);
      }

      return primaryColor;
    };

    setPrimaryColor(getPrimaryColor());
  }, []);

  return (
    <CustomMotion className="max-w-lg">
      <div className="text-center">
        <BusinessIntroduction />
        <Button
          className="mt-8 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-primary bg-[linear-gradient(110deg,#000103,45%,#80858a,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-secondary dark:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary"
          onClick={onNext}
        >
          Agendar atendimento
        </Button>
      </div>
    </CustomMotion>
  );
};

export default StepOne;
