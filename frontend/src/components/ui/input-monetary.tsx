import { useState } from "react";
import { Input } from "@/components/ui/input";

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type MoneyInputProps = {
  defaultValue?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
};

export default function MoneyInput({
  defaultValue = 0,
  onChange,
  placeholder = "R$ 0,00",
}: MoneyInputProps) {
  const [value, setValue] = useState(moneyFormatter.format(defaultValue));

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.replace(/\D/g, "");
    const numericValue = Number(inputValue) / 100;

    setValue(moneyFormatter.format(numericValue));
    if (onChange) {
      onChange(numericValue);
    }
  }

  return (
    <Input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
}
