interface RequestError {
  message: string;
  code?: string;
  status?: number;
  stack?: string;
}
import axios, { AxiosError } from "axios";

export const parseRequestError = (error: unknown): RequestError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as {
      response: {
        status: number;
        data: {
          body: {
            error: {
              message: string;
              name: string;
              stack: string;
            };
          };
        };
      };
    };
    return {
      message: axiosError.response.data.body.error.message,
      status: axiosError.response?.status,
      stack: axiosError.response.data.body.error.stack,
    };
  }

  // Handle non-Axios errors (other types of thrown errors)
  return {
    message: (error as Error).message || "An unexpected error occurred",
    stack: (error as Error).stack,
  };
};
