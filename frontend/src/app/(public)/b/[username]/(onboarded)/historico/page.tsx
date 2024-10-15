import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import AppointmentsHistory from "./screens/AppointmentsHistory";
setDefaultOptions({ locale: ptBR });

interface Props {
  params: { username: string };
}

export default function Page({ params }: Props) {
  return (
    <CustomMotion className="flex items-center justify-center">
      <AppointmentsHistory username={params.username} />
    </CustomMotion>
  );
}
