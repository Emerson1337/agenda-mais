import { FinishedAppointmentsDataTable } from "./components/FinishedAppointmentsDataTable";

export default function FinishedAppointments() {
  return (
    <main className="flex-1 items-center justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
      <div className="auto-rows-max gap-4 md:gap-8 lg:col-span-2">
        <FinishedAppointmentsDataTable />
      </div>
    </main>
  );
}
