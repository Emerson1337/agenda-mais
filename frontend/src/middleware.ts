"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { refreshToken } from "./actions/auth/refreshToken";
import { verifyToken } from "./actions/auth/verifyToken";
import { isAxiosResponse } from "./shared/utils/errorUtils";

export async function middleware(request: NextRequest) {
  const authToken = cookies().get("authorization");
  console.log("🟢🟢🟢🟢 authToken", authToken, JSON.stringify(request));

  if (!authToken)
    return NextResponse.redirect(new URL("/login", request.nextUrl.toString()));

  try {
    await verifyToken();
  } catch (error) {
    if (isAxiosResponse(error) && error.status === 401) {
      try {
        const { access_token, refresh_token } = await refreshToken();

        const response = NextResponse.next();
        response.cookies.set("authorization", access_token, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "none",
          maxAge: 999999,
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        });
        response.cookies.set("refreshToken", refresh_token, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "none",
          maxAge: 999999,
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        });
        return response;
      } catch (error) {
        console.error(error);
        return NextResponse.redirect(
          new URL("/login", request.nextUrl.toString()),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/agenda/:path*",
    "/detalhes/:path*",
    "/servicos/:path*",
    "/agendamentos/:path*",
  ],
};
