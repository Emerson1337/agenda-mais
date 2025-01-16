import type { Metadata } from "next";
import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  title: "Agenda+",
  description: "Agende o seu horário.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return children;
}
