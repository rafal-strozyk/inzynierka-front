import { AxiosError, type AxiosResponse } from "axios";

export default async function <T = unknown, E = unknown>(
  promise: Promise<AxiosResponse>,
): Promise<[AxiosResponse<T>, undefined] | [undefined, AxiosError<E>]> {
  try {
    const response = await promise;
    return [response, undefined] as const;
  } catch (error) {
    return [undefined, error as AxiosError<E>] as const;
  }
}
