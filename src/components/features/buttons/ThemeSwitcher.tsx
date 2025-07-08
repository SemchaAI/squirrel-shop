"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };
  if (!mounted) return <MoonIcon size={32} />;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle light/dark mode"
      className="flex cursor-pointer items-center justify-center"
    >
      {resolvedTheme === "light" ? (
        <MoonIcon size={32} />
      ) : (
        <SunIcon size={32} />
      )}
    </button>
  );
};
