import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Agendazap",
  description: "Agende o seu horário.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return children;
}
