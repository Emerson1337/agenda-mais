import * as z from "zod";

export const ChangePasswordSchema = z.object({
  password: z.string(),
  newPassword: z
    .string()
    .min(8, "A nova senha deve ter no mínimo 8 caracteres.")
    .regex(/[A-Z]/, "A nova senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A nova senha deve conter pelo menos uma letra minúscula.")
    .regex(/\d/, "A nova senha deve conter pelo menos um número.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "A nova senha deve conter pelo menos um caractere especial.",
    ),
});
export type IChangePasswordRequest = z.infer<typeof ChangePasswordSchema>;
