import { useEffect, useState } from "react";

export const useCooldown = (duration = 60) => {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const startCooldown = () => setCooldown(duration);

  return { cooldown, startCooldown };
};
