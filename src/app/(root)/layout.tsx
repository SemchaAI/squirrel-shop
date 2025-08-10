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

import { LayoutInitializer } from "@/utils/providers/LayoutInitializer";
import { Footer } from "@/components/widgets/footer/Footer";
import { Header } from "@/components/widgets/header/Header";

import type { Metadata } from "next";
import { getInitData } from "@/utils/api/getInitData";

export const metadata: Metadata = {
  title: "Squirrel Shop",
  description: "Online store with nextjs and prisma",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cartProducts, favoriteProducts } = await getInitData();
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
