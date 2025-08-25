import { renderHook, act } from "@testing-library/react";
import { useAnimatedPresence } from "../useAnimatedPresence";

jest.useFakeTimers();
const setTimeoutSpy = jest.spyOn(global, "setTimeout");
const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

describe("useAnimatedPresence", () => {
  it("should render immediately when initially visible", () => {
    const { result } = renderHook(() => useAnimatedPresence(true));
    expect(result.current).toBe(true);
  });
  it("should not render immediately when initially hidden", () => {
    const { result } = renderHook(() => useAnimatedPresence(false));
    expect(result.current).toBe(false);
  });
  it("should stay rendered after becoming visible", () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useAnimatedPresence(visible),
      { initialProps: { visible: false } },
    );

    expect(result.current).toBe(false);

    rerender({ visible: true });
    expect(result.current).toBe(true);
  });
  it("should stay rendered during exit animation, then unmount", () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useAnimatedPresence(visible, 300),
      { initialProps: { visible: true } },
    );

    expect(result.current).toBe(true);

    // trigger exit
    rerender({ visible: false });

    // still rendered until duration passes
    expect(result.current).toBe(true);

    // advance just before timeout
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe(true);

    // advance past duration
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
  });
  it("should clean up timeout if visibility toggles back to true quickly", () => {
    const { result, rerender } = renderHook(
      ({ visible, duration }) => useAnimatedPresence(visible, duration),
      { initialProps: { visible: true, duration: 300 } },
    );
    expect(result.current).toBe(true);

    rerender({ visible: false, duration: 200 });
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), 200);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe(false);

    rerender({ visible: true, duration: 300 });
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(true);

    // advance timers (no effect, since cleared)
    // act(() => {
    //   jest.runAllTimers();
    // });
    // expect(result.current).toBe(true);
  });
});
