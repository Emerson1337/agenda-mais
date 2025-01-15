"use client";

import { Label } from "@radix-ui/react-label";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { IRequestUpdateManager } from "../api/manager.api";
import { toast } from "react-toastify";
import { useManagerMutation } from "../hooks/useManagerMutation";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useGetManager } from "@/app/(private)/dashboard/hooks/useGetManager";
import { stringUtils } from "@/shared/utils/stringUtils";
import { isAxiosResponse } from "@/shared/utils/errorUtils";

export default function AccountDetails() {
  const { data } = useGetManager();
  const { mutateAsync } = useManagerMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRequestUpdateManager>();

  const [phone, setPhone] = useState<string>(data?.phone || "");
  const [businessName, setBusinessName] = useState<string>("");

  useEffect(() => {
    if (data) {
      const displayName = data.username.replace(/-/g, " ");
      setValue("username", displayName);
      setBusinessName(displayName);
      setValue("welcomeMessage", data.welcomeMessage);
      setPhone(data.phone);
    }
  }, [data, setValue]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/b/${formattedName}`,
    );
    toast.success("Link copiado para a área de transferência!");
  };

  const [formattedName, setFormattedName] = useState<string>("");

  useEffect(() => {
    setFormattedName(stringUtils.formatBusinessNameForURL(businessName));
  }, [businessName]);

  const onSubmit = async (formData: IRequestUpdateManager) => {
    try {
      const updatedData = {
        ...data,
        ...formData,
        phone,
        username: stringUtils.formatBusinessNameForURL(formData.username),
      };
      await mutateAsync(updatedData);
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      if (isAxiosResponse(error)) {
        toast.error(error?.data?.body.message || "Erro ao salvar alterações");
      }
    }
  };

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Detalhes da conta</CardTitle>
        <CardDescription>
          Preencha as informações do seu negócio abaixo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nome do seu negócio</Label>
            <Input
              id="username"
              {...register("username", { required: true })}
              className="w-full"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            {/* Error for username */}
            {errors.username && (
              <p className="text-red-500 text-sm">
                Nome do negócio é obrigatório
              </p>
            )}
            {/* Display the formatted example */}
            <p className="text-sm text-gray-500 flex justify-around">
              Exemplo de URL:{" "}
              <span className="font-mono">/b/{formattedName}</span>
              <ClipboardCopyIcon
                className="h-5 w-5 ml-2 cursor-pointer text-gray-500"
                onClick={copyToClipboard}
              />
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Mensagem de boas vindas:</Label>
            <Textarea
              id="welcomeMessage"
              {...register("welcomeMessage")}
              className="min-h-32"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Número de telefone:</Label>
            <PhoneInput
              countries={["BR"]}
              defaultCountry="BR"
              value={phone}
              onChange={setPhone} // Use state to handle phone input
            />
          </div>
          <Button
            type="submit"
            variant="default"
            className="mt-10 w-full cursor-pointer"
          >
            Salvar alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
