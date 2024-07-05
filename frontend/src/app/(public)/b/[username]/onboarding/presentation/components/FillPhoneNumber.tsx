import { PhoneInput } from "@/components/ui/phone-input";
import { useFormContext } from "react-hook-form";

const FillPhoneNumber = (): JSX.Element => {
  const { setValue } = useFormContext();

  return (
    <div>
      <div className="text-2xl font-thin mb-8">
        <p>
          Precisamos de alguns <span className="font-bold">dados</span>
        </p>
        <p>
          Qual o seu <span className="font-bold">telefone?</span> 🤔
        </p>
      </div>
      <PhoneInput
        onChange={(value) => {
          setValue("phone", value);
        }}
        countries={["BR"]}
        defaultCountry="BR"
        autoFocus
      />
    </div>
  );
};

export default FillPhoneNumber;
