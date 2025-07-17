"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserIcon } from "lucide-react";

import { ROUTES } from "@/utils/config";

export const UserControl = () => {
  const session = useSession();
  const avatar = session.data?.user?.avatar;
  const avatarUrl =
    avatar && `${process.env.NEXT_PUBLIC_IMAGE_CDN_URL}${avatar}`;
  const user = session.data?.user;

  return (
    <>
      {user ? (
        <Link href={`${ROUTES.PROFILE}/${user.id}`}>
          <Image
            src={avatarUrl || "/static/images/avatar.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link href={ROUTES.SIGNIN}>
          <UserIcon className="cursor-pointer" size={32} />
        </Link>
      )}
    </>
  );
};
