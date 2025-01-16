import { CheckCircledIcon } from "@radix-ui/react-icons";

const OfferList = ({ text }: { text: string }) => {
  return (
    <p
      className={`mb-1 h-fit w-fit text-sm text-gray-800 flex items-center gap-2`}
    >
      <CheckCircledIcon className="text-green-700" />
      <span>{text}</span>
    </p>
  );
};

export default OfferList;
