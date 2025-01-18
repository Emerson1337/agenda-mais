"use client";

import React from "react";
import Image from "next/image";
import Banner from "@/assets/banners/auth-banner.png";
import { ResetPasswordForm } from "@/app/(auth)/recuperar-conta/components/reset-password-form";
import { useSearchParams } from "next/navigation";
import { ResetLinkForm } from "@/app/(auth)/recuperar-conta/components/request-reset-link-form";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="container relative h-screen w-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {token ? (
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-center py-12">
            <ResetPasswordForm token={token} />
          </div>
        </div>
      ) : (
        <ResetLinkForm />
      )}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image fill src={Banner} alt="banner" className="object-cover" />
      </div>
    </div>
  );
}
