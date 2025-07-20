// import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  {
    loading: () => null,
  },
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  {
    loading: () => null,
  },
);

import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { LayoutInitializer } from "@/utils/providers/LayoutInitializer";
import { Footer, Header } from "@/components/widgets";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Squirrel Shop",
  description: "Online store with nextjs and prisma",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const cart = session
    ? await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
          cartProducts: {
            include: {
              productVariant: true,
            },
          },
        },
      })
    : null;
  const favorite = session
    ? await prisma.favorite.findUnique({
        where: { userId: session.user.id },
        include: {
          favoriteProducts: {
            // select: {
            //   productVariantId: true,
            // },
            include: {
              productVariant: true,
            },
          },
        },
      })
    : null;
  const cartProducts = cart?.cartProducts || null;
  const favoriteProducts = favorite?.favoriteProducts || null;
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      value={{ light: "light", dark: "dark" }}
      enableSystem
    >
      <LayoutInitializer cart={cartProducts} favorite={favoriteProducts} />
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      {process.env.NODE_ENV === "production" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </ThemeProvider>
  );
}
