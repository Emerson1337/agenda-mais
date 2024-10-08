"use client";

import AppointmentsTimeLine from "../components/AppointmentsTimeLine";
import { useClientInfo } from "@/lib/hooks";
import { useGetPhoneHistory } from "../../application/hooks/useGetPhoneHistory";

interface Props {
  username: string;
}

const AppointmentsHistory = ({ username }: Props): JSX.Element => {
  const { clientPhone } = useClientInfo();

  const { data: appointmentsHistory } = useGetPhoneHistory({
    phone: clientPhone,
    username,
  });

  return (
    <div className="w-3/4 pt-32">
      {appointmentsHistory && (
        <AppointmentsTimeLine appointmentsHistory={appointmentsHistory} />
      )}
    </div>
  );
};

export default AppointmentsHistory;
