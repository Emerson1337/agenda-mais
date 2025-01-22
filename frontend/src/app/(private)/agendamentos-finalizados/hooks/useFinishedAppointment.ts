"use client";

import { useGetFinishedAppointmentQuery } from "@/app/(private)/agendamentos-finalizados/api/finished-appointment.api";

export const useFinishedAppointment = () => {
  const { isPending, error, data, isFetching } =
    useGetFinishedAppointmentQuery();

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
