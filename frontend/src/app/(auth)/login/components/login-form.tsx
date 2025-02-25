"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLoginMutation } from "@/app/(auth)/login/hooks/useLoginMutation";
import {
  ILoginRequest,
  LoginSchema,
} from "@/app/(auth)/login/schemas/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLabel } from "@/components/ui/error-label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import applyErrorsToForm, { isAxiosResponse } from "@/shared/utils/errorUtils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from 'react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className }: UserAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutateAsync, isPending } = useLoginMutation();

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    if (email && password) {
      handleLogin({ email, password });
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      password: searchParams.get("password") || "",
    },
  });

  async function handleLogin(loginForm: ILoginRequest) {
    try {
      await mutateAsync(loginForm);
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosResponse(error)) {
        return applyErrorsToForm(setError, error.data);
      }
      console.error(error);

      toast.error("Erro ao fazer login, tente novamente mais tarde");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className={cn("mx-auto grid w-[350px] gap-6", className)}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Digite seu e-mail abaixo para acessar sua conta
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@exemplo.com"
              required
              {...register("email")}
            />
            <ErrorLabel>{errors.email?.message}</ErrorLabel>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link
                href="/recuperar-conta"
                className="ml-auto inline-block text-sm underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Digite sua senha"
              required
            />
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          </div>
          <Button
            disabled={isLoading || isSubmitting || isPending}
            type="submit"
            className="w-full"
          >
            {(isLoading || isSubmitting || isPending) && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/cadastrar" className="underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </form>
  );
}
