"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useReactTable,
  getPaginationRowModel,
  getCoreRowModel,
  ColumnDef,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { useService } from "../hooks/useService";
import { ServiceData } from "@/shared/types/service";
import { ServiceModal } from "./ServiceModal";
import { ServiceTableHeader } from "./ServiceTableHeader";
import { ServiceTableBody } from "./ServiceTableBody";
import { numberUtils } from "@/shared/utils/numberUtils";
import { dateUtils } from "@/shared/utils/dateUtils";

export function ServicesDataTable() {
  const { data } = useService();
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [openServiceModal, setOpenServiceModal] =
    React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<
    "create" | "edit" | "delete"
  >("create");
  const [serviceFocused, setServiceFocused] = React.useState<
    Partial<ServiceData> | undefined
  >();

  const columns: ColumnDef<ServiceData>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="p-2 m-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue<ServiceData["name"]>("name")}
        </div>
      ),
    },
    {
      id: "price",
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            className="p-2 m-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Preço
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue<ServiceData["price"]>("price") !== undefined &&
            numberUtils.convertToMonetaryBRL(
              row.getValue<ServiceData["price"]>("price"),
            )}
        </div>
      ),
    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            className="p-2 m-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue<ServiceData["description"]>("description")}
        </div>
      ),
    },
    {
      id: "timeDurationInMinutes",
      accessorKey: "timeDurationInMinutes",
      header: ({ column }) => {
        return (
          <Button
            className="p-2 m-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tempo
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">
          {dateUtils.convertToTime(
            row.getValue<ServiceData["timeDurationInMinutes"]>(
              "timeDurationInMinutes",
            ),
          )}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                handleEdit(row.original);
              }}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete(row.original);
              }}
            >
              Remover
            </Button>
          </div>
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

  function handleCreate() {
    setServiceFocused(undefined);
    setModalType("create");
    setOpenServiceModal(true);
  }

  function handleEdit(service: ServiceData) {
    setServiceFocused(service);
    setModalType("edit");
    setOpenServiceModal(true);
  }

  function handleDelete(service: ServiceData) {
    setServiceFocused(service);
    setModalType("delete");
    setOpenServiceModal(true);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between gap-4 flex-col sm:flex-row">
              <div className="flex gap-3 flex-col">
                <CardTitle>Serviços</CardTitle>
                <CardDescription>Gerencie seus serviços</CardDescription>
              </div>
              <div>
                <Button
                  className="font-bold flex gap-2 uppercase"
                  onClick={() => handleCreate()}
                >
                  <PlusIcon className="h-5 w-5" />
                  Adicionar Serviço
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceTableHeader table={table} />
          <ServiceTableBody table={table} />
          <div className="flex items-center justify-end space-x-2 p-4">
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
        </CardContent>
      </Card>
      <ServiceModal
        key={modalType}
        open={openServiceModal}
        onClose={() => {
          setOpenServiceModal(false);
          setServiceFocused(undefined);
        }}
        modalType={modalType}
        serviceFocused={serviceFocused}
      />
    </>
  );
}
