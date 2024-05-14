import { Input } from "@/components/ui/input";

const FillPhoneNumber = (): JSX.Element => {
  return (
    <div>
      <div className="text-2xl font-medium text-white dark:text-white mb-8">
        Qual o seu <span className="font-bold">número de telefone?</span> 🤔
      </div>
      <Input className="text-black" />
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      ></p>
    </div>
  );
};

export default FillPhoneNumber;
