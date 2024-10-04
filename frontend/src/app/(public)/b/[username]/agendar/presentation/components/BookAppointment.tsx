import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BusinessSchedule, Slots } from "@/shared/types/times-available";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ptBR } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { BookAppointmentData, Service } from "@/shared/types/appointment";

// Define the interface for the component props
interface BookAppointmentProps {
  datesAvailable: Slots[];
  selectedDate?: Slots;
  setSelectedDate: (date: Slots) => void;
  selectedTime?: string;
  setSelectedTime: (time?: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  finish: (data: Omit<BookAppointmentData, "scheduleId" | "serviceId">) => void;
  selectedService?: Service;
  moveBack: () => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({
  datesAvailable,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  open,
  setOpen,
  finish,
  moveBack,
}) => {
  // State for the note in the Textarea
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Retrieve client information from localStorage
  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const phone = localStorage.getItem("phone") || "";
    setClientName(name);
    setClientPhone(phone);
  }, []);

  return (
    <>
      <Button onClick={moveBack} className="flex gap-2 justify-between">
        <ArrowLeftIcon /> <span className="font-bold">Voltar</span>
      </Button>
      <div className="flex justify-center h-98 mt-8">
        <Calendar
          locale={ptBR}
          classNames={{
            day: "m-1 p-2 rounded-lg w-10",
            day_disabled: "bg-secondary",
            cell: "w-12",
            head_cell: "w-12 font-light text-xs",
          }}
          mode="multiple"
          selected={datesAvailable.map((date) => parseISO(date.date))}
          onDayClick={(date) => {
            const dateAvailable = datesAvailable.find(
              (dateAvailable) =>
                parseISO(dateAvailable.date).getTime() === date.getTime()
            );
            if (dateAvailable) {
              setSelectedDate(dateAvailable);
              setOpen(true);
              setSelectedTime(undefined);
              setNotes(""); // Reset note on date change
            }
          }}
          className="rounded-md border shadow"
        />
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Selecione o horário</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-4 text-center font-thin">
            Agendamento para{" "}
            <strong>
              {selectedDate?.date &&
                format(parseISO(selectedDate.date), "EEEE, dd/MM/yyyy", {
                  locale: ptBR,
                })}
            </strong>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            className="justify-center max-w-screen-sm flex-wrap"
            defaultValue={selectedTime}
            onValueChange={(time) => {
              setSelectedTime(time);
            }}
          >
            {selectedDate?.times.map((time, key) => (
              <ToggleGroupItem value={time} className="m-1" key={key}>
                {time}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {selectedTime && (
            <div>
              <div className="my-4 text-center font-thin">
                Horário selecionado: <strong>{selectedTime}</strong>
              </div>
              <span className="block my-4 text-center font-thin">
                Deseja adicionar alguma observação?
              </span>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!selectedDate || !selectedTime}
              onClick={() =>
                selectedDate &&
                selectedTime &&
                finish({
                  date: selectedDate.date,
                  time: selectedTime,
                  notes,
                  clientName: clientName,
                  phone: clientPhone,
                })
              }
              className="text-primary-foreground"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookAppointment;
