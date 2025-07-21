"use client";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import clsx from "clsx";

interface IExpandableListProps {
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const ExpandableList = ({
  title,
  children,
  defaultExpanded = false,
  isLoading = false,
  className,
}: IExpandableListProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0");

  const handleExpand = () => {
    if (!isLoading) setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [expanded, children]);

  return (
    <div className={clsx("border-b border-text-high", className)}>
      <div className="flex w-full items-center justify-between">
        {title}
        <button
          className="cursor-pointer transition-colors hover:text-primary"
          onClick={handleExpand}
        >
          {isLoading ? (
            <LoaderCircle size={24} className="animate-spin" />
          ) : (
            <ChevronDown
              size={24}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: defaultExpanded && height === "0" ? "auto" : height,
        }}
      >
        {children}
      </div>
    </div>
  );
};
