import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export interface alertPopUpProps {
  title: string;
  description: string;
}

export function alertPopUp({ title, description }: alertPopUpProps) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
