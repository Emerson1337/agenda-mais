"use client";

import { notFound, useParams } from "next/navigation";
import { BusinessProvider } from "./agenda/application/context/BusinessDataContext";
import { useBusinessFacade } from "./agenda/application/business.facade";
import Appointment from "./agenda/presentation/screens/Appointment";

export default function Page() {
  const { username }: { username: string } = useParams();
  const { data, isPending } = useBusinessFacade({ username });

  if (!isPending && !data) return notFound();

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <BusinessProvider initialData={data!}>
      <Appointment />
    </BusinessProvider>
  );
}
