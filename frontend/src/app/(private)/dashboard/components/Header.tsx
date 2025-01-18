"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link2Icon } from "@radix-ui/react-icons";
import { Package2, PanelLeft, Settings, User2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useActivePath } from "@/lib/hooks";
import { MenuItems } from "@/components/ui/menu-items";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useBusinessContext } from "@/app/(private)/utils/context/BusinessDataContext";
import { useGetPublicAssets } from "@/shared/utils/urlUtils";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth/logout";
import { copyToClipboard } from "@/shared/utils/stringUtils";
import { toast } from "react-toastify";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const checkActivePath = useActivePath();
  const { profilePhoto, username } = useBusinessContext();
  const router = useRouter();
  const closeSheet = () => setIsSheetOpen(false);

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  const copyLink = (formattedName: string) => {
    copyToClipboard(formattedName);
    toast.success("Link copiado para a área de transferência!");
  };

  const profileUrl = useGetPublicAssets(profilePhoto);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-10">
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
        <TooltipTrigger asChild>
          <Button
            onClick={() => copyLink(username)}
            type="button"
            className="items-center justify-center rounded-md text-sm p-0 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground size-9"
          >
            <Link2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          Envie este link para os seus clientes.
        </TooltipContent>
      </Tooltip>

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
            {profilePhoto ? (
              <Image
                priority
                src={profileUrl}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            ) : (
              <User2 className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/detalhes">Configurações</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
