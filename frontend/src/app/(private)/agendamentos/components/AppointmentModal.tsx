import React from "react";
import { Modal } from "@/components/ui/modal";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { useAppointmentMutation } from "../hooks/useAppointmentMutation";
import { AppointmentData } from "@/shared/types/appointment";
import { useBusinessContext } from "@/app/(private)/utils/context/BusinessDataContext";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MobileIcon } from "@radix-ui/react-icons";
import { stringUtils } from "@/shared/utils/stringUtils";
import { numberUtils } from "@/shared/utils/numberUtils";
import { isAxiosError } from "axios";

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

      toast.success(
        response.data.body.message ?? "Agendamento cancelado com sucesso!",
      );
      onDismiss();
      setTimeout(() => {
        const url = WhatsappService.warnCancelAppointment({
          name: appointment?.clientName,
          code: appointment?.code,
          day: format(appointment?.date, "dd/MM/yyyy"),
          time: appointment?.time,
          phone: appointment.phone,
        });

        window.location.href = url;
      }, ONE_SECOND);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error?.response?.data.body.message || "Erro ao cancelar agendamento",
        );
      }
    }
  };

  return (
    <Modal
      open={open}
      description="Confira as informações do agendamento."
      confirm={() => {
        appointmentFocused && handleCancelAppointment(appointmentFocused);
      }}
      dismiss={onDismiss}
      confirmStyle="bg-destructive text-destructive-foreground hover:bg-destructive/70"
      title={"Detalhes do agendamento"}
      cancelButton="Fechar"
      confirmButton="Cancelar agendamento"
    >
      {appointmentFocused && (
        <div className="p-4">
          <div className="mb-4">
            <span className="font-semibold">Cliente:</span>{" "}
            <span className="text-muted-foreground">
              {appointmentFocused.clientName}
            </span>
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
              <span className="text-muted-foreground">
                {stringUtils.addPhoneMask(appointmentFocused.phone)} (Enviar
                mensagem)
              </span>
            </Button>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Serviço:</span>{" "}
            <span className="text-muted-foreground">
              {appointmentFocused.service.name}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Código:</span>{" "}
            <span className="text-muted-foreground">
              {appointmentFocused.code}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Data:</span>{" "}
            <span className="text-muted-foreground">
              {format(appointmentFocused.date, "dd/MM/yyyy")} às{" "}
              {appointmentFocused.time}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Valor:</span>{" "}
            <span className="text-muted-foreground">
              {numberUtils.convertToMonetaryBRL(
                appointmentFocused.service.price,
              )}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Observações: </span>
            <span className="text-muted-foreground">
              {appointmentFocused.notes.length
                ? appointmentFocused.notes
                : "Sem observações."}
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
