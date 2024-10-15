"use client";

import { useDeleteAppointmentQuery } from "@/app/(private)/agendamentos/api/appointment.api";

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
