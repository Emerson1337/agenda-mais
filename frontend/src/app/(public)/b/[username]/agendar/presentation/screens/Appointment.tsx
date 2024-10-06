import LayoutOne from "../components/LayoutOne";
import { BusinessSchedule } from "@/shared/types/times-available";

interface Props {
  timesAvailable: BusinessSchedule;
}

const Appointment = ({ timesAvailable }: Props): JSX.Element => {
  return <LayoutOne datesAvailable={timesAvailable} />;
};

export default Appointment;
