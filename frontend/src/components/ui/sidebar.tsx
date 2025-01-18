import Link from "next/link";
import { MenuItems, SettingsItem } from "./menu-items";
import Image from "next/image";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 p-2 shrink-0 items-center justify-center gap-2 rounded-full bg-green-800 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src="/images/logo/logo.png"
            alt="logo"
            width={140}
            height={30}
            className="w-full h-full"
          />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <MenuItems tooltip />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <SettingsItem tooltip />
      </nav>
    </aside>
  );
}
