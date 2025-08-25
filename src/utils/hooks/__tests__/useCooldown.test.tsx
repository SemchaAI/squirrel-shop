import { renderHook, act } from "@testing-library/react";
import { useCooldown } from "../useCooldown";

jest.useFakeTimers();

describe("useCooldown", () => {
  it("should start with cooldown = 0", () => {
    const { result } = renderHook(() => useCooldown());
    expect(result.current.cooldown).toBe(0);
  });
  it("should start cooldown with default duration", () => {
    const { result } = renderHook(() => useCooldown());

    act(() => {
      result.current.startCooldown();
    });

    expect(result.current.cooldown).toBe(60);
  });
  it("should decrease cooldown over time", () => {
    const { result } = renderHook(() => useCooldown(5));

    act(() => {
      result.current.startCooldown();
    });
    expect(result.current.cooldown).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.cooldown).toBe(4);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(result.current.cooldown).toBe(0);
  });
  it("should not go below 0", () => {
    const { result } = renderHook(() => useCooldown(2));
    act(() => {
      result.current.startCooldown();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.cooldown).toBe(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.cooldown).toBe(0);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.cooldown).toBe(0);
  });
});
