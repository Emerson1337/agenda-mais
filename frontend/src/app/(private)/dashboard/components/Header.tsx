"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Calendar,
  Home,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useActivePath } from "@/lib/hooks";
import { MenuItems } from "@/components/ui/menu-items";
import { Tooltip } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const checkActivePath = useActivePath();

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="group flex mb-4 h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              onClick={closeSheet} // Close the sheet after clicking
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <MenuItems closeSheet={closeSheet} />
            <Link
              href="/detalhes"
              className={`flex items-center gap-4 p-2.5 text-muted-foreground hover:text-foreground ${
                checkActivePath("/detalhes") &&
                "bg-accent text-accent-foreground"
              }`}
              onClick={closeSheet} // Close the sheet after clicking
            >
              <Settings className="h-5 w-5 transition-all group-hover:scale-110" />
              Detalhes
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0"></div>
      <Tooltip>
        <ThemeToggle />
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="https://github.com/emerson1337.png"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
