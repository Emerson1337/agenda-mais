import Welcome from "./onboarding/presentation/screens/Welcome";
import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
setDefaultOptions({ locale: ptBR });

export default async function Page() {
  return (
    <CustomMotion>
      <Welcome />
    </CustomMotion>
  );
}
