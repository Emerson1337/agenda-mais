import * as z from "zod";

export const ServiceDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  timeDurationInMinutes: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type ServiceData = z.infer<typeof ServiceDataSchema>;
