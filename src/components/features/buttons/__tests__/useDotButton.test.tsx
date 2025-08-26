import { renderHook, act } from "@testing-library/react";
import { useDotButton } from "../CarouselDotButton";
import type { EmblaCarouselType } from "embla-carousel";

describe("useDotButton with mocked emblaApi", () => {
  let emblaApi: EmblaCarouselType;

  beforeEach(() => {
    emblaApi = {
      scrollTo: jest.fn(),
      scrollSnapList: jest.fn(() => [0, 1, 2]),
      selectedScrollSnap: jest.fn(() => 1),
      on: jest.fn().mockReturnThis(), // allow chaining
    } as unknown as EmblaCarouselType;
  });

  it("initializes scrollSnaps and selectedIndex", () => {
    const { result } = renderHook(() => useDotButton(emblaApi));

    expect(result.current.scrollSnaps).toEqual([0, 1, 2]);
    expect(result.current.selectedIndex).toBe(1);
  });

  it("calls emblaApi.scrollTo when onDotButtonClick is called", () => {
    const { result } = renderHook(() => useDotButton(emblaApi));

    act(() => {
      result.current.onDotButtonClick(2);
    });

    expect(emblaApi.scrollTo).toHaveBeenCalledWith(2);
  });
  it("does nothing if emblaApi is undefined", () => {
    const { result } = renderHook(() => useDotButton(undefined));

    act(() => {
      result.current.onDotButtonClick(1);
    });

    expect(result.current.scrollSnaps).toEqual([]);
    expect(result.current.selectedIndex).toBe(0);
  });
});

// it("handles select events", () => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
//   const callbackMap: Record<string, Function[]> = {};
//   emblaApi.on = jest.fn((event, cb) => {
//     callbackMap[event] = callbackMap[event] || [];
//     callbackMap[event].push(cb);
//     return emblaApi;
//   }) as any;

//   const { result } = renderHook(() => useDotButton(emblaApi));

//   // simulate select event
//   act(() => {
//     emblaApi.selectedScrollSnap = jest.fn(() => 2);
//     callbackMap["select"].forEach((cb) => cb(emblaApi));
//   });

//   expect(result.current.selectedIndex).toBe(2);
// });

// it("handles reInit events", () => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
//   const callbackMap: Record<string, Function[]> = {};
//   emblaApi.on = jest.fn((event, cb) => {
//     callbackMap[event] = callbackMap[event] || [];
//     callbackMap[event].push(cb);
//     return emblaApi;
//   });

//   const { result } = renderHook(() => useDotButton(emblaApi));

//   // simulate reInit
//   act(() => {
//     emblaApi.scrollSnapList = jest.fn(() => [0, 1, 2, 3]);
//     callbackMap["reInit"].forEach((cb) => cb(emblaApi));
//   });

//   expect(result.current.scrollSnaps).toEqual([0, 1, 2, 3]);
// });
