import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    username: z.string().min(1, "Nome do negócio é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });

export type ISignUpRequest = z.infer<typeof SignUpSchema>;
