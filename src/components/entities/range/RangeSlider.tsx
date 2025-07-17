"use client";
import { Input } from "@/components/shared";
import { useDebounce } from "@/utils/hooks";
import { useEffect, useRef, useState } from "react";

interface MultiRangeSliderProps {
  step: number;
  min: number;
  max: number;
  currMin: number;
  currMax: number;
  onChange: (values: { min: number; max: number }) => void;
}

export const RangePriceSlider = ({
  min,
  max,
  currMin,
  currMax,
  step,
  onChange,
}: MultiRangeSliderProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  // States
  const [range, setRange] = useState({ min: currMin, max: currMax });
  const [input, setInput] = useState({ min: currMin, max: currMax });

  const debouncedInput = useDebounce(input, 800);
  const debouncedRange = useDebounce(range, 800);

  // Update progress bar
  useEffect(() => {
    if (!progressRef.current) return;
    const left = ((range.min - min) / (max - min)) * 100;
    const right = 100 - ((range.max - min) / (max - min)) * 100;
    progressRef.current.style.left = `${left}%`;
    progressRef.current.style.right = `${right}%`;
  }, [range, min, max]);

  // Emit debounced final value

  useEffect(() => {
    onChange(debouncedRange);
  }, [debouncedRange, onChange]);

  //When user types into input and pauses → apply validated range
  useEffect(() => {
    const { min: newMin, max: newMax } = debouncedInput;
    if (range.min === newMin && range.max === newMax) return;
    if (newMin >= min && newMax <= max && newMin <= newMax) {
      setRange({ min: newMin, max: newMax });
    } else {
      setRange({ min, max });
      setInput({ min, max });
    }
  }, [min, max, debouncedInput]);

  const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), range.max - step);
    if (val !== range.min) {
      setRange({ min: val, max: range.max });
      setInput({ min: val, max: range.max });
    }
  };
  const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), range.min + step);
    if (val !== range.max) {
      setRange({ min: range.min, max: val });
      setInput({ min: range.min, max: val });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full gap-2">
        <Input
          className="w-full"
          type="number"
          aria-label="Min price"
          min={min}
          max={max}
          value={input.min}
          onChange={(e) => setInput({ ...input, min: Number(e.target.value) })}
          onBlur={(e) => setInput({ ...input, min: Number(e.target.value) })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        <Input
          className="w-full"
          type="number"
          aria-label="Max price"
          min={min}
          max={max}
          value={input.max}
          onChange={(e) => setInput({ ...input, max: Number(e.target.value) })}
          onBlur={(e) => setInput({ ...input, max: Number(e.target.value) })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      </div>
      <div className="relative my-3 h-1 w-full">
        <div className="slider relative h-1 rounded-md bg-border">
          <div
            className="progress absolute h-1 rounded bg-primary"
            ref={progressRef}
          />
        </div>

        <div className="relative">
          <input
            className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
            type="range"
            min={min}
            max={max}
            step={step}
            value={range.min}
            onChange={handleMinRangeChange}
          />
          <input
            className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
            type="range"
            min={min}
            max={max}
            step={step}
            value={range.max}
            onChange={handleMaxRangeChange}
          />
        </div>
      </div>
    </div>
  );
};
