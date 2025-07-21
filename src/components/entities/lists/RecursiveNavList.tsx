import { NavLink } from "@/components/features";
import { ExpandableList } from "./ExpandableList";

import type { TNavRoute } from "@/models/routes";

interface RecursiveNavListProps {
  routes: TNavRoute[];
  depth?: number;
}

export const RecursiveNavList: React.FC<RecursiveNavListProps> = ({
  routes,
  depth = 0,
}) => {
  return (
    <div
      className={`flex w-full flex-1 flex-col gap-4 py-2 text-xl ${depth > 0 ? "pl-2" : ""}`}
    >
      {routes.map((route, index) => {
        const key = `${route.name}-${index}`;
        if (route.children && route.children.length > 0) {
          return (
            <ExpandableList
              className="mb-0 border-border pb-4 pl-2"
              title={
                <NavLink
                  key={key}
                  href={route.href}
                  className="flex w-full justify-start gap-2 transition-colors hover:text-primary-hover"
                >
                  {route.Icon && <route.Icon />}
                  {route.name}
                </NavLink>
              }
              key={key}
            >
              <RecursiveNavList routes={route.children} depth={depth + 1} />
            </ExpandableList>
          );
        }

        return (
          <NavLink
            key={key}
            href={route.href}
            className="flex w-full justify-start gap-2 border-b border-border p-2 transition-colors hover:border-primary-hover"
          >
            {route.Icon && <route.Icon />}
            {route.name}
          </NavLink>
        );
      })}
    </div>
  );
};
