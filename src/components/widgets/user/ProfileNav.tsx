"use client";
import { signOut } from "next-auth/react";
// import toast from "react-hot-toast";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/shared";

import { NavLink, ProfileAvatarInfo } from "@/components/features";
import { ROUTES } from "@/utils/config";
import { Order, User } from "@prisma/client";

interface IProps {
  user: User & { Order: Order[] };
}

export const ProfileNav = ({ user }: IProps) => {
  // const router = useRouter();

  return (
    <div className="flex w-full min-w-60 flex-col gap-5 border-border sm:w-1/5 sm:border-r sm:px-4">
      <ProfileAvatarInfo user={user} />
      <nav className="grow">
        <ul className="flex flex-col gap-1">
          <li>
            <NavLink href={`${ROUTES.PROFILE}/${user.id}`}>
              Personal data
            </NavLink>
          </li>
          <li>
            <NavLink href="#">Orders</NavLink>
          </li>
          <li>
            <NavLink href="#">My addresses</NavLink>
          </li>
          <li>
            <NavLink href="#">My favorite</NavLink>
          </li>
          <li>
            <NavLink href="#">My comments</NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center border-t border-border pt-2">
        <Button
          variant="ghost"
          rounded="full"
          aria-label="logout"
          onClick={() => signOut({ redirect: true, redirectTo: "/" })}
          className="gap-2"
        >
          <LogOutIcon className="cursor-pointer" />
          Logout
        </Button>
      </div>
    </div>
  );
};
