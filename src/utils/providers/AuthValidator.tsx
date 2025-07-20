"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const MAX_TIMEOUT = 2147483647; // 32-bit signed integer

export function AuthValidator() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.expires) return;

    const expiryTime = new Date(session.expires).getTime();
    const now = Date.now();
    const timeout = expiryTime - now;

    if (timeout > 0) {
      const timer = setTimeout(
        () => {
          console.log("Session expired");
          window.location.reload();
        },
        Math.min(timeout, MAX_TIMEOUT),
      );

      return () => clearTimeout(timer);
    }
  }, [session]);

  return null;
}
