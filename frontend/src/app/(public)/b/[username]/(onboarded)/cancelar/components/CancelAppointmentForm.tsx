"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClientInfo } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import { cancelAppointment } from "@/actions/cancelAppointment";
import { parseRequestError } from "@/shared/utils/errorUtils";

interface Props {
  username: string;
}

const CancelAppointmentForm = ({ username }: Props): JSX.Element => {
  const { clientPhone, clientName } = useClientInfo();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      setCode(codeFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await cancelAppointment({
        username,
        code,
        phone: clientPhone,
      });
      toast.success(response.message);
      setIsLoading(false);
    } catch (error) {
      console.error("Error cancelling appointment", error);
      const parsedError = parseRequestError(error);
      toast.error(parsedError.message);
      setIsLoading(false);
    }
  };

  const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const inputValue = e.target.value.toUpperCase();
    const regex = /^[A-Z0-9]*$/;

    if (regex.test(inputValue) && inputValue.length <= 5) {
      setCode(inputValue);
    }
  };

  return (
    <Card className="w-full max-w-sm flex gap-4 flex-col">
      <CardHeader className="flex gap-4">
        <CardTitle className="text-2xl">Cancelar um agendamento</CardTitle>
        <CardDescription>
          Digite o código de 5 dígitos gerado ao agendar o atendimento que você
          deseja cancelar. Ele se encontra na mensagem gerada em seu WhatsApp.
          😉{" "}
        </CardDescription>
      </CardHeader>

      {/* Form for submission */}
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Código</Label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={handleInputChange}
              placeholder="Ex: DX3FZ"
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="destructive"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Cancelando...
              </>
            ) : (
              "Cancelar"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CancelAppointmentForm;
