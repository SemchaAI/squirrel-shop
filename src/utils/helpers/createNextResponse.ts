import { NextResponse } from "next/server";
import type { IDataResponse } from "@/models/response";

export function createNextResponse<T>(
  data: T,
  message = "Success",
  isSuccess = true,
  status = 200,
) {
  const body: IDataResponse<T> = {
    data,
    isSuccess,
    message,
  };

  return NextResponse.json(body, { status });
}
export function createResponse<T>(
  data: T,
  message = "Success",
  isSuccess = true,
) {
  const body: IDataResponse<T> = {
    data,
    isSuccess,
    message,
  };

  return body;
}
