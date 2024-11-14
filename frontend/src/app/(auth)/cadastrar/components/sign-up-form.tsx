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
import { useSignUpMutation } from "../hooks/useSignUpMutation";
import { ISignUpRequest, SignUpSchema } from "../schemas/signup.schema";
import { stringUtils } from "@/shared/utils/stringUtils";
import { PhoneInput } from "@/components/ui/phone-input";
import { AxiosError } from "axios";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const { mutateAsync } = useSignUpMutation();
  const router = useRouter();
  const [formattedName, setFormattedName] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<ISignUpRequest>({
    resolver: zodResolver(SignUpSchema),
  });

  async function handleSignUp(signUpForm: ISignUpRequest) {
    try {
      await mutateAsync({ ...signUpForm, username: formattedName });
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        error.response?.data.body.errors.forEach(
          (err: { name: string; message: string }) => {
            setError(err.name as keyof ISignUpRequest, {
              message: err.message,
            });
          }
        );
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className={className}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Cadastro</h1>
          <p className="text-balance text-muted-foreground">
            Crie a sua conta na plataforma!
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Como devemos te chamar?</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Nome"
              required
              {...register("firstName")}
            />
            <ErrorLabel>{errors.firstName?.message}</ErrorLabel>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do seu negócio</Label>
            <Input
              id="username"
              {...register("username", { required: true })}
              className="w-full"
              onChange={(e) => {
                setFormattedName(
                  stringUtils.formatBusinessNameForURL(e.target.value)
                );
              }}
            />
            {/* Display the formatted example */}
            <p className="text-sm text-gray-500">
              Exemplo de URL:{" "}
              <span className="font-mono">/{formattedName}</span>
            </p>
            <ErrorLabel>{errors.username?.message}</ErrorLabel>
          </div>
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
            <div className="grid gap-3">
              <Label htmlFor="phone">Número de telefone:</Label>
              <PhoneInput
                countries={["BR"]}
                defaultCountry="BR"
                onChange={(value) => setValue("phone", value)}
              />
            </div>
            <ErrorLabel>{errors.phone?.message}</ErrorLabel>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              {...register("password")}
            />
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              {...register("confirmPassword")}
            />
            <ErrorLabel>{errors.confirmPassword?.message}</ErrorLabel>
          </div>
          <Button
            disabled={isLoading || isSubmitting}
            type="submit"
            className="w-full"
          >
            {(isLoading || isSubmitting) && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar conta
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Já possui uma conta?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
