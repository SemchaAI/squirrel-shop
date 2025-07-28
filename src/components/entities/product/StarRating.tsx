"use client";
import { useId } from "react";
import clsx from "clsx";
import { Star } from "lucide-react";

interface StarRatingProps {
  id?: string;
  label?: string;
  rating: number;
  onRate?: (rate: number) => void;
  size?: number;
  color?: string;
  className?: string;
  hoveredIndex?: number;
  setHoveredIndex?: (index: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  id,
  rating,
  onRate,
  size = 24,
  className,
  color = "text-primary",
  hoveredIndex = -1,
  setHoveredIndex,
}) => {
  const uniqId = useId();
  const label = id
    ? { "aria-labelledby": id }
    : { "aria-label": `Rating in stars - ${rating}` };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const percentNumber = Math.min(1, Math.max(0, rating - i));
    const percent = percentNumber.toFixed(1);
    const offset = +percent * 100;
    const actualStroke =
      hoveredIndex >= i || percentNumber > 0 ? color : "text-text-low";

    return (
      <Star
        key={i}
        size={size}
        fill={`url(#star-gradient-${uniqId}-${i})`}
        onClick={onRate ? () => onRate(i + 1) : undefined}
        onMouseEnter={setHoveredIndex ? () => setHoveredIndex(i) : undefined}
        onMouseLeave={setHoveredIndex ? () => setHoveredIndex(-1) : undefined}
        className={`transition-colors ${actualStroke}`}
      >
        <defs>
          <linearGradient
            id={`star-gradient-${uniqId}-${i}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset={`${offset}%`} stopColor="currentColor" />
            <stop offset={`${offset}%`} stopColor="transparent" />
          </linearGradient>
        </defs>
      </Star>
    );
  });

  return (
    <div {...label} role="group" className={clsx("flex", className)}>
      {stars}
    </div>
  );
};
