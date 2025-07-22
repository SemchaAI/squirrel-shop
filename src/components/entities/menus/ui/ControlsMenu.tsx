import { FavoriteWithCounter } from "@/components/features/favorite/FavoriteWithCounter";
import { ThemeSwitcher } from "@/components/features/buttons/ThemeSwitcher";
import { ShoppingBagControl } from "@/components/features/cart/ShoppingBagControl";
import { UserControl } from "@/components/features/user/UserControl";

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
