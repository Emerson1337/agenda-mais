import Google from "@/assets/icons/google.svg";
import Image from "next/image";

const Icon = {
  Google: (className?: string) => (
    <Image src={Google} className={className} alt="Google" />
  ),
};

export default Icon;
