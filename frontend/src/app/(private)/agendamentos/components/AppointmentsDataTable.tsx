"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
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
import { AppointmentModal } from "./AppointmentModal";
import { AppointmentTableBody } from "./AppointmentTableBody";
import { AppointmentTableHeader } from "./AppointmentTableHeader";

export function AppointmentsDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data } = useAppointment();
  const [open, setOpen] = React.useState<boolean>(false);
  const [appointmentFocused, setAppointmentFocused] =
    React.useState<AppointmentData>();

  const columns: ColumnDef<AppointmentData>[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-2 m-0"
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serviço
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
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
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="p-2 m-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Valor
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
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

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Atendimentos agendados</CardTitle>
        <CardDescription>
          Estes são todos os agendamentos em aberto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <AppointmentTableHeader table={table} />
          <AppointmentTableBody table={table} />
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount() === 0 ? 1 : table.getPageCount()}.
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
      <AppointmentModal
        appointmentFocused={appointmentFocused}
        open={open}
        onDismiss={() => setOpen(false)}
      />
    </Card>
  );
}
