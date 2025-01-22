import * as z from "zod";

export enum AppointmentStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
  MISSED = "MISSED",
}

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
  id: z.string(),
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

export const UpdateFinishedAppointmentSchema = z.object({
  code: z.string(),
  status: z.string(),
});
export type UpdateFinishedAppointmentData = z.infer<
  typeof UpdateFinishedAppointmentSchema
>;

export const FinishedAppointmentSchema = z.object({
  id: z.string(),
  managerId: z.string(),
  phone: z.string(),
  price: z.number(),
  date: z.string(),
  serviceName: z.string(),
  code: z.string(),
  clientName: z.string(),
  notes: z.string(),
  timeDurationInMinutes: z.number(),
  status: z.enum([
    AppointmentStatus.ACTIVE,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.FINISHED,
    AppointmentStatus.MISSED,
  ]),
  time: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type FinishedAppointmentData = z.infer<typeof FinishedAppointmentSchema>;
