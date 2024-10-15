import { Input } from "@/components/ui/input";

interface Props {
  onChange?: (value: string) => void;
  value?: string;
}

const FillName = ({ onChange, value }: Props): JSX.Element => {
  return (
    <div>
      <div className="text-2xl text-center font-medium text-white dark:text-white mb-8">
        <div className="font-bold">Quase lá!</div>
        <div className="font-thin">Como podemos te chamar? 😁</div>
      </div>
      <Input
        onChange={(event) => {
          onChange?.(event.target.value);
        }}
        value={value}
        autoFocus
        className="text-xl text-center"
      />
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      ></p>
    </div>
  );
};

export default FillName;
