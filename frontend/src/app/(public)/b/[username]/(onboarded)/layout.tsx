import "@/app/globals.css";
import { ScheduleOptions } from "../components/ScheduleOptions";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className="h-screen">
      <div className="absolute mt-4 z-20 self-center w-full flex items-center justify-center">
        <ScheduleOptions />
      </div>
      {children}
    </div>
  );
}
