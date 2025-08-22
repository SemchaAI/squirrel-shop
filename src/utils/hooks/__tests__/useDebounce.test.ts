import { renderHook } from "@testing-library/react";
import { useDebounce } from "../useDebounce";
import { act } from "react";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("should debounce value updates", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );
    expect(result.current).toBe("a");
    rerender({ value: "b", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe("a");
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe("b");
  });
  it("should reset timer if value changes before delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "x", delay: 500 } },
    );

    rerender({ value: "y", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: "z", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("x");
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe("z");
  });
});
