import { useContext, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { SocialNetwork } from "./SocialNetwork";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { useAvailableTimesFacade } from "../../application/times-available.facade";
import { useBusinessContext } from "../../application/context/BusinessDataContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TimesAvailable } from "@/shared/types/times-available";
import { ptBR } from "date-fns/locale";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/router";

const LayoutOne = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<TimesAvailable>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const { business } = useBusinessContext();
  const [open, setOpen] = useState<boolean>(false);

  const { datesAvailable, data } = useAvailableTimesFacade({
    username: business.username,
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const finish = () => {
    // {
    //   "clientName": "Emerson",
    //   "phone": "+5585986160705",
    //   "scheduleId": "663c246b1811ea88abd74230",
    //   "serviceId": "65f384cd22cfa592ab35d0f6",
    //   "time": "18:00",
    //   "notes": "notes",
    //   "date": "2024-05-21"
    // }

    console.log(selectedDate);
    console.log(selectedTime);
  };

  return (
    <div className="h-screen w-full flex flex-wrap items-center justify-center">
      <div className="w-full h-screen shadow-lg transform duration-200 easy-in-out">
        <div className="h-32 overflow-hidden">
          <div className="absolute inset-x-0 top-16 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
          <Image
            className="w-full"
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col items-center justify-center px-5 -mt-12 z-50">
          <Image
            className="h-32 w-32 bg-background p-2 rounded-full relative"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            width={200}
            height={200}
          />
          <div className="flex gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold text-xs text-green-500">
              Atendendo agora
            </span>
          </div>
        </div>
        <div className="px-14 mt-8">
          <div className="text-center mb-8">
            <p className="text-secondary-foreground text-xs font-thin">
              Serviço de qualidade e os melhores cortes de cabelo que você pode
              encontrar!
            </p>
          </div>
        </div>

        <div className="flex justify-center h-98">
          <Calendar
            locale={ptBR}
            classNames={{
              day: "m-1 p-2 rounded-lg w-10",
              day_disabled: "bg-secondary",
              cell: "w-12",
              head_cell: "w-12 font-light text-xs",
            }}
            mode="multiple"
            selected={datesAvailable}
            onDayClick={(date) => {
              const dateAvailable = data?.find(
                (dateAvailable) =>
                  parseISO(dateAvailable.date).getTime() === date.getTime()
              );
              if (dateAvailable) {
                setSelectedDate(dateAvailable);
                setOpen(true);
                setSelectedTime(undefined);
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
                  format(selectedDate.date, "EEEE, dd/MM/yyyy")}
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
              <div className="my-4 text-center font-thin">
                Horário selecionado: <strong>{selectedTime}</strong>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={finish} className="text-foreground">
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="w-full flex items-center justify-center mt-8 absolute bottom-10">
          <SocialNetwork className="text-white h-8" />
        </div>
      </div>
    </div>
  );
};

export default LayoutOne;
