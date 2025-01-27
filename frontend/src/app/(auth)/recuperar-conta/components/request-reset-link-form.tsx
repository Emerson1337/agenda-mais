"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLabel } from "@/components/ui/error-label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
  IResetLinkRequest,
  ResetLinkSchema,
} from "@/app/(auth)/recuperar-conta/schemas/reset-password.schema";
import { useResetLinkMutation } from "@/app/(auth)/recuperar-conta/hooks/useResetLinkMutation";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import Link from 'next/link';

interface ResetLinkFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetLinkForm({}: ResetLinkFormProps) {
  const { mutateAsync } = useResetLinkMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<IResetLinkRequest>({
    resolver: zodResolver(ResetLinkSchema),
  });

  async function handleResetLink(resetForm: IResetLinkRequest) {
    try {
      await mutateAsync(resetForm);
      toast.success("Link enviado com sucesso! Confira o seu e-mail.");
      router.push("/login");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 422) {
          return setError("email", {
            message: error.response.data.body.error.message,
          });
        }

        return toast.error("Algo deu errado. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleResetLink)}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Recuperar conta</h1>
          <p className="text-balance text-muted-foreground">
            Digite o email associado a sua conta
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o seu email"
              required
              {...register("email")}
            />
            <ErrorLabel>{errors.email?.message}</ErrorLabel>
          </div>
          <Button
            disabled={isLoading || isSubmitting}
            type="submit"
            className="w-full"
          >
            {(isLoading || isSubmitting) && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Solicitar link de recuperação
          </Button>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="inline-block text-sm underline"
            >
              Lembrou? Faça login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
