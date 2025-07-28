import { API_ROUTES } from "@/utils/config/routes/api";
import type { ProductImage } from "@prisma/client";

export const fetchMedia = async (query: string): Promise<ProductImage[]> => {
  const res = await fetch(`${API_ROUTES.MEDIA}?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
};
