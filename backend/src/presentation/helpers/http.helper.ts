import { ServerError } from '../errors';
import { errorCodes } from '../errors/error-codes';
import { HttpResponse } from '../http/protocols/http.protocols';

type IBadRequest = {
  name: string;
  stack: string;
  message: string;
};

export const badRequest = (
  error: Error,
): HttpResponse<{
  error: IBadRequest;
}> => ({
  body: {
    error: {
      name: error.name,
      stack: error.stack,
      message: error.message,
    },
  },
});

export const multipleBadRequest = (
  errors: Error[],
): HttpResponse<{
  errors: IBadRequest[];
}> => ({
  body: {
    errors: errors.map((error) => ({
      name: error.name,
      stack: error.stack,
      message: error.message,
    })),
  },
});

export const serverError = (
  error: Error,
): HttpResponse<{ error: ServerError }> => ({
  body: { error: new ServerError(error.stack) },
});

export const ok = <T>(data: T): HttpResponse<T> => ({
  body: data,
});

export const handleError = (error: Error) => {
  if ([errorCodes.MULTIPLE_INVALID_PARAM_ERRORS].includes(error.stack)) {
    return multipleBadRequest(error['errors'] as Error[]);
  }

  if (process.env.NODE_ENV === 'development')
    console.log(`🟢🟢🟢🟢 ${error.stack} 🟢🟢🟢🟢`);

  if (
    [
      errorCodes.MISSING_PARAM_ERROR,
      errorCodes.INVALID_PARAM_ERROR,
      errorCodes.UNAUTHORIZED_ERROR,
    ].includes(error.stack)
  ) {
    return badRequest(error);
  } else return serverError(error);
};
