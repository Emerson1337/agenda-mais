"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLabel } from "@/components/ui/error-label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/app/(auth)/recuperar-conta/hooks/useResetPasswordMutation";
import {
  IResetPasswordRequest,
  ResetPasswordSchema,
} from "@/app/(auth)/recuperar-conta/schemas/reset-password.schema";
import { toast } from "react-toastify";
import applyErrorsToForm, { isAxiosResponse } from "@/shared/utils/errorUtils";

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { mutateAsync } = useResetPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<IResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  async function handleResetPassword(resetForm: IResetPasswordRequest) {
    try {
      await mutateAsync(resetForm);
      toast.success(
        "Senha alterada com sucesso. Você será redirecionado para o login.",
      );
      router.push("/login");
    } catch (error) {
      if (isAxiosResponse(error)) {
        return applyErrorsToForm(setError, error.data);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Redefinir Senha</h1>
          <p className="text-balance text-muted-foreground">
            Digite sua nova senha abaixo
          </p>
        </div>
        <div className="grid gap-4">
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
              {...register("confirmPassword")}
            />
            <ErrorLabel>{errors.confirmPassword?.message}</ErrorLabel>
          </div>
          <Input
            id="token"
            defaultValue={token}
            className="hidden"
            {...register("token")}
          />
          <Button
            disabled={isLoading || isSubmitting}
            type="submit"
            className="w-full"
          >
            {(isLoading || isSubmitting) && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Redefinir Senha
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Lembrou da senha?{" "}
          <Link href="/login" className="underline">
            Faça login
          </Link>
        </div>
      </div>
    </form>
  );
}
