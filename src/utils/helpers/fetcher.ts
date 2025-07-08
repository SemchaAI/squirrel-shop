import { IDataResponse } from "@/models/response";

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  try {
    const res = await fetch(input, {
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      ...init,
    });

    if (!res.ok) {
      const error: IDataResponse<null> = await res.json();
      throw new Error(error.message || "An error occurred");
    }

    return await res.json();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Something went wrong";
    console.log("[fetcher]", msg);
    throw msg;
  }
}
