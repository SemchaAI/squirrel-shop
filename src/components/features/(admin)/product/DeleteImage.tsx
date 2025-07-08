"use client";
import { DeleteProductImage } from "@/actions/AdminProducts";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IProps {
  id: string;
  url: string;
}

export const DeleteImage = ({ id, url }: IProps) => {
  const router = useRouter();
  const clickHandler = async () => {
    const response = await DeleteProductImage(id, url);
    if (response.isSuccess) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <button
      onClick={clickHandler}
      className="cursor-pointer transition-colors hover:text-primary"
    >
      <Trash2Icon size={20} />
    </button>
  );
};
