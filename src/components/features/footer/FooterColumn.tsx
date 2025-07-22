import Link from "next/link";
import { ExpandableList } from "@/components/entities/lists/ExpandableList";

interface IProps {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

export const FooterColumn = ({ title, links }: IProps) => {
  return (
    <>
      <div className="md:hidden">
        <ExpandableList className="mb-4 pb-4" title={title}>
          <div className="flex flex-col gap-4 p-2 md:gap-6 md:p-0">
            {links.map((link) => (
              <Link key={link.title} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
        </ExpandableList>
      </div>
      <div className="hidden flex-col justify-between gap-8 md:flex">
        <p className="text-lg font-medium">{title}</p>
        <div className="flex flex-col gap-6">
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
