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
<<<<<<< Updated upstream
=======
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<ServiceData>({
    defaultValues: serviceFocused,
    resolver: zodResolver(ServiceDataSchema),
  });

  const {
    delete: deleteMutation,
    update: updateMutation,
    create: createMutation,
  } = useServiceMutation();

  React.useEffect(() => {
    reset(serviceFocused);
  }, [serviceFocused, reset]);

  async function handleConfirm(data: ServiceData) {
    try {
      if (modalType === "delete") {
        if (!serviceFocused?.id)
          return toast.error(
            "Erro ao deletar serviço! Verifique os dados e tente novamente",
          );
        await deleteMutation.mutateAsync({ id: serviceFocused.id });
        toast.success("Serviço removido com sucesso!");
      } else if (modalType === "edit") {
        if (!serviceFocused?.id)
          return toast.error(
            "Erro ao editar serviço! Verifique os dados e tente novamente",
          );
        await updateMutation.mutateAsync({
          id: serviceFocused.id,
          updatedData: data,
        });
        toast.success("Serviço editado com sucesso!");
      } else {
        if (!data)
          return toast.error(
            "Erro ao criar serviço! Verifique os dados e tente novamente",
          );
        await createMutation.mutateAsync(data);
        toast.success("Serviço criado com sucesso!");
      }

      onClose();
      clearErrors();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Erro ao salvar alterações");
        return applyErrorsToForm(setError, error.response?.data);
      }
    }
  }

>>>>>>> Stashed changes
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
