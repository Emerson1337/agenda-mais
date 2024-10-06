import * as z from "zod";

export const ServiceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  timeDuration: z.string(),
  managerId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Service = z.infer<typeof ServiceSchema>;

export const AppointmentDataSchema = z.object({
  _id: z.string(),
  managerId: z.string(),
  scheduleId: z.string(),
  serviceId: z.string(),
  time: z.string(),
  clientName: z.string(),
  date: z.string(),
  code: z.string(),
  notes: z.string(),
  phone: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  service: ServiceSchema,
});
export type AppointmentData = z.infer<typeof AppointmentDataSchema>;

export const BookAppointmentSchema = z.object({
  date: z.string(),
  time: z.string(),
  notes: z.string(),
  phone: z.string(),
  clientName: z.string(),
  scheduleId: z.string(),
  serviceId: z.string(),
});
export type BookAppointmentData = z.infer<typeof BookAppointmentSchema>;
