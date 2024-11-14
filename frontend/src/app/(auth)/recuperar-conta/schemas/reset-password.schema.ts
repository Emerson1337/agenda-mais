import * as z from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A nova senha deve ter no mínimo 8 caracteres.")
      .regex(
        /[A-Z]/,
        "A nova senha deve conter pelo menos uma letra maiúscula."
      )
      .regex(
        /[a-z]/,
        "A nova senha deve conter pelo menos uma letra minúscula."
      )
      .regex(/\d/, "A nova senha deve conter pelo menos um número.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "A nova senha deve conter pelo menos um caractere especial."
      ),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"], // Set the error on the confirmPassword field
  });

export type IResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;

export const ResetLinkSchema = z.object({
  email: z.string().email("Email inválido"),
});
export type IResetLinkRequest = z.infer<typeof ResetLinkSchema>;
