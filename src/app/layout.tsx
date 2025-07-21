import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { auth } from "@/auth";
import { LoadingOverlay } from "@/components/shared/overlays/LoadingOverlay";
import QueryProvider from "@/utils/providers/QueryProvider";
import { AuthValidator } from "@/utils/providers/AuthValidator";

import "./globals.css";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} bg-background flex min-h-dvh flex-col antialiased`}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            {children}
            <LoadingOverlay />
            <Toaster position="bottom-left" />
            <AuthValidator />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
