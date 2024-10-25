import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface ServiceTableHeaderProps {
  table: Table<any>;
}

const hiddenColumns = ["phone", "time"];

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
export function AppointmentTableHeader({ table }: ServiceTableHeaderProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filtrar agendamentos..."
        value={
          (table.getColumn("clientName")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("clientName")?.setFilterValue(event.target.value)
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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnLabels[column.id] || column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
