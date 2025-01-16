import { CheckCircledIcon } from "@radix-ui/react-icons";

const OfferList = ({ text }: { text: string }) => {
  return (
    <p className={`mb-1 text-sm text-gray-800 flex items-baseline gap-2`}>
      <CheckCircledIcon className="text-green-700" />
      <span>{text}</span>
    </p>
  );
};

export default OfferList;
