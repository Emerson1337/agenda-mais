import CustomMotion from "@/components/ui/custom-motion";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import Appointment from "./screens/Appointment";
import { fetchAvailableTimes } from "@/api/fetchAvailableTimes";
setDefaultOptions({ locale: ptBR });

interface Props {
  params: { username: string };
}

export default async function Page({ params }: Props) {
  const timesAvailable = await fetchAvailableTimes(params.username);
  return (
    <CustomMotion className="h-full">
      <Appointment timesAvailable={timesAvailable} />
    </CustomMotion>
  );
}
