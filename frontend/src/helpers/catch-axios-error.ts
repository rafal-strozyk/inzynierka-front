import { AxiosError, type AxiosResponse } from "axios";

export default async function <T = any, E = any>(
  promise: Promise<AxiosResponse>,
): Promise<[AxiosResponse<T>, undefined] | [undefined, AxiosError<E>]> {
  try {
    const response = await promise;
    return [response, undefined] as [AxiosResponse<T>, undefined];
  } catch (error) {
    return [undefined, error] as [undefined, AxiosError<E>];
  }
}
