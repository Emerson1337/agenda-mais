"use client"

import { useGetAppointmentQuery } from "@/private/agendamentos/infrastructure/appointment.api";

export const useAppointment = () => {
  const { isPending, error, data, isFetching } = useGetAppointmentQuery();

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
