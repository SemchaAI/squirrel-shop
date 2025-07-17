import { LucideIcon } from "lucide-react";

export type TNavRoute = {
  name: string;
  href?: string;
  Icon?: LucideIcon;
  children?: TNavRoute[];
};
