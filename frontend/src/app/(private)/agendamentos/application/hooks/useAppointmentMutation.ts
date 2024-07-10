"use client";

import { useDeleteAppointmentQuery } from "@/private/agendamentos/infrastructure/appointment.api";

export const useAppointmentMutation = () => {
  const { isPending, error, data, isSuccess, mutateAsync } =
    useDeleteAppointmentQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
