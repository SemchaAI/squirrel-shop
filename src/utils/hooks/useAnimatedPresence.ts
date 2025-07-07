"use client";
import { useEffect, useState } from "react";

/**
 * Custom hook to keep a component mounted during exit animation.
 * @param isVisible Should the component be visible?
 * @param duration Duration of the exit animation (ms)
 */
export function useAnimatedPresence(isVisible: boolean, duration = 300) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  return shouldRender;
}
