import { AxiosHeaders, AxiosResponse } from "axios";

import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type ErrorResponse<T> = {
  body: {
    errors: {
      name: Path<T>;
      stack: string;
      message: string;
    }[];
  };
};

const applyErrorsToForm = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  errorResponse: ErrorResponse<T>,
) => {
  if (!errorResponse?.body?.errors) return;

  errorResponse.body.errors.forEach((error) =>
    setError(error.name, {
      type: error.stack,
      message: error.message,
    }),
  );
};

export default applyErrorsToForm;

export const isAxiosResponse = (error: unknown): error is AxiosResponse => {
  return !!((error as AxiosResponse)?.headers instanceof AxiosHeaders);
};
