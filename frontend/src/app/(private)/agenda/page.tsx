import CreateSchedule from "@/private/agenda/components/CreateSchedule";

export default function Schedule() {
  return (
    <main className="flex items-center justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
      <div className="auto-rows-max gap-4 md:gap-8 lg:col-span-2 space-y-8 max-w-screen-md">
        <CreateSchedule />
      </div>
    </main>
  );
}
