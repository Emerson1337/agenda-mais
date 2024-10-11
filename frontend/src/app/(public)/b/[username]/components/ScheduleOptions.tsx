"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useActivePath } from "@/lib/hooks";
import { useBusinessContext } from "@/public/b/[username]/utils/context/BusinessDataContext";

export function ScheduleOptions() {
  const checkActivePath = useActivePath();
  const { business } = useBusinessContext();

  return (
    <NavigationMenu className="bg-background rounded-lg">
      <NavigationMenuList className="flex gap-2 p-1">
        <NavigationMenuItem>
          <Link
            href={`/b/${business?.username}/agendar`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "uppercase", {
                "bg-accent text-accent-foreground": checkActivePath(
                  `/b/${business?.username}/agendar`
                ),
              })}
            >
              Agendar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`/b/${business?.username}/historico`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "uppercase", {
                "bg-accent text-accent-foreground": checkActivePath(
                  `/b/${business?.username}/historico`
                ),
              })}
            >
              Histórico
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`/b/${business?.username}/cancelar`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "uppercase", {
                "bg-accent text-accent-foreground": checkActivePath(
                  `/b/${business?.username}/cancelar`
                ),
              })}
            >
              Cancelar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
