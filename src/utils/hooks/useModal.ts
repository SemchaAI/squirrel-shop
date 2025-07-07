"use client";
import { useState } from "react";
import { useScrollControl } from "./useScrollControl";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollControl(isOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
