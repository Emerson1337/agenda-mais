import LayoutOne from "../components/LayoutOne";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusinessContext } from "@/public/b/[username]/utils/context/BusinessDataContext";
import { ReloadIcon } from "@radix-ui/react-icons";

const Appointment = (): JSX.Element => {
  const { business } = useBusinessContext();
  const router = useRouter();
  const isOnboarded = localStorage.getItem("onboarding");

  useEffect(() => {
    if (!isOnboarded && business.username)
      router.replace(`/b/${business.username}`);
  }, [business, isOnboarded, router]);

  if (!isOnboarded) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  return <LayoutOne />;
};

export default Appointment;
