import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFormContext } from "react-hook-form";
import { ScheduleData } from "../../domain/schedule.schema";

export interface WeekdaysCardsProps {
  defaultValue?: number[];
  onChange?: (values: string[]) => void;
}

export function WeekdaysCards({ defaultValue, onChange }: WeekdaysCardsProps) {
  const { setValue } = useFormContext<ScheduleData>();

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      className="flex-wrap justify-center"
      value={defaultValue?.map((value) => String(value))}
      onValueChange={(values: string[]) => {
        setValue(
          "weekDays",
          values.map((value) => Number(value))
        );
        onChange?.(values);
      }}
    >
      <ToggleGroupItem value="6">Domingo</ToggleGroupItem>
      <ToggleGroupItem value="0">Segunda</ToggleGroupItem>
      <ToggleGroupItem value="1">Terça</ToggleGroupItem>
      <ToggleGroupItem value="2">Quarta</ToggleGroupItem>
      <ToggleGroupItem value="3">Quinta</ToggleGroupItem>
      <ToggleGroupItem value="4">Sexta</ToggleGroupItem>
      <ToggleGroupItem value="5">Sabado</ToggleGroupItem>
    </ToggleGroup>
  );
}
