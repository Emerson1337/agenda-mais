"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  MobileIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppointment } from "../hooks/useAppointment";
import { AppointmentData } from "@/shared/types/appointment";
import { Badge } from "@/components/ui/badge";
import { stringUtils } from "@/shared/utils/stringUtils";
import { numberUtils } from "@/shared/utils/numberUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { useBusinessContext } from "@/app/(private)/utils/context/BusinessDataContext";
import { WhatsappService } from "@/shared/services/whatsapp.service";
import { useAppointmentMutation } from "@/app/(private)/agendamentos/hooks/useAppointmentMutation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Modal } from "@/components/ui/modal";

const ONE_SECOND = 1000;

const columnLabels: Record<string, string> = {
  clientName: "Cliente",
  time: "Hora",
  phone: "Telefone",
  serviceName: "Serviço",
  servicePrice: "Valor",
  date: "Data",
  code: "Código",
  actions: "Ações",
};

const hiddenColumns = ["phone", "time"];

export function ServicesDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data } = useAppointment();

  const { mutateAsync } = useAppointmentMutation();
  const [open, setOpen] = React.useState<boolean>(false);
  const [appointmentFocused, setAppointmentFocused] =
    React.useState<AppointmentData>();
  const { id: managerId } = useBusinessContext();

  const columns: ColumnDef<AppointmentData>[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cliente
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>
          <div className="font-medium">
            {row.getValue<AppointmentData["clientName"]>("clientName")}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {stringUtils.addPhoneMask(
              row.getValue<AppointmentData["phone"]>("phone")
            )}
          </div>
        </>
      ),
    },
    {
      id: "time",
      accessorKey: "time",
      header: undefined,
      cell: undefined,
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: undefined,
      cell: undefined,
    },
    {
      id: "serviceName",
      accessorKey: "service",
      header: () => <div>Serviço</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.getValue<AppointmentData["service"]>("serviceName").name}
          </div>
        );
      },
    },
    {
      id: "servicePrice",
      accessorKey: "service",
      header: () => <div className="flex justify-center w-full">Valor</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium flex justify-center">
            {numberUtils.convertToMonetaryBRL(
              row.getValue<AppointmentData["service"]>("servicePrice").price
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <div className="flex justify-center w-full">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Data
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="font-medium flex items-center justify-center flex-col">
            <div>{format(parseISO(row.getValue("date")), "dd/MM/yyyy")}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {row.getValue<AppointmentData["time"]>("time")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "code",
      header: () => {
        return <div className="flex justify-center w-full">Código</div>;
      },
      cell: ({ row }) => (
        <div className="font-medium flex justify-center">
          <Badge className="text-xs capitalize">{row.getValue("code")}</Badge>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => {
              setOpen(true);
              setAppointmentFocused(row.original);
            }}
          >
            Detalhes
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
        <CardTitle>
          <div className="flex justify-between">
            <span>Serviços oferecidos</span>
            <div>
              <Button className="font-bold flex gap-2 uppercase">
                <PlusIcon className="h-5 w-5" />
                Adicionar Serviço
              </Button>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          Estes são todos os serviços disponíveis para agendamento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrar clientes..."
              value={
                (table.getColumn("clientName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("clientName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      column.getCanHide() && !hiddenColumns.includes(column.id)
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {columnLabels[column.id] || column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
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
