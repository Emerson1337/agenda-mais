"use client";

import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/app/(private)/detalhes/hooks/useManagerMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordSchema,
  IChangePasswordRequest,
} from "@/app/(private)/detalhes/schemas/change-password.schema";
import { ErrorLabel } from "@/components/ui/error-label";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function PasswordDetails() {
  const { mutateAsync } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<IChangePasswordRequest>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  async function handleChangePassword(changePassword: IChangePasswordRequest) {
    try {
      const response = await mutateAsync(changePassword);
      toast.success(response.data.body.message);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.body.error.message);
      }
    }
  }

  return (
    <Card className="sm:max-w-sm">
      <CardHeader>
        <CardTitle>Alterar senha</CardTitle>
        <CardDescription>
          Digite a sua senha atual e a nova senha para redefinir as suas
          credenciais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha"
                required
                {...register("password")}
              />
              <ErrorLabel>{errors.password?.message}</ErrorLabel>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                required
                {...register("newPassword")}
              />
              <ErrorLabel>{errors.newPassword?.message}</ErrorLabel>
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            disabled={isLoading || isSubmitting}
            className="mt-10 w-full"
          >
            Salvar alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
