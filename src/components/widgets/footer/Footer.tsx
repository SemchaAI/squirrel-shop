import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  SquirrelIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

import { ROUTES } from "@/utils/config";
import Image from "next/image";
import { FooterColumn } from "@/components/features";

const FooterLinks = [
  {
    title: "COMPANY",
    links: [
      { title: "About Us", href: "/" },
      { title: "Careers", href: "/" },
      { title: "Affiliates", href: "/" },
      { title: "Blog", href: "/" },
      { title: "Contact Us", href: "/" },
    ],
  },
  {
    title: "SHOP",
    links: [
      { title: "New Arrivals", href: "/" },
      { title: "Accessories", href: "/" },
      { title: "Men", href: "/" },
      { title: "Women", href: "/" },
      { title: "All products", href: "/" },
    ],
  },
  {
    title: "HELP",
    links: [
      { title: "Customer Service", href: "/" },
      { title: "My Account", href: "/" },
      { title: "Find a Store", href: "/" },
      { title: "Legal & Privacy", href: "/" },
      { title: "Gift Card", href: "/" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="wrapper bg-ui-selected py-5">
      {/* TOP */}
      <div className="flex flex-col justify-between gap-x-24 gap-y-8 lg:flex-row">
        {/* LEFT */}
        <div className="flex w-full flex-col justify-between gap-8 sm:flex-row lg:w-1/4 lg:flex-col">
          <div className="flex flex-col justify-between gap-8">
            <Link href={ROUTES.HOME} className="flex items-center gap-1">
              <SquirrelIcon size={40} />
              <h1 className="hidden text-2xl font-bold sm:block">Squirrel</h1>
            </Link>
            <p className="text-text-low">
              3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
              States
            </p>
          </div>
          <div className="flex flex-col gap-4 md:w-1/3 lg:w-full">
            <Link href="mailto:example@gmail.dev" className="font-semibold">
              example@gmail.dev
            </Link>
            <Link href="tel:+123456789" className="font-semibold">
              +1 234 567 890
            </Link>
            <div className="flex gap-6 text-primary">
              <YoutubeIcon size={24} />
              <InstagramIcon size={24} />
              <TwitterIcon size={24} />
              <FacebookIcon size={24} />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-24 lg:w-3/4">
          {/* CENTER */}
          <div className="flex h-fit flex-grow flex-col justify-between md:flex-row">
            {FooterLinks.map((link, index) => (
              <FooterColumn key={index} title={link.title} links={link.links} />
            ))}
          </div>
          {/* RIGHT */}
          <div className="flex w-full flex-col gap-4 md:w-1/3 md:gap-8">
            <p className="text-lg font-medium">SUBSCRIBE</p>
            <p className="text-text-low">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Email address"
                className="w-3/4 p-4"
              />
              <button className="w-1/4 bg-primary text-white">JOIN</button>
            </div>
            <span className="font-semibold">Secure Payments</span>
            <div className="flex justify-between">
              <Image
                src="/static/images/payments/discover.png"
                alt=""
                width={40}
                height={20}
              />
              <Image
                src="/static/images/payments/skrill.png"
                alt=""
                width={40}
                height={20}
              />
              <Image
                src="/static/images/payments/paypal.png"
                alt=""
                width={40}
                height={20}
              />
              <Image
                src="/static/images/payments/mastercard.png"
                alt=""
                width={40}
                height={20}
              />
              <Image
                src="/static/images/payments/visa.png"
                alt=""
                width={40}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-16 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="">© {new Date().getFullYear()} Squirrel Shop</div>
        <div className="flex flex-col gap-8 text-text-low md:flex-row">
          <div>
            <span className="mr-4">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div>
            <span className="mr-4">Currency</span>
            <span className="font-medium">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
