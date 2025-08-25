import { renderHook } from "@testing-library/react";
import { useModal } from "../useModal";
import { act } from "react";

describe("useModal", () => {
  it("should start with isOpen = false", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
    expect(document.documentElement).not.toHaveClass("scrollControl");
  });
  it("should open modal and add scroll control class", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
    expect(document.documentElement).toHaveClass("scrollControl");
  });
  it("should close modal and remove scroll control class", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(document.documentElement).not.toHaveClass("scrollControl");
  });
});
