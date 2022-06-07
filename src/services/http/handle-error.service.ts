import { ErrorDataLeeonAPI, HttpResponse, HttpStatus } from './http.type';

export function handleError(error: unknown): HttpResponse<{}> {
  const leeonError = error as ErrorDataLeeonAPI;
  return {
    data: {
      message: leeonError.message?.[0],
    },
    status: HttpStatus.BAD_REQUEST,
  };
}
