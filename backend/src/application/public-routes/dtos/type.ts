import { Schedules } from '@/domain/entities/schedules.entity';
import { ManagerServices } from '@/domain/entities/manager-services.entity';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import { CreateAppointmentDto } from './create-appointment-dto';
import { Appointments } from '@/domain/entities/appointment.entity';

export interface ISlots {
  date: string;
  times: string[];
}

export interface ICheckTimeAvailability {
  id: string;
  time: string;
  managerId: string;
  date: string;
}

export interface ITimeAvailability {
  isTimeAvailable: boolean;
  schedule?: Schedules;
}

export interface ICreateDateAndTimeSlots {
  schedule: Schedules;
  monthsAhead: number;
}

export interface IBusinessData {
  services: ManagerServices[];
  business: BookingManagers;
  layout: string;
}

export interface IBookAppointment {
  username: string;
  appointmentData: CreateAppointmentDto;
}

export interface IOBookAppointment {
  appointment: Appointments;
  message: string;
}

export interface IGetSlotAvailable {
  username: string;
}

export interface ICancel {
  username: string;
  appointmentCode: string;
  phone: string;
}

export interface IOCancel {
  appointment: Appointments;
  message: string;
}
