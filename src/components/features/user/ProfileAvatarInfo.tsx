import Image from "next/image";
import { Pencil } from "lucide-react";

import { Button } from "@/components/shared";
import type { User } from "@prisma/client";

interface IProps {
  user: User;
}

export const ProfileAvatarInfo = ({ user }: IProps) => {
  return (
    <div className="relative flex items-center gap-2 border-b border-border py-2">
      <Image
        className="rounded-full border-2 border-border"
        src={user.avatar || "/static/images/avatar.png"}
        alt={user.name}
        width={100}
        height={100}
        priority
      />
      <div>
        <p className="text-text-highlight font-semibold">{user.name}</p>
        <p>
          Role: <span className="font-semibold">{user.role}</span>
        </p>
      </div>
      <Button
        rounded="full"
        variant="primary"
        size="none"
        aria-label="edit avatar"
        className="absolute bottom-1 left-16 bg-app p-1.5"
      >
        <Pencil size={18} />
      </Button>
    </div>
  );
};
