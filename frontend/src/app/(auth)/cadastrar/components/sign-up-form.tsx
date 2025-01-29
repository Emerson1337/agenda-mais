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
import { useSignUpMutation } from "@/app/(auth)/cadastrar/hooks/useSignUpMutation";
import {
  ISignUpRequest,
  SignUpSchema,
} from "@/app/(auth)/cadastrar/schemas/signup.schema";
import { stringUtils } from "@/shared/utils/stringUtils";
import { PhoneInput } from "@/components/ui/phone-input";
import { AxiosError } from "axios";
import Captcha from "@/components/ui/Captcha/captcha";
import { useState } from "react";
import { toast } from "react-toastify";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className }: UserAuthFormProps) {
  const { mutateAsync } = useSignUpMutation();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState<number>(0);
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
    if (!recaptchaToken) {
      return toast.error("Por favor, complete o captcha.");
    }

    try {
      await mutateAsync({
        ...signUpForm,
        username: formattedName,
        recaptchaToken,
      });
      router.push("/login");
    } catch (error: unknown) {
      setCaptchaKey((prevKey) => prevKey + 1);
      setRecaptchaToken(null);

      if (error instanceof AxiosError) {
        if (error.response?.data.body.error) {
          return toast.error(error.response?.data.body.error.message);
        }

        error.response?.data.body.errors.forEach(
          (err: { name: string; message: string }) => {
            setError(err.name as keyof ISignUpRequest, {
              message: err.message,
            });
          },
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
                  stringUtils.formatBusinessNameForURL(e.target.value),
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
                placeholder="(99)99999-9999"
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
              placeholder="Defina a sua senha"
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
              placeholder="Confirme a sua senha"
              type="password"
              required
              {...register("confirmPassword")}
            />
            <ErrorLabel>{errors.confirmPassword?.message}</ErrorLabel>
          </div>
          <Button
            disabled={isLoading || isSubmitting || !recaptchaToken}
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

        <Captcha
          key={captchaKey}
          className="flex justify-center"
          onChange={setRecaptchaToken}
        />
      </div>
    </form>
  );
}
