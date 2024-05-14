import { useGetAppointmentQuery } from "../infrastructure/appointment.api";

export const useAppointmentFacade = () => {
  const { isPending, error, data, isFetching } = useGetAppointmentQuery();

  // You can add any additional logic here

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
