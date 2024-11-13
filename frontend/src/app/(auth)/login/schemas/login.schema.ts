import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Por favor, forneça um e-mail válido."),
  password: z.string(),
});
export type ILoginRequest = z.infer<typeof LoginSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});
export type IRefreshTokenRequest = z.infer<typeof RefreshTokenSchema>;
