import React from "react";
import { translateStatus } from "@/shared/utils/statusParser";
import { cn } from "@/lib/utils";
import { AppointmentStatus } from "@/shared/types/appointment";

type StatusBadgeProps = {
  variant: AppointmentStatus;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ variant }) => {
  const { label, status } = translateStatus(variant);

  return (
    <span
      className={cn(
        "text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3",
        status === AppointmentStatus.ACTIVE &&
          "bg-primary text-primary-foreground",
        status === AppointmentStatus.CANCELLED &&
          "bg-destructive text-destructive-foreground",
        status === AppointmentStatus.MISSED &&
          "bg-yellow-500 text-destructive-foreground",
        status === AppointmentStatus.FINISHED && "bg-gray-100 text-gray-800",
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
