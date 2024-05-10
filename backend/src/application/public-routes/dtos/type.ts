import { Schedules } from '@/domain/entities/schedules.entity';
import { ManagerServices } from '@/domain/entities/manager-services.entity';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';

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
