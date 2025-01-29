"use client";

import { useState } from "react";
import AppointmentsTimeLine from "../components/AppointmentsTimeLine";
import { useClientInfo } from "@/lib/hooks";
import { useGetPhoneHistory } from "../hooks/useGetPhoneHistory";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  username: string;
}

const AppointmentsHistory = ({ username }: Props): JSX.Element => {
  const { clientPhone } = useClientInfo();
  const [limit, setLimit] = useState(5);

  const { data: appointmentsHistory, isFetching } = useGetPhoneHistory({
    phone: clientPhone,
    username,
    limit,
  });

  const handleLoadMore = () => {
    setLimit((prev) => prev + limit);
  };

  if (isFetching) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!appointmentsHistory || appointmentsHistory.length === 0) {
    return (
      <div className="text-center h-screen w-screen flex items-center justify-center">
        <h1 className="text-2xl font-light">
          Você ainda não possui histórico de agendamentos
        </h1>
      </div>
    );
  }

  return (
    <div className="w-3/4 pt-32 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 pb-10">
        <AppointmentsTimeLine appointmentsHistory={appointmentsHistory} />
        {limit <= appointmentsHistory.length && (
          <button
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-foreground transition-all"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Carregar mais"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentsHistory;
