"use server";

import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { RefreshToken } from "@/shared/types/login";
import { cookies } from "next/headers";

export const verifyToken = async (): Promise<RefreshToken> => {
  try {
    const token = cookies().get("authorization")?.value;

    const response = await API.post(apiUrls.internal.auth.verifyToken(), {
      token: token?.replace("Bearer ", ""),
    });

    return response.data.body;
  } catch (error) {
    console.error("Error verifying token");
    throw error;
  }
};
