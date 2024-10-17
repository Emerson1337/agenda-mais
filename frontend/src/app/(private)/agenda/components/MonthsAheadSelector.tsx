import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";
import { ScheduleData } from "@/app/(private)/agenda/schemas/schedule.schema";

export interface MonthsAheadSelectorProps {
  onChange?: (value: number) => void;
  defaultValue?: number;
}

export function MonthsAheadSelector({
  onChange,
  defaultValue,
}: MonthsAheadSelectorProps) {
  const { setValue } = useFormContext<ScheduleData>();

  const months = [];

  for (let index = 1; index <= 12; index++) {
    months.push({
      id: index,
      label: `${index} ${index === 1 ? "mês" : "meses"}`,
    });
  }

  return (
    <div className="w-full flex gap-4 flex-col text-center justify-center items-center">
      <span>
        Quanto tempo à frente alguém pode marcar um atendimento com você?
      </span>
      <Select
        defaultValue={defaultValue ? String(defaultValue) : undefined}
        onValueChange={(value) => {
          setValue("monthsAhead", Number(value));
          onChange?.(Number(value));
        }}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Agenda aberta por:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {months.map((item, key) => (
              <SelectItem key={key} value={String(item.id)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
