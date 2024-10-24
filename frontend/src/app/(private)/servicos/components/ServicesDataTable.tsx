"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
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
import { useService } from "../hooks/useService";
import { numberUtils } from "@/shared/utils/numberUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Modal } from "@/components/ui/modal";
import { useServiceMutation } from "../hooks/useServiceMutation";
import { ServiceData } from "@/shared/types/service";
import { dateUtils } from "@/shared/utils/dateUtils";
import { TimeDurationSelector } from "./TimeDurationSelector";
import { Textarea } from "@/components/ui/textarea";
import MoneyInput from "@/components/ui/input-monetary";

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

export function ServicesDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data } = useService();

  const {
    delete: deleteMutation,
    update: updateMutation,
    create: createMutation,
  } = useServiceMutation();
  const [openServiceModal, setOpenServiceModal] =
    React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<
    "create" | "edit" | "delete"
  >("create");
  const [serviceFocused, setServiceFocused] =
    React.useState<Partial<ServiceData>>();

  const columns: ColumnDef<ServiceData>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
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
              row.getValue<ServiceData["price"]>("price")
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
              "timeDurationInMinutes"
            )
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
                triggerServiceModal("edit", row.original);
              }}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                triggerServiceModal("delete", row.original);
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

  const handleServiceAction = async () => {
    try {
      if (modalType === "create") {
        await createMutation.mutateAsync({
          ...serviceFocused,
        });
        toast.success("Serviço criado com sucesso!");
      } else if (modalType === "edit") {
        if (serviceFocused?.id) {
          await updateMutation.mutateAsync({
            id: serviceFocused.id,
            updatedData: serviceFocused,
          });
          toast.success("Serviço editado com sucesso!");
        }
      } else if (modalType === "delete") {
        if (serviceFocused?.id) {
          await deleteMutation.mutateAsync({ id: serviceFocused.id });
          toast.success("Serviço removido com sucesso!");
        }
      }
      setOpenServiceModal(false);
    } catch (error: AxiosError | any) {
      toast.error(
        error?.response?.data?.message ||
          "Erro! Confira os dados e tente novamente."
      );
    }
  };

  const triggerServiceModal = (
    type: "create" | "edit" | "delete",
    service?: ServiceData
  ) => {
    setModalType(type);
    setServiceFocused(service);
    setOpenServiceModal(true);
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>
          <div className="flex justify-between">
            <span>Serviços oferecidos</span>
            <div>
              <Button
                className="font-bold flex gap-2 uppercase"
                onClick={() => triggerServiceModal("create")}
              >
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
              placeholder="Filtrar seviços..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
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
                  .filter((column) => column.getCanHide())
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
                        {columnLabels[column.id] ?? column.id}
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
                      Nenhum serviço encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
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

      <Modal
        open={openServiceModal}
        confirm={handleServiceAction}
        dismiss={() => setOpenServiceModal(false)}
        cancelStyle={modalType === "delete" ? "bg-destructive" : ""}
        title={
          modalType === "create"
            ? "Criar novo serviço"
            : modalType === "edit"
            ? "Editar serviço"
            : "Remover serviço"
        }
        cancelButton={modalType === "delete" ? "Cancelar" : "Fechar"}
        confirmButton={
          modalType === "create"
            ? "Criar"
            : modalType === "edit"
            ? "Salvar"
            : "Confirmar exclusão"
        }
      >
        {modalType === "delete" ? (
          <p className="font-thin">
            Tem certeza de que deseja excluir o serviço{" "}
            <span className="font-bold">{serviceFocused?.name}</span>?
          </p>
        ) : (
          <div className="p-4">
            <div className="mb-4 flex gap-3 flex-col">
              <label className="font-thin">Nome do Serviço:</label>
              <Input
                value={serviceFocused?.name}
                onChange={(e) => {
                  setServiceFocused((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-4 flex gap-3 flex-col">
              <label className="font-thin">Preço:</label>
              <MoneyInput
                defaultValue={serviceFocused?.price}
                onChange={(value) =>
                  setServiceFocused((prev) => ({
                    ...prev,
                    price: Number(value),
                  }))
                }
              />
            </div>
            <div className="mb-4 flex gap-3 flex-col">
              <label className="font-thin">Descrição:</label>
              <Textarea
                value={serviceFocused?.description}
                onChange={(e) =>
                  setServiceFocused((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4 flex gap-3 flex-col">
              <TimeDurationSelector
                defaultValue={serviceFocused?.timeDurationInMinutes}
                onChange={(value) =>
                  setServiceFocused((prev) => ({
                    ...prev,
                    timeDurationInMinutes: Number(value),
                  }))
                }
              />
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}
