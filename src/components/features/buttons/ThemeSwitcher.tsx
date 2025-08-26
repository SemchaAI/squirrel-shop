"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "light" ? "dark" : "light";
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(nextTheme);
  };
  if (!mounted) return <MoonIcon size={32} />;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title="Toggle light/dark mode"
      className="flex cursor-pointer items-center justify-center"
    >
      {resolvedTheme === "light" ? (
        <MoonIcon role="img" aria-label="Moon" size={32} />
      ) : (
        <SunIcon role="img" aria-label="Sun" size={32} />
      )}
    </button>
  );
};
