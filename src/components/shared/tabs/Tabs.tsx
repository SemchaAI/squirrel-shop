"use client";
import { useState } from "react";
import clsx from "clsx";

interface Tab {
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

export const Tabs = ({ tabs, defaultIndex = 0, className }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex border-b-2 border-border">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={clsx(
              "relative flex cursor-pointer items-center gap-1 px-4 py-2 font-inter text-lg font-medium transition-colors",
              activeIndex === i
                ? "border-primary text-primary before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-full before:border-b-[3px] before:content-['']"
                : "border-transparent text-text-low hover:text-primary",
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tabs Content with animation */}
      <div className="relative mt-4">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={clsx(
              "transition-opacity duration-500 ease-in-out",
              "absolute top-0 left-0 w-full",
              i === activeIndex
                ? "pointer-events-auto relative opacity-100"
                : "pointer-events-none h-0 overflow-hidden opacity-0",
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
