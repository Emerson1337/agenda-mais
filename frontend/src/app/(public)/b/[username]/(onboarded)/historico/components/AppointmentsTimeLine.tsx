"use client";

import React from "react";
import { AppointmentHistory } from "@/actions/fetchPhoneHistory";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { dateUtils } from "@/shared/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { TrashIcon, CalendarIcon } from "@radix-ui/react-icons";
import StatusBadge from "@/components/ui/badge-status";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AppointmentStatus } from "@/shared/types/appointment";
interface Props {
  appointmentsHistory: AppointmentHistory[];
}

const AppointmentsTimeLine = ({ appointmentsHistory }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <>
      {appointmentsHistory.map((appointment, index) => (
        <motion.ol
          key={index}
          className={cn("relative border-gray-200", {
            "border-s dark:border-gray-700":
              index !== appointmentsHistory.length - 1,
          })}
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <li className={"mb-2 ms-6"}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary">
              <CalendarIcon className="w-4 h-4 text-primary-foreground" />
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {appointment.serviceName}
              <StatusBadge variant={appointment.status} />
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {format(parseISO(appointment.date), "dd/MM/yyyy")} -{" "}
              {appointment.time}
            </time>
            <p className="mb-1 text-base font-normal text-gray-500 dark:text-gray-400">
              Duração:{" "}
              {appointment.timeDurationInMinutes
                ? dateUtils.convertToTime(appointment.timeDurationInMinutes)
                : "-"}
            </p>
            {appointment.notes && (
              <p className="mb-4 text-base text-gray-500 dark:text-gray-400">
                <span className="font-bold"> Obs:</span>{" "}
                <span className="font-light">{appointment.notes}</span>
              </p>
            )}
            {[AppointmentStatus.ACTIVE].includes(appointment.status) && (
              <Button
                variant="destructive"
                onClick={() => {
                  router.push(`cancelar?code=${appointment.code}`);
                }}
              >
                <TrashIcon className="w-4 h-4 me-1" />
                Cancelar
              </Button>
            )}
          </li>
        </motion.ol>
      ))}
    </>
  );
};

export default AppointmentsTimeLine;
