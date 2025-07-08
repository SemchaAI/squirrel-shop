import {
  FavoriteWithCounter,
  ShoppingBagControl,
  ThemeSwitcher,
} from "@/components/features";
import { UserControl } from "@/components/features";

export const ControlsMenu = () => {
  return (
    <div className="relative hidden items-center justify-between gap-2 md:flex">
      <FavoriteWithCounter />
      <UserControl />
      <ShoppingBagControl />
      <ThemeSwitcher />
    </div>
  );
};
