import React from "react";
import { Modal } from "@/components/ui/modal";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { useFinishedAppointmentMutation } from "../hooks/useFinishedAppointmentMutation";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MobileIcon } from "@radix-ui/react-icons";
import { stringUtils } from "@/shared/utils/stringUtils";
import { numberUtils } from "@/shared/utils/numberUtils";
import { isAxiosError } from "axios";
import { FinishedAppointmentData } from "@/shared/types/appointment";
import { AppointmentStatus } from "@/shared/types/appointment";

interface AppointmentModalProps {
  finishedAppointmentFocused?: FinishedAppointmentData;
  open: boolean;
  onDismiss: () => void;
}

export function FinishedAppointmentModal({
  finishedAppointmentFocused,
  open,
  onDismiss,
}: AppointmentModalProps) {
  const { mutateAsync } = useFinishedAppointmentMutation();

  const handleUpdateAppointment = async (
    appointment: FinishedAppointmentData,
  ) => {
    try {
      const response = await mutateAsync({
        code: appointment.code,
        status:
          appointment.status === AppointmentStatus.MISSED
            ? AppointmentStatus.FINISHED
            : AppointmentStatus.MISSED,
      });

      toast.success(response.message ?? "Agendamento atualizado com sucesso!");
      onDismiss();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error?.response?.data.body.message || "Erro ao atualizar agendamento",
        );
      }
    }
  };

  const updateAppointmentButtonText =
    finishedAppointmentFocused?.status === AppointmentStatus.FINISHED
      ? "Não compareceu? Marque como ausente"
      : "Marcar como finalizado";

  const confirmButtonLabel =
    finishedAppointmentFocused?.status !== AppointmentStatus.CANCELLED
      ? updateAppointmentButtonText
      : undefined;

  return (
    <Modal
      open={open}
      description="Confira as informações do agendamento."
      confirm={
        confirmButtonLabel
          ? () => {
              finishedAppointmentFocused &&
                handleUpdateAppointment(finishedAppointmentFocused);
            }
          : undefined
      }
      dismiss={onDismiss}
      confirmStyle="bg-destructive text-destructive-foreground hover:bg-destructive/70"
      title={"Detalhes do agendamento"}
      cancelButton="Fechar"
      confirmButton={confirmButtonLabel}
    >
      {finishedAppointmentFocused && (
        <div className="p-4">
          <div className="mb-4">
            <span className="font-semibold">Cliente:</span>{" "}
            <span className="text-muted-foreground">
              {finishedAppointmentFocused.clientName}
            </span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="font-semibold">Phone:</span>
            <Button
              className="p-2 underline"
              variant={"link"}
              onClick={() =>
                WhatsappService.openChatWith(finishedAppointmentFocused.phone)
              }
            >
              <MobileIcon />
              <span className="text-muted-foreground">
                {stringUtils.addPhoneMask(finishedAppointmentFocused.phone)}{" "}
                (Enviar mensagem)
              </span>
            </Button>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Serviço:</span>{" "}
            <span className="text-muted-foreground">
              {finishedAppointmentFocused.serviceName}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Código:</span>{" "}
            <span className="text-muted-foreground">
              {finishedAppointmentFocused.code}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Data:</span>{" "}
            <span className="text-muted-foreground">
              {format(finishedAppointmentFocused.date, "dd/MM/yyyy")} às{" "}
              {finishedAppointmentFocused.time}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Valor:</span>{" "}
            <span className="text-muted-foreground">
              {numberUtils.convertToMonetaryBRL(
                finishedAppointmentFocused.price,
              )}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Observações: </span>
            <span className="text-muted-foreground">
              {finishedAppointmentFocused.notes.length
                ? finishedAppointmentFocused.notes
                : "Sem observações."}
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
