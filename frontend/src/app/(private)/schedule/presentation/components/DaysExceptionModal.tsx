import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

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
  const [timesAvailable, setTimesAvailable] = useState<string[]>(times);

  const reset = () => {
    setTimesAvailable(times);
  };

  return (
    <AlertDialog onOpenChange={reset} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Definir indisponibilidade</AlertDialogTitle>
        </AlertDialogHeader>
        <>
          <span className="mb-4">
            Desmarque os horários que você não estará disponível no dia{" "}
            {format(date, "dd/MM/yyyy")}.
          </span>
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={timesAvailable}
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
          <span className="flex justify-center mb-4">
            <Button
              onClick={() => setTimesAvailable([])}
              variant="destructive"
              className="self-center"
            >
              Desmarcar todos os dias
            </Button>
          </span>
        </>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dismiss(date)}>
            Descartar
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-foreground"
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
