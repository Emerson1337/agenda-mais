import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import CancelAppointment from "./screens/CancelAppointment";
setDefaultOptions({ locale: ptBR });

interface Props {
  params: { username: string };
}

export default function Page({ params }: Props) {
  return (
    <CustomMotion className="flex items-center justify-center h-full">
      <CancelAppointment username={params.username} />
    </CustomMotion>
  );
}
