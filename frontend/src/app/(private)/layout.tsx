import "@/shared/styles/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/ui/sidebar";
import Header from "./dashboard/components/Header";
import { cn } from "@/lib/utils";
import {
  BusinessProvider,
  BusinessWrapper,
} from "./utils/context/BusinessDataContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-muted/40")}>
      <TooltipProvider>
        <BusinessProvider>
          <BusinessWrapper>
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <Header />
              {children}
            </div>
          </BusinessWrapper>
        </BusinessProvider>
      </TooltipProvider>
    </div>
  );
}
