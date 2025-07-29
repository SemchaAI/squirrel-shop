// import { queryKeys } from "@/utils/api";
import { createReview } from "@/utils/api/http/review";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSubmitReview = (productId: string) => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createReview>[1]) =>
      createReview(productId, data),
    onSuccess: (data) => {
      toast.success(data.message);
      // queryClient.invalidateQueries({ queryKey: queryKeys.review(productId) });
    },
    onError: (errorMessage: string) => {
      console.log("[useSubmitReview]", errorMessage);
      toast.error(errorMessage || "Something went wrong! Try later.", {
        duration: 5000,
      });
    },
  });
};
