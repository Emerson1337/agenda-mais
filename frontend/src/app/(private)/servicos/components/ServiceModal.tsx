import React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MoneyInput from "@/components/ui/input-monetary";
import { TimeDurationSelector } from "./TimeDurationSelector";
import { ServiceData } from "@/shared/types/service";

interface ServiceModalProps {
  modalType: "create" | "edit" | "delete";
  serviceFocused?: Partial<ServiceData>;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  setServiceFocused: React.Dispatch<
    React.SetStateAction<Partial<ServiceData> | undefined>
  >;
}

export function ServiceModal({
  modalType,
  serviceFocused,
  open,
  onConfirm,
  onCancel,
  setServiceFocused,
}: ServiceModalProps) {
  return (
    <Modal
      open={open}
      confirm={onConfirm}
      dismiss={onCancel}
      cancelStyle={modalType === "delete" ? "bg-destructive" : ""}
      title={
        modalType === "create"
          ? "Criar novo serviço"
          : modalType === "edit"
          ? "Editar serviço"
          : "Remover serviço"
      }
      cancelButton={modalType === "delete" ? "Cancelar" : "Fechar"}
      confirmButton={
        modalType === "create"
          ? "Criar"
          : modalType === "edit"
          ? "Salvar"
          : "Confirmar exclusão"
      }
    >
      {modalType === "delete" ? (
        <p className="font-thin">
          Tem certeza de que deseja excluir o serviço{" "}
          <span className="font-bold">{serviceFocused?.name}</span>?
        </p>
      ) : (
        <div className="p-4">
          <div className="mb-4 flex gap-3 flex-col">
            <label className="font-thin">Nome do Serviço:</label>
            <Input
              value={serviceFocused?.name}
              onChange={(e) =>
                setServiceFocused((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="mb-4 flex gap-3 flex-col">
            <label className="font-thin">Preço:</label>
            <MoneyInput
              defaultValue={serviceFocused?.price}
              onChange={(value) =>
                setServiceFocused((prev) => ({
                  ...prev,
                  price: Number(value),
                }))
              }
            />
          </div>
          <div className="mb-4 flex gap-3 flex-col">
            <label className="font-thin">Descrição:</label>
            <Textarea
              value={serviceFocused?.description}
              onChange={(e) =>
                setServiceFocused((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-4 flex gap-3 flex-col">
            <TimeDurationSelector
              defaultValue={serviceFocused?.timeDurationInMinutes}
              onChange={(value) =>
                setServiceFocused((prev) => ({
                  ...prev,
                  timeDurationInMinutes: Number(value),
                }))
              }
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
