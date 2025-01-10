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
import { Slot } from "@/shared/types/times-available";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { BookAppointmentData, Service } from "@/shared/types/appointment";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { useClientInfo } from "@/lib/hooks";

// Define the interface for the component props
interface BookAppointmentProps {
  datesAvailable: Slot[];
  selectedDate?: Slot;
  setSelectedDate: (date: Slot) => void;
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
  const { clientName, setClientName, clientPhone, setClientPhone } =
    useClientInfo();
  const [notes, setNotes] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Handle calendar day click
  const handleDayClick = (date: Date) => {
    const dateAvailable = datesAvailable.find(
      (dateAvailable) =>
        parseISO(dateAvailable.date).getTime() === date.getTime(),
    );

    if (dateAvailable) {
      setSelectedDate(dateAvailable);
      setOpen(true);
      setSelectedTime(undefined);
      setNotes("");
    }
  };

  // Format the selected date for display
  const formattedSelectedDate =
    selectedDate?.date &&
    format(parseISO(selectedDate.date), "EEEE, dd/MM/yyyy", { locale: ptBR });

  // Handle form submission and open confirmation dialog
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    setConfirmOpen(true); // Open confirmation modal
    setOpen(false); // Close the main dialog
  };

  const handleConfirmModalBack = () => {
    setConfirmOpen(false);
    setOpen(true);
  };

  // Finalize appointment
  const handleFinalize = () => {
    finish({
      date: selectedDate?.date || "", // Provide a default value if undefined
      time: selectedTime || "", // Provide a default value if undefined
      notes,
      clientName,
      phone: clientPhone,
    });
    setConfirmOpen(false); // Close confirmation modal
    setOpen(false); // Close the main dialog
  };

  return (
    <>
      {/* Back Button */}
      <div className="w-full flex justify-center mt-6">
        <Button onClick={moveBack} className="flex gap-2 justify-between">
          <ArrowLeftIcon /> <span className="font-bold">Voltar</span>
        </Button>
      </div>

      {/* Calendar */}
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
          onDayClick={handleDayClick}
          className="rounded-md border shadow"
        />
      </div>

      {/* Alert Dialog for Selecting Time */}
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Selecione o horário</AlertDialogTitle>
          </AlertDialogHeader>

          {/* Selected Date Display */}
          <div className="my-4 text-center font-thin">
            Agendamento para <strong>{formattedSelectedDate}</strong>
          </div>

          {/* Time Selection */}
          <ToggleGroup
            type="single"
            variant="outline"
            className="justify-center max-w-screen-sm flex-wrap"
            defaultValue={selectedTime}
            onValueChange={setSelectedTime}
          >
            {selectedDate?.times.map((time, index) => (
              <ToggleGroupItem value={time} className="m-1" key={index}>
                {time}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {/* Note Input and Confirmation */}
          {selectedTime && (
            <>
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
            </>
          )}

          {/* Dialog Footer with Actions */}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={
                !selectedDate || !selectedTime || !clientName || !clientPhone
              }
              onClick={handleConfirm}
              className="text-primary-foreground"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirme os Dados</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-4 text-center flex flex-col gap-2">
            <p>
              <strong>Data:</strong>
              <span className="font-thin"> {formattedSelectedDate}</span>
            </p>
            <p>
              <strong>Horário:</strong>
              <span className="font-thin"> {selectedTime}</span>
            </p>
            <p>
              <strong>Observações:</strong>
              <span className="font-thin"> {notes || "Nenhuma"}</span>
            </p>
            <p className="mt-2 flex flex-col gap-4">
              <strong>Nome:</strong>
              <Input
                onChange={(event) => setClientName(event.target.value)}
                value={clientName}
                className="text-xl text-center"
              />
            </p>
            <p className="mt-2 flex flex-col gap-4">
              <strong>Telefone:</strong>
              <PhoneInput
                value={clientPhone}
                onChange={(value) => setClientPhone(value)}
                countries={["BR"]}
                defaultCountry="BR"
              />
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConfirmModalBack}>
              Voltar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinalize}
              className="text-primary-foreground"
            >
              Confirmar Agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookAppointment;
