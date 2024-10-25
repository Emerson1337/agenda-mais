import React from "react";
import { Modal } from "@/components/ui/modal";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { useAppointmentMutation } from "../hooks/useAppointmentMutation";
import { AppointmentData } from "@/shared/types/appointment";
import { useBusinessContext } from "../../utils/context/BusinessDataContext";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { MobileIcon } from "@radix-ui/react-icons";
import { stringUtils } from "@/shared/utils/stringUtils";
import { numberUtils } from "@/shared/utils/numberUtils";

const ONE_SECOND = 1000;

interface AppointmentModalProps {
  appointmentFocused?: AppointmentData;
  open: boolean;
  onDismiss: () => void;
}

export function AppointmentModal({
  appointmentFocused,
  open,
  onDismiss,
}: AppointmentModalProps) {
  const { mutateAsync } = useAppointmentMutation();
  const { id: managerId } = useBusinessContext();

  const handleCancelAppointment = async (appointment: AppointmentData) => {
    try {
      const response = await mutateAsync({
        managerId: managerId,
        appointmentId: appointment._id,
      });

      toast.success(response.data.body.message);
      onDismiss();
      setTimeout(() => {
        WhatsappService.warnCancelAppointment({
          name: appointment?.clientName,
          code: appointment?.code,
          day: format(appointment?.date, "dd/MM/yyyy"),
          time: appointment?.time,
          phone: appointment.phone,
        });
      }, ONE_SECOND);
    } catch (error: AxiosError | any) {
      toast.error(
        error?.response?.data?.message || "Erro ao cancelar agendamento"
      );
    }
  };

  return (
    <Modal
      open={open}
      confirm={() => {
        appointmentFocused && handleCancelAppointment(appointmentFocused);
      }}
      dismiss={onDismiss}
      confirmStyle="bg-destructive"
      title={"Detalhes do agendamento"}
      cancelButton="Fechar"
      confirmButton="Cancelar agendamento"
    >
      {appointmentFocused && (
        <div className="p-4">
          <div className="mb-4">
            <span className="font-semibold">Cliente:</span>{" "}
            {appointmentFocused.clientName}
          </div>
          <div className="mb-4 flex items-center">
            <span className="font-semibold">Phone:</span>
            <Button
              className="p-2 underline"
              variant={"link"}
              onClick={() =>
                WhatsappService.openChatWith(appointmentFocused.phone)
              }
            >
              <MobileIcon />
              {stringUtils.addPhoneMask(appointmentFocused.phone)} (Enviar
              mensagem)
            </Button>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Serviço:</span>{" "}
            {appointmentFocused.service.name}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Código:</span>{" "}
            {appointmentFocused.code}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Data:</span>{" "}
            {format(appointmentFocused.date, "dd/MM/yyyy")} às{" "}
            {appointmentFocused.time}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Valor:</span>{" "}
            {numberUtils.convertToMonetaryBRL(appointmentFocused.service.price)}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Observações: </span>
            {appointmentFocused.notes.length
              ? appointmentFocused.notes
              : "Sem observações."}
          </div>
        </div>
      )}
    </Modal>
  );
}
