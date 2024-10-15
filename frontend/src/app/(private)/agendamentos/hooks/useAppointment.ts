"use client";

import { useGetAppointmentQuery } from "@/app/(private)/agendamentos/api/appointment.api";

export const useAppointment = () => {
  const { isPending, error, data, isFetching } = useGetAppointmentQuery();

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
