import * as z from "zod";

export const ServiceDataSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  price: z.number({ required_error: "Campo obrigatório" }),
  description: z.string().min(1, "Campo obrigatório"),
  timeDurationInMinutes: z.number({ required_error: "Campo obrigatório" }),
});

export type ServiceData = z.infer<typeof ServiceDataSchema> & { id: string };
