"use server";

import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { ILoginRequest } from "@/app/(auth)/login/schemas/auth.schema";
import { LoginData } from "@/shared/types/login";
import { cookies } from "next/headers";

export const signIn = async (data: ILoginRequest): Promise<LoginData> => {
  try {
    const response = await API.post(apiUrls.internal.auth.login(), data);
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

    return response.data.body;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
