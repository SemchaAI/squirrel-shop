"use client";
import React, { ReactNode, useState } from "react";

export interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight";
}

const tooltipPosition = {
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  topLeft: "bottom-full mb-2 right-0",
  topRight: "bottom-full mb-2 left-0",

  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  bottomLeft: "top-full mt-2 right-0",
  bottomRight: "top-full mt-2 left-0",

  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
} as const;

const arrowPosition = {
  top: "-top-2.5  left-1/2 -translate-x-1/2 rotate-180 border-t-primary",
  topLeft: "-top-2.5  left-1/2 -translate-x-1/2 rotate-180 border-t-primary",
  topRight: "-top-2.5  left-1/2 -translate-x-1/2 rotate-180 border-t-primary",

  bottom: "-bottom-2.5 left-1/2 -translate-x-1/2  border-t-primary",
  bottomLeft: "-bottom-2.5 left-1/2 -translate-x-1/2  border-t-primary",
  bottomRight: "-bottom-2.5 left-1/2 -translate-x-1/2  border-t-primary",

  left: "-left-[11px]  top-1/2 -translate-y-1/2 rotate-90 border-t-primary",
  right: "-right-[11px]   top-1/2 -translate-y-1/2 -rotate-90 border-t-primary",
} as const;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`absolute z-50 rounded-md border border-border bg-primary px-2 py-1 text-xs whitespace-nowrap text-on-primary ${tooltipPosition[position]}`}
        >
          {content}
        </div>
      )}

      {visible && (
        <div
          className={`absolute z-51 h-0 w-0 border-x-4 border-b-4 border-transparent border-b-primary ${arrowPosition[position]}`}
        />
      )}
    </div>
  );
};

export default Tooltip;
