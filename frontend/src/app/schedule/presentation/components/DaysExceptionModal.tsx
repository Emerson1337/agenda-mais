import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format } from "date-fns";

export interface DaysExceptionModalProps {
  open: boolean;
  dismiss: (date?: Date) => void;
  onConfirm: (timesAvailable: string[]) => void;
  date: Date;
  times: string[];
}

export function DaysExceptionModal({
  open,
  dismiss,
  onConfirm,
  date,
  times,
}: DaysExceptionModalProps) {
  const [timesAvailable, setTimesAvailable] = useState<string[]>();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Definir indisponibilidade</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mb-4">
              Desmarque os horários que você não estará disponível no dia{" "}
              {format(date, "dd/MM/yyyy")}.
            </div>
            <ToggleGroup
              type="multiple"
              variant="outline"
              defaultValue={times}
              className="justify-center max-w-screen-sm mb-6 flex-wrap"
              onValueChange={(value) => {
                setTimesAvailable(value);
              }}
            >
              {times.map((time, key) => (
                <ToggleGroupItem className="m-1" key={key} value={time}>
                  {time}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dismiss(date)}>
            Descartar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={
              !timesAvailable || times.length === timesAvailable?.length
            }
            onClick={() => timesAvailable && onConfirm(timesAvailable)}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
