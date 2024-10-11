import CancelAppointmentForm from "../components/CancelAppointmentForm";

interface Props {
  username: string;
}

const CancelAppointment = ({ username }: Props): JSX.Element => {
  return <CancelAppointmentForm username={username} />;
};

export default CancelAppointment;
