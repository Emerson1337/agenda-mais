import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFormContext } from "react-hook-form";

export interface WeekdaysCardsProps {
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
}

export function WeekdaysCards({ defaultValue, onChange }: WeekdaysCardsProps) {
  const { setValue } = useFormContext();

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      className="flex-wrap justify-center"
      onValueChange={(values) => {
        setValue("weekDays", values);
        onChange?.(values);
      }}
      defaultValue={defaultValue}
    >
      <ToggleGroupItem value="0">Domingo</ToggleGroupItem>
      <ToggleGroupItem value="1">Segunda</ToggleGroupItem>
      <ToggleGroupItem value="2">Terça</ToggleGroupItem>
      <ToggleGroupItem value="3">Quarta</ToggleGroupItem>
      <ToggleGroupItem value="4">Quinta</ToggleGroupItem>
      <ToggleGroupItem value="5">Sexta</ToggleGroupItem>
      <ToggleGroupItem value="6">Sabado</ToggleGroupItem>
    </ToggleGroup>
  );
}
