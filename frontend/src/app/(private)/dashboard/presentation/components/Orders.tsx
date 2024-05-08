"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppointmentFacade } from "@/private/dashboard/application/appointment.facade";

export default function Orders() {
  const { data: appointment, isPending } = useAppointmentFacade();

  if (isPending) return "Add skeleton here....";

  console.log(`🟢🟢🟢 ${appointment} 🟢🟢🟢`);

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing Our Dynamic Orders Dashboard for Seamless Management and
          Insightful Analysis.
          <p>id: {appointment?.id}</p>
          <p>name: {appointment?.name}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New Order</Button>
      </CardFooter>
    </Card>
  );
}
