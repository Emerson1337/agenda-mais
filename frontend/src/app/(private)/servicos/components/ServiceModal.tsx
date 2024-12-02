import React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MoneyInput from "@/components/ui/input-monetary";
import { TimeDurationSelector } from "./TimeDurationSelector";
import { ServiceData, ServiceDataSchema } from "@/shared/types/service";
import { useForm } from "react-hook-form";
import applyErrorsToForm from "@/shared/utils/errorUtils";
import { useServiceMutation } from "@/app/(private)/servicos/hooks/useServiceMutation";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLabel } from "@/components/ui/error-label";

interface ServiceModalProps {
  modalType: "create" | "edit" | "delete";
  serviceFocused?: Partial<ServiceData>;
  open: boolean;
  onClose: () => void;
}

export function ServiceModal({
  modalType,
  serviceFocused,
  open,
  onClose,
}: ServiceModalProps) {
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
        if (!data?.id)
          return toast.error(
            "Erro ao editar serviço! Verifique os dados e tente novamente",
          );
        await updateMutation.mutateAsync({
          id: data.id,
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

  return (
    <Modal
      description="Gerencie os serviços disponíveis para os clientes"
      isLoading={isLoading || isSubmitting}
      open={open}
      confirm={handleSubmit(handleConfirm)}
      dismiss={() => {
        onClose();
        clearErrors();
      }}
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
          <div className="flex gap-3 flex-col">
            <label className="font-thin">Nome do Serviço:</label>
            <Input
              placeholder="Digite o nome do serviço"
              {...register("name")}
            />
            <ErrorLabel>{errors.name?.message}</ErrorLabel>
          </div>
          <div className="flex gap-3 flex-col">
            <label className="font-thin">Preço:</label>
            <MoneyInput
              placeholder="Digite o preço do serviço"
              defaultValue={getValues()?.price}
              onChange={(value) => setValue("price", value)}
            />
            <ErrorLabel>{errors.price?.message}</ErrorLabel>
          </div>
          <div className="flex gap-3 flex-col">
            <label className="font-thin">Descrição:</label>
            <Textarea
              placeholder="Digite a descrição do serviço"
              {...register("description")}
            />
            <ErrorLabel>{errors.description?.message}</ErrorLabel>
          </div>
          <div className="flex gap-3 flex-col">
            <label className="font-thin">Tempo:</label>
            <TimeDurationSelector
              defaultValue={getValues()?.timeDurationInMinutes}
              onChange={(value) => setValue("timeDurationInMinutes", value)}
            />
            <ErrorLabel>{errors.timeDurationInMinutes?.message}</ErrorLabel>
          </div>
        </div>
      )}
    </Modal>
  );
}
