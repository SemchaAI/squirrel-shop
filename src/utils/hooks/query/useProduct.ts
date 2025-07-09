import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { redactProduct } from "@/utils/api/http/product";

import type { IRedactProductReq } from "@/models/requests";

export const useProductMutation = (slug: string) => {
  return useMutation({
    mutationFn: (data: IRedactProductReq) => redactProduct(slug, data),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.product(slug) });
      toast.success("Product updated");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
