"use client";

import { notFound, useParams } from "next/navigation";
import { BusinessProvider } from "./application/context/BusinessDataContext";
import { useBusinessFacade } from "./application/business.facade";
import Appointment from "./presentation/screens/Appointment";

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
