import { ServerError } from '../errors';
import { HttpResponse } from '../http/protocols/http.protocols';

type IBadRequest = {
  name: string;
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
      message: error.message,
    },
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
  if (['MissingParamError', 'InvalidParamError'].includes(error.name))
    return badRequest(error);
  else return serverError(error);
};
