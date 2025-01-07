import type { Metadata } from "next";
import "@/app/globals.css";
import { Suspense } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "AgendaZap",
  description: "Administre a sua agenda de forma simples e eficiente!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
