"use client";
import { Container } from "@/components/shared";
import { useAnimatedPresence } from "@/utils/hooks";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";

interface IProps {
  isOpen: boolean;
}

export const UserMenu = ({ isOpen }: IProps) => {
  const shouldRender = useAnimatedPresence(isOpen, 300);

  return (
    <Container
      className={`absolute top-14 right-0 z-10 w-70 bg-ui transition-all duration-300 ${isOpen ? "animate-fade-in-down" : "animate-fade-out-up"} ${shouldRender ? "" : "hidden"}`}
    >
      <div className="flex justify-between">
        <SettingsIcon />
        <LogOutIcon
          className="cursor-pointer"
          onClick={() => signOut({ redirect: true, redirectTo: "/" })}
        />
      </div>
    </Container>
  );
};
