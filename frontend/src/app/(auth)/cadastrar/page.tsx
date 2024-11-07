import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { SignUpForm } from "@/app/(auth)/cadastrar/components/sign-up-form";
import Banner from "@/assets/banners/auth-banner.jpg";
import Image from "next/image";

export default function Login() {
  return (
    <div className="container relative hidden h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex items-center justify-center py-12">
          <SignUpForm />
        </div>
      </div>
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <Image fill src={Banner} alt="banner" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
