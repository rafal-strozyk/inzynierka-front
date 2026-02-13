import type { FormErrorResponse, FormErrors } from "@/types/form.ts";
import { AxiosError } from "axios";

export function handleFetchErrors<E = unknown>(
  error: AxiosError<FormErrorResponse<E>>,
): FormErrors<E> {
  if (error.response?.data?.errors) {
    return error.response.data.errors;
  }
  return { message: error.response?.data?.message ?? "Unhandled error!" };
}
