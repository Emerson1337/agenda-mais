"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { AxiosError } from "axios";
import { ILoginRequest, LoginSchema } from "../schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLabel } from "@/components/ui/error-label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useRefreshTokenMutation } from "../hooks/useRefreshTokenMutation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { mutateAsync } = useLoginMutation();
  const { mutateAsync: mutateRefreshTokenAsync } = useRefreshTokenMutation();
  const router = useRouter();

  const setTokensToStorage = ({
    token,
    refreshToken,
  }: {
    token: string;
    refreshToken: string;
  }) => {
    localStorage.setItem("authorization", `Bearer ${token}`);
    localStorage.setItem("refresh", `${refreshToken}`);
  };

  React.useLayoutEffect(() => {
    const checkSession = async () => {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        const response = await mutateRefreshTokenAsync({
          refreshToken,
        });

        setTokensToStorage({
          token: response.access_token,
          refreshToken: response.refresh_token,
        });
        router.replace("/dashboard");
      }
    };

    checkSession();
  }, [mutateRefreshTokenAsync, router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  async function handleLogin(loginForm: ILoginRequest) {
    try {
      const response = await mutateAsync(loginForm);
      setTokensToStorage({
        token: response.access_token,
        refreshToken: response.refresh_token,
      });
      router.replace("/dashboard");
    } catch (error: AxiosError | any) {
      if (error?.response?.status === 401) {
        setError("email", {
          message: error.response.data.body.errors[0].message,
        });
        setError("password", {
          message: error.response.data.body.errors[0].message,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="mx-auto grid w-[350px] gap-6">
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
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Input
              {...register("password")}
              id="password"
              type="password"
              required
            />
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          </div>
          <Button
            disabled={isLoading || isSubmitting}
            type="submit"
            className="w-full"
          >
            {(isLoading || isSubmitting) && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
          {/* <Button variant="outline" className="w-full">
            {Icon.Google("w-6 h-6 mr-2")}
            Entrar com Google
          </Button> */}
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
