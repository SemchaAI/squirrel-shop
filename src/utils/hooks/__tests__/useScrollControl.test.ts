import { renderHook } from "@testing-library/react";
import { useScrollControl } from "../useScrollControl";

describe("useScrollControl", () => {
  beforeEach(() => {
    document.documentElement.className = ""; // reset before each test
  });

  it("adds scrollControl class when mobile = true", () => {
    renderHook(() => useScrollControl(true));
    expect(document.documentElement).toHaveClass("scrollControl");
  });

  it("removes scrollControl class when mobile = false", () => {
    document.documentElement.classList.add("scrollControl");

    renderHook(() => useScrollControl(false));
    expect(document.documentElement).not.toHaveClass("scrollControl");
  });

  it("updates when mobile value changes", () => {
    const { rerender } = renderHook(({ mobile }) => useScrollControl(mobile), {
      initialProps: { mobile: false },
    });
    expect(document.documentElement).not.toHaveClass("scrollControl");

    rerender({ mobile: true });
    expect(document.documentElement).toHaveClass("scrollControl");

    rerender({ mobile: false });
    expect(document.documentElement).not.toHaveClass("scrollControl");
  });
});
