import type { Metadata } from "next";
import "@/app/globals.css";
import { fetchBusinessData } from "@/server-actions/fetchBusinessData";
import { BusinessProvider } from "./utils/context/BusinessDataContext";
import { Suspense } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ScheduleOptions } from "./components/ScheduleOptions";
import { SocialNetwork } from "./agendar/presentation/components/SocialNetwork";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

// Wrapping in suspense to allow asynchronous fetching
async function BusinessWrapper({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const businessInformation = await fetchBusinessData(username);
  return (
    <BusinessProvider defaultValue={businessInformation}>
      {children}
    </BusinessProvider>
  );
}

export default function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
      }
    >
      <BusinessWrapper username={params.username}>
        <div className="h-screen">
          <div className="absolute mt-4 z-20 self-center w-full flex items-center justify-center">
            <ScheduleOptions />
          </div>
          {children}
        </div>
      </BusinessWrapper>
    </Suspense>
  );
}
