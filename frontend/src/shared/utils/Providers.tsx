"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { ReactNode, useState } from "react";

export interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  const [queryClient] = useState(() => new QueryClient({}));

  const contextClass = {
    success: "bg-background",
    error: "bg-background",
    info: "bg-background",
    warning: "bg-background",
    default: "bg-background",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer text-foreground"
        }
        closeOnClick
        bodyClassName={() => "text-sm font-white font-med block p-3 flex"}
        position="top-right"
        autoClose={3000}
      />
    </QueryClientProvider>
  );
}
