import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const checkActivePath = (path: string) => {
    return path === pathname;
  };

  return checkActivePath;
}

export const useClientInfo = () => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  useEffect(() => {
    setClientName(localStorage.getItem("name") || "");
    setClientPhone(localStorage.getItem("phone") || "");
  }, []);

  return { clientName, setClientName, clientPhone, setClientPhone };
};
