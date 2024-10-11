import { AppointmentStatus } from "@/server-actions/fetchPhoneHistory";

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
    default:
      return { label: "Desconhecido", status: AppointmentStatus.FINISHED };
  }
}
