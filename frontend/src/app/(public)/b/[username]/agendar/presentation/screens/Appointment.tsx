import LayoutOne from "../components/LayoutOne";
import { TimesAvailable } from "@/shared/types/times-available";

interface Props {
  timesAvailable: TimesAvailable[];
}

const Appointment = ({ timesAvailable }: Props): JSX.Element => {
  return <LayoutOne datesAvailable={timesAvailable} />;
};

export default Appointment;
