"use client";
import { useUpdateFinishedAppointmentQuery } from "@/app/(private)/agendamentos-finalizados/api/finished-appointment.api";

export const useFinishedAppointmentMutation = () => {
  const { isPending, error, data, isSuccess, mutateAsync } =
    useUpdateFinishedAppointmentQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
