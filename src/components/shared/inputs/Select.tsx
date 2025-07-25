"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X, Loader2, CheckCheck } from "lucide-react";

import { useClickOutside } from "@/utils/hooks";

import type { IOption, ISelectProps } from "@/models/inputs";

export const Select: React.FC<ISelectProps> = ({
  options,
  value,
  onChange,
  menuPortalTarget,
  placeholder = "Select...",
  isDisabled = false,
  isLoading = false,
  isClearable = false,
  isSearchable = false,
  isMulti = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLInputElement>(null); //input for focus
  const selectRef = useRef<HTMLInputElement>(null); //dropdown for close
  useClickOutside(selectRef, () => {
    setIsOpen(false);
    setSearch("");
  });

  // dropdown positioning start
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  useEffect(() => {
    if (!isOpen || !selectRef.current) return;

    const updatePosition = () => {
      const rect = selectRef.current!.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updatePosition(); // initial

    const observer = new ResizeObserver(updatePosition);
    observer.observe(selectRef.current);

    return () => observer.disconnect();
  }, [isOpen]);
  // dropdown positioning end

  const selectedArray: IOption[] = value
    ? isMulti
      ? (value as IOption[])
      : [value as IOption]
    : [];
  const isEmpty = selectedArray.length === 0;

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    setSearch("");
  };
  const handleSelect = (option: IOption) => {
    if (isDisabled) return;
    if (isMulti) {
      const exists = selectedArray.some((o) => o.value === option.value);
      const newValue = exists
        ? selectedArray.filter((o) => o.value !== option.value)
        : [...selectedArray, option];
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
    setSearch("");
    ref.current?.focus();
  };
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(isMulti ? [] : undefined);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setIsOpen(false);
    if (e.key === "Tab" && !isMulti) return setIsOpen(false);
    if (e.key === "Tab" && isMulti) return e.preventDefault();
    if (
      e.key === "Backspace" &&
      search === "" &&
      isMulti &&
      selectedArray.length > 0
    ) {
      const newValue = selectedArray.slice(0, selectedArray.length - 1);
      onChange(newValue);
    }
  };

  const isSelected = (option: IOption) =>
    selectedArray.some((o) => o.value === option.value);

  const filteredOptions = options.filter((option) =>
    option.label
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(search.toLowerCase().replace(/\s/g, "")),
  );

  return (
    <div
      ref={selectRef}
      onKeyDown={handleKeyDown}
      className={`text-text-primary relative w-full min-w-60 ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
    >
      <div
        className="flex min-h-11.5 cursor-pointer items-center justify-between gap-0.5 rounded-lg border border-border bg-app px-3 py-2.5 hover:border-primary"
        onClick={handleToggleMenu}
      >
        <div className="flex w-full grow flex-wrap items-center gap-1">
          {!isEmpty ? (
            isMulti ? (
              selectedArray.map((v) => (
                <span
                  key={v.value}
                  className="text-text-highlight flex items-center gap-1 rounded bg-success py-0.5 pr-1 pl-2 text-sm"
                  style={v.color ? { backgroundColor: v.color } : {}}
                  onClick={(e) => e.stopPropagation()}
                >
                  {v.label}
                  <X
                    className="transition-colors hover:stroke-primary"
                    size={12}
                    onClick={() => handleSelect(v)}
                  />
                </span>
              ))
            ) : (
              <span>{selectedArray[0].label}</span>
            )
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}

          {isSearchable && isOpen && (
            <input
              ref={ref}
              autoFocus
              type="text"
              name="select-search"
              // placeholder={isEmpty ? placeholder : ""}
              className="flex max-w-42 min-w-2 grow overflow-hidden outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ width: `${search.length || 1}ch` }}
            />
          )}
        </div>

        {/* Right side controls */}
        <div className="flex min-w-[41px] items-center justify-end gap-1">
          {isLoading && (
            <Loader2 size={16} className="stroke-text-primary animate-spin" />
          )}
          {isClearable && selectedArray.length ? (
            <>
              <X
                size={16}
                className="text-text-primary transition-colors hover:stroke-primary"
                onClick={handleClear}
              />
              <span className="bg-text-secondary my-0.5 flex w-[1px] self-stretch" />
            </>
          ) : null}
          <ChevronDown
            size={16}
            className={`transform transition-transform hover:stroke-primary ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            onMouseDown={(e) => e.stopPropagation()}
            style={
              menuPortalTarget
                ? {
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    position: "absolute",
                    zIndex: 9999,
                  }
                : {}
            }
            className={`bg-foreground mt-1 w-full overflow-hidden rounded-lg border border-border shadow-lg ${
              menuPortalTarget ? "" : "absolute z-50"
            }`}
          >
            <div className="max-h-60 overflow-auto bg-ui">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-between px-3 py-2 select-none hover:bg-border ${
                    isSelected(option) ? "bg-border font-medium" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                  {isSelected(option) && (
                    <CheckCheck size={16} className="text-primary" />
                  )}
                </div>
              ))}
            </div>
            {filteredOptions.length === 0 && (
              <div className="bg-app px-3 py-6 text-center">No results</div>
            )}
          </div>,
          menuPortalTarget ?? selectRef.current ?? document.body,
        )}
    </div>
  );
};
