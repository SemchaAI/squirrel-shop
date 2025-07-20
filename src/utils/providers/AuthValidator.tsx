"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthValidator() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.expires) return;

    const expiryTime = new Date(session.expires).getTime();
    const now = Date.now();
    const timeout = expiryTime - now;

    if (timeout > 0) {
      const timer = setTimeout(() => {
        console.log("Session expired");
        // router.refresh();
        window.location.reload();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [session]);

  return null;
}
