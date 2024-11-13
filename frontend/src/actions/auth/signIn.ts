"use server";

import { cookies } from "next/headers";

export const signIn = ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}): void => {
  cookies().set("authorization", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookies().set("refreshToken", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};
