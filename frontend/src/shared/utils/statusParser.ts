import { AppointmentStatus } from "../types/appointment";
export function translateStatus(status: AppointmentStatus): {
  label: string;
  status: AppointmentStatus;
} {
  switch (status) {
    case AppointmentStatus.ACTIVE:
      return { label: "Ativo", status: AppointmentStatus.ACTIVE };
    case AppointmentStatus.CANCELLED:
      return { label: "Cancelado", status: AppointmentStatus.CANCELLED };
    case AppointmentStatus.FINISHED:
      return { label: "Finalizado", status: AppointmentStatus.FINISHED };
    case AppointmentStatus.MISSED:
      return { label: "Não compareceu", status: AppointmentStatus.MISSED };
    default:
      return { label: "Desconhecido", status: AppointmentStatus.FINISHED };
  }
}
