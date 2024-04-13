import Orders from "@/app/dashboard/presentation/components/Orders";
import Header from "@/app/dashboard/presentation/components/Header";
import GoalCard from "@/app/dashboard/presentation/components/GoalCard";
import AppointmentsList from "@/app/dashboard/presentation/components/AppointmentsList";
import TotalRevenue from "@/app/dashboard/presentation/components/TotalRevenue";
import TotalAppointments from "@/app/dashboard/presentation/components/TotalAppointments";
import TotalAppointmentsScheduled from "@/app/dashboard/presentation/components/TotalAppointmentsScheduled";
import TotalAppointmentsFinished from "@/app/dashboard/presentation/components/TotalAppointmentsFinished";
import TopClients from "@/app/dashboard/presentation/components/TopClients";

export default function Dashboard() {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Orders />
            <GoalCard
              title={"This Week"}
              value={"$1,329"}
              description={"+25% from last week"}
              progress={25}
            />
            <GoalCard
              title={"This Month"}
              value={"$5,329"}
              description={"+10% from last week"}
              progress={10}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <TotalRevenue />
            <TotalAppointments />
            <TotalAppointmentsScheduled />
            <TotalAppointmentsFinished />
          </div>
          <AppointmentsList />
        </div>
        <div>
          <TopClients />
        </div>
      </main>
    </>
  );
}
