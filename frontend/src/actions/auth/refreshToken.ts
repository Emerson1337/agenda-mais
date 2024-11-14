"use server";

import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { RefreshToken } from "@/shared/types/login";
import { cookies } from "next/headers";

export const refreshToken = async (): Promise<RefreshToken> => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const response = await API.post(apiUrls.internal.auth.refreshToken(), {
      refreshToken,
    });
    try {
      const { access_token, refresh_token } = response.data.body;

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
    } catch {}

    return response.data.body;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
