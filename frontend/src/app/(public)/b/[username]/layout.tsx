import "@/shared/styles/globals.css";
import { fetchBusinessData } from "@/actions/fetchBusinessData";
import { BusinessProvider } from "./utils/context/BusinessDataContext";
import { Suspense } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
      <div id="body-theme" className={cn(businessInformation?.layout)}>
        {children}
      </div>
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
      <TooltipProvider>
        <div className="fixed z-30 bottom-10 right-10">
          <Tooltip>
            <ThemeToggle />
          </Tooltip>
        </div>
        <BusinessWrapper username={params.username}>{children}</BusinessWrapper>
      </TooltipProvider>
    </Suspense>
  );
}
