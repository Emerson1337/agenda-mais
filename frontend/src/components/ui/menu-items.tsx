"use client";

import React from "react";
import {
  Home,
  Calendar,
  Settings,
  Hammer,
  History,
  CalendarCheck,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useActivePath } from "@/lib/hooks";
import Link from "next/link";

interface Props {
  tooltip?: boolean;
  closeSheet?: () => void;
}

export function MenuItems({ tooltip = false, closeSheet }: Props) {
  const checkActivePath = useActivePath();

  const menus = [
    {
      icon: <Home className="h-5 w-5" />,
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Agendas",
      url: "/agenda",
    },
    {
      icon: <CalendarCheck className="h-5 w-5" />,
      title: "Agendamentos",
      url: "/agendamentos",
    },
    {
      icon: <History className="h-5 w-5" />,
      title: "Histórico",
      url: "/agendamentos-finalizados",
    },
    {
      icon: <Hammer className="h-5 w-5" />,
      title: "Serviços",
      url: "/servicos",
    },
  ];

  return (
    <>
      {menus.map((menu, key) =>
        tooltip ? (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <Link
                href={menu.url}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  checkActivePath(menu.url) &&
                  "bg-accent text-accent-foreground"
                }`}
                onClick={closeSheet} // Close the sheet after clicking
              >
                {menu.icon}
                <span className="sr-only">{menu.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{menu.title}</TooltipContent>
          </Tooltip>
        ) : (
          <Link
            key={key}
            href={menu.url}
            className={`flex items-center gap-4 p-2.5 rounded-lg text-muted-foreground hover:text-foreground ${
              checkActivePath(menu.url) && "bg-accent text-accent-foreground"
            }`}
            onClick={closeSheet} // Close the sheet after clicking
          >
            {menu.icon}
            {menu.title}
          </Link>
        ),
      )}
    </>
  );
}

export function SettingsItem({ tooltip = false }: Props) {
  const checkActivePath = useActivePath();

  return (
    <>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/detalhes"
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                checkActivePath("/detalhes") &&
                "bg-accent text-accent-foreground"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configurações</TooltipContent>
        </Tooltip>
      ) : (
        <>
          <Link
            href="/detalhes"
            className={`flex items-center gap-4 p-2.5 text-muted-foreground hover:text-foreground ${
              checkActivePath("/settings") && "bg-accent text-accent-foreground"
            }`}
          >
            <Settings className="h-5 w-5 transition-all group-hover:scale-110" />
            Configurações
          </Link>
        </>
      )}
    </>
  );
}
