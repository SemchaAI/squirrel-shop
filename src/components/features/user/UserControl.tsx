"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserIcon } from "lucide-react";

import { useClickOutside } from "@/utils/hooks";
import { UserMenu } from "@/components/widgets";
import { ROUTES } from "@/utils/config";
import { useState } from "react";

export const UserControl = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const session = useSession();

  useClickOutside(ref, () => {
    if (open) setOpen(false);
  });

  const avatar = session.data?.user?.avatar;
  const avatarUrl =
    avatar && `${process.env.NEXT_PUBLIC_IMAGE_CDN_URL}${avatar}`;

  return (
    <div ref={ref}>
      {/* <div className="relative"> */}
      {session.data?.user ? (
        <>
          <button
            className="flex h-8 w-8 cursor-pointer"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Image
              src={avatarUrl || "/static/images/avatar.png"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>
          <UserMenu isOpen={open} />
        </>
      ) : (
        <Link href={ROUTES.SIGNIN}>
          <UserIcon className="cursor-pointer" size={32} />
        </Link>
      )}
      {/* </div> */}
    </div>
  );
};
