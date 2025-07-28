import { API_ROUTES } from "@/utils/config/routes/api";
import type { IOrder } from "@/models/orders";
import type { IDataResponse } from "@/models/response";

export const createCheckoutSession = async (
  payload: IOrder,
): Promise<IDataResponse<{ url: string | null }>> => {
  const res = await fetch(`${API_ROUTES.CHECKOUT}`, {
    method: "POST",
    body: JSON.stringify({ payload }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Checkout failed");
  }
  return res.json();
};
