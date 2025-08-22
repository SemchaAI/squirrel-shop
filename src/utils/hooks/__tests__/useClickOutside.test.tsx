import { useRef } from "react";
import { useClickOutside } from "../useClickOutside";
import { fireEvent, render, screen } from "@testing-library/react";

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, onOutsideClick);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe("useClickOutside", () => {
  it("calls handler when clicking outside", () => {
    const handler = jest.fn();
    render(<TestComponent onOutsideClick={handler} />);

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
  it("does not call handler when clicking inside", () => {
    const handler = jest.fn();
    render(<TestComponent onOutsideClick={handler} />);

    fireEvent.mouseDown(screen.getByTestId("inside"));

    expect(handler).not.toHaveBeenCalled();
  });

  it("works with touch events outside", () => {
    const handler = jest.fn();
    render(<TestComponent onOutsideClick={handler} />);

    fireEvent.touchStart(screen.getByTestId("outside"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
  it("cleans up listeners after unmount", () => {
    const handler = jest.fn();
    const { unmount } = render(<TestComponent onOutsideClick={handler} />);
    const outside = screen.getByTestId("outside");

    unmount();
    fireEvent.mouseDown(outside);
    expect(handler).not.toHaveBeenCalled();
  });
});
