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
import { Button } from "@/components/ui/button";

export default function PasswordDetails() {
  return (
    <Card className="sm:max-w-sm">
      <CardHeader>
        <CardTitle>Alterar senha</CardTitle>
        <CardDescription>
          Digite a sua senha atual e a nova senha para redefinir as suas
          credenciais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Senha atual</Label>
            <Input id="password" type="password" className="w-full" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Nova senha</Label>
            <Input id="new_password" type="password" className="w-full" />
          </div>
        </div>
        <Button variant="default" className="mt-10 w-full">
          Salvar alterações
        </Button>
      </CardContent>
    </Card>
  );
}
