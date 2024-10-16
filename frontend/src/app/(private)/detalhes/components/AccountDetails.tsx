"use client";

import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { useState } from "react";

export default function AccountDetails() {
  const [phone, setPhone] = useState<string>();

  return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Detalhes da conta</CardTitle>
          <CardDescription>
            Preencha as informações do seu negócio abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome do seu negócio</Label>
              {/* show preview of the URL */}
              <Input
                id="name"
                type="text"
                className="w-full"
                defaultValue="Gamer Gear Pro Controller"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Mensagem de boas vindas:</Label>
              <Textarea
                id="description"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                className="min-h-32"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Número de telefone:</Label>
              <PhoneInput
                onChange={setPhone}
                countries={["BR"]}
                defaultCountry="BR"
                autoFocus
              />
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
