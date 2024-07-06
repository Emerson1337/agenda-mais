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
import { useAppointment } from "@/private/agendamentos/application/hooks/useAppointment";
import { ReloadIcon, MobileIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { stringUtils } from "@/shared/utils/stringUtils";
import { numberUtils } from "@/shared/utils/numberUtils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { AppointmentData } from "@/shared/types/appointment";

export default function AppointmentsList() {
  const { data, isFetching } = useAppointment();
  const [open, setOpen] = useState<boolean>(false);
  const [appointmentFocused, setAppointmentFocused] =
    useState<AppointmentData>();

  if (isFetching) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

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
              <TableHead className="hidden sm:table-cell">Código</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs">{row.code}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(row.date, "dd/MM/yyyy")} às {row.time}
                </TableCell>
                <TableCell className="text-right">
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
        confirm={() => setOpen(false)}
        dismiss={() => setOpen(false)}
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
            <div className="mb-4 flex  items-center">
              <span className="font-semibold">Phone:</span>
              <Button variant={"link"}>
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
