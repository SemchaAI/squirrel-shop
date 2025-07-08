"use client";
import { SwitchPreviewImage } from "@/actions/AdminProducts";
import { ArrowLeftRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IProps {
  id: string;
  url: string;
}

export const SwitchImages = ({ id, url }: IProps) => {
  const router = useRouter();
  const clickHandler = async () => {
    const response = await SwitchPreviewImage(id, url);
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
      <ArrowLeftRightIcon size={20} />
    </button>
  );
};
