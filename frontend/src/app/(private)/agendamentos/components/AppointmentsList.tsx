"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppointment } from "@/app/(private)/agendamentos/hooks/useAppointment";
import { ReloadIcon, MobileIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { stringUtils } from "@/shared/utils/stringUtils";
import { numberUtils } from "@/shared/utils/numberUtils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { AppointmentData } from "@/shared/types/appointment";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { useAppointmentMutation } from "@/app/(private)/agendamentos/hooks/useAppointmentMutation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useBusinessContext } from "@/app/(private)/utils/context/BusinessDataContext";

const ONE_SECOND = 1000;

export default function AppointmentsList() {
  const { data, isFetching } = useAppointment();
  const { mutateAsync } = useAppointmentMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [appointmentFocused, setAppointmentFocused] =
    useState<AppointmentData>();
  const { id: managerId } = useBusinessContext();

  if (isFetching)
    return <ReloadIcon className="mr-2 h-4 animate-spin w-full" />;

  const handleCancelAppointment = async (appointment: AppointmentData) => {
    try {
      const response = await mutateAsync({
        managerId: managerId,
        appointmentId: appointment._id,
      });

      toast.success(response.data.body.message);
      setOpen(false);
      setTimeout(() => {
        WhatsappService.warnCancelAppointment({
          name: appointment?.clientName,
          code: appointment?.code,
          day: format(appointment?.date, "dd/MM/yyyy"),
          time: appointment?.time,
          phone: appointment.phone,
        });
      }, ONE_SECOND);
    } catch (error: AxiosError | any) {
      toast.error(
        error?.response?.data?.message || "Erro ao cancelar agendamento"
      );
    }
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Atendimentos agendados</CardTitle>
        <CardDescription>
          Estes são todos os agendamentos em aberto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Serviço</TableHead>
              <TableHead className="hidden md:table-cell">Código</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-right hidden md:table-cell">
                Valor
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-muted-foreground"
                >
                  Nenhum agendamento encontrado.
                </TableCell>
              </TableRow>
            )}
            {data?.map((row, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-accent" : ""}
              >
                <TableCell>
                  <div className="font-medium">{row.clientName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {stringUtils.addPhoneMask(row.phone)}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {row.service.name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className="text-xs">{row.code}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  {format(parseISO(row.date), "dd/MM/yyyy")} - {row.time}
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  {numberUtils.convertToMonetaryBRL(row.service.price)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setAppointmentFocused(row);
                    }}
                  >
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Modal
        open={open}
        confirm={() => {
          setOpen(false);
        }}
        dismiss={() =>
          appointmentFocused && handleCancelAppointment(appointmentFocused)
        }
        cancelStyle="bg-destructive"
        title={"Detalhes do agendamento"}
        cancelButton="Cancelar agendamento"
        confirmButton="Fechar"
      >
        {appointmentFocused && (
          <div className="p-4">
            <div className="mb-4">
              <span className="font-semibold">Cliente:</span>{" "}
              {appointmentFocused.clientName}
            </div>
            <div className="mb-4 flex items-center">
              <span className="font-semibold">Phone:</span>
              <Button
                variant={"link"}
                onClick={() =>
                  WhatsappService.openChatWith(appointmentFocused.phone)
                }
              >
                <MobileIcon />
                {stringUtils.addPhoneMask(appointmentFocused.phone)}
              </Button>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Serviço:</span>{" "}
              {appointmentFocused.service.name}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Código:</span>{" "}
              {appointmentFocused.code}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Data:</span>{" "}
              {format(appointmentFocused.date, "dd/MM/yyyy")} às{" "}
              {appointmentFocused.time}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Valor:</span>{" "}
              {numberUtils.convertToMonetaryBRL(
                appointmentFocused.service.price
              )}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Observações: </span>
              {appointmentFocused.notes}
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}
