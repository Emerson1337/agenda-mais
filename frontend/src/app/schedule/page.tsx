import CreateSchedule from "@/app/schedule/presentation/components/CreateSchedule";

export default function Schedule() {
  return (
    <main className="grid flex-1 items-center justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max gap-4 md:gap-8 lg:col-span-2">
        <CreateSchedule />
      </div>
    </main>
  );
}
