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
import { useFinishedAppointment } from "../hooks/useFinishedAppointment";
import { FinishedAppointmentData } from "@/shared/types/appointment";
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
import { FinishedAppointmentModal } from "./FinishedAppointmentModal";
import { AppointmentTableBody } from "./FinishedAppointmentTableBody";
import { AppointmentTableHeader } from "./FinishedAppointmentTableHeader";
import { translateStatus } from "@/shared/utils/statusParser";
import { AppointmentStatus } from "@/shared/types/appointment";
import { cn } from "@/lib/utils";

export function FinishedAppointmentsDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true }, // Default sorting by date, latest first
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data } = useFinishedAppointment();
  const [open, setOpen] = React.useState<boolean>(false);
  const [finishedAppointmentFocused, setFinishedAppointmentFocused] =
    React.useState<FinishedAppointmentData>();

  const columns: ColumnDef<FinishedAppointmentData>[] = [
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
            {row.getValue<FinishedAppointmentData["clientName"]>("clientName")}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {stringUtils.addPhoneMask(
              row.getValue<FinishedAppointmentData["phone"]>("phone"),
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
      accessorKey: "serviceName",
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
            {row.getValue<FinishedAppointmentData["serviceName"]>(
              "serviceName",
            )}
          </div>
        );
      },
    },
    {
      id: "price",
      accessorKey: "price",
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
              row.getValue<FinishedAppointmentData["price"]>("price"),
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
              {row.getValue<FinishedAppointmentData["time"]>("time")}
            </div>
          </div>
        );
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-2 m-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium flex justify-center">
          <Badge
            variant="outline"
            className={cn("text-xs capitalize", {
              "bg-green-500":
                row.getValue<FinishedAppointmentData["status"]>("status") ===
                AppointmentStatus.FINISHED,
              "bg-yellow-500":
                row.getValue<FinishedAppointmentData["status"]>("status") ===
                AppointmentStatus.MISSED,
              "bg-red-500":
                row.getValue<FinishedAppointmentData["status"]>("status") ===
                AppointmentStatus.CANCELLED,
            })}
          >
            {
              translateStatus(
                row.getValue<FinishedAppointmentData["status"]>("status"),
              ).label
            }
          </Badge>
        </div>
      ),
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
              setFinishedAppointmentFocused(row.original);
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
    initialState: {
      sorting: [{ id: "date", desc: true }], // Default sort by date (descending)
      pagination: { pageSize: 10 }, // Pagination with 10 rows per page
    },
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
        <CardTitle>Histórico de atendimentos</CardTitle>
        <CardDescription>
          Confira o histórico de agendamentos. Caso algum agendamento tenha sido
          finalizado e o cliente não compareceu, clique em detalhes e marque-o
          como ausnete para manter seus relatórios acurados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <AppointmentTableHeader table={table} />
          <AppointmentTableBody table={table} />
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
      <FinishedAppointmentModal
        finishedAppointmentFocused={finishedAppointmentFocused}
        open={open}
        onDismiss={() => setOpen(false)}
      />
    </Card>
  );
}
