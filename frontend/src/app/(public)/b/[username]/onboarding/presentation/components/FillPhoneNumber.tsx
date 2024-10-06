import { PhoneInput } from "@/components/ui/phone-input";

interface Props {
  onChange?: (value: string) => void;
  value?: string;
}

const FillPhoneNumber = ({ onChange, value }: Props): JSX.Element => {
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
        onChange={onChange}
        value={value}
        countries={["BR"]}
        defaultCountry="BR"
        autoFocus
      />
    </div>
  );
};

export default FillPhoneNumber;
