"use client";
import { useEffect } from "react";

export const useScrollControl = (mobile: boolean) => {
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("scrollControl", mobile);
  }, [mobile]);
};
