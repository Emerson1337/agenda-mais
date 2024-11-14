import React from "react";
import { LoginForm } from "@/app/(auth)/login/components/login-form";
import Image from "next/image";
import Banner from "@/assets/banners/auth-banner.jpg";

export default function Login() {
  return (
    <div className="container relative h-screen w-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center justify-center py-12">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image fill src={Banner} alt="banner" className="object-cover" />
      </div>
    </div>
  );
}
