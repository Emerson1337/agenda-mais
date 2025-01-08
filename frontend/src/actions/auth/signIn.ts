"use server";

import { cookies } from "next/headers";
import { delay } from "@/lib/utils";

export const signIn = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  cookies().set("authorization", access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "none",
    maxAge: 999999,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
  });
  cookies().set("refreshToken", refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "none",
    maxAge: 999999,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
  });

  await delay(2000);
};
