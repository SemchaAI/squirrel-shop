import {
  CableIcon,
  ContactIcon,
  HandshakeIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { ROUTES } from "./routes";
import type { TNavRoute } from "@/models/routes";

export const NavRoutes: TNavRoute[] = [
  { name: "Contacts", href: ROUTES.CONTACT, Icon: ContactIcon },

  {
    name: "Categories",
    Icon: ContactIcon,
    href: ROUTES.CATEGORY,
    children: [
      {
        name: "Smartphones",
        href: `${ROUTES.CATEGORY}/smartphones`,
        Icon: SmartphoneIcon,
      },
      { name: "Tablets", href: `${ROUTES.CATEGORY}/tablets`, Icon: TabletIcon },
      {
        name: "Accessories",
        href: `${ROUTES.CATEGORY}/accessories`,
        Icon: CableIcon,
      },
    ],
  },
  { name: "Deals", href: ROUTES.DEALS, Icon: HandshakeIcon },
];
