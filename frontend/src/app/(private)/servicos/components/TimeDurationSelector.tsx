import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";

export interface TimeDurationSelectorProps {
  onChange?: (value: number) => void;
  defaultValue?: number;
}

export function TimeDurationSelector({
  onChange,
  defaultValue,
}: TimeDurationSelectorProps) {
  // Define time durations in minutes
  const timeDurations = [
    { id: 30, label: "30 minutos" },
    { id: 60, label: "1 hora" },
    { id: 90, label: "1 hora 30 minutos" },
    { id: 120, label: "2 horas" },
  ];

  return (
    <div className="w-full flex gap-4 flex-col">
      <span className="font-thin">Qual o tempo de duração do serviço?</span>
      <Select
        defaultValue={defaultValue ? String(defaultValue) : undefined}
        onValueChange={(value) => {
          onChange?.(Number(value));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Duração:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeDurations.map((item, key) => (
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
