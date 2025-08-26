import { fireEvent, render, screen } from "@testing-library/react";
import { DotButton } from "../CarouselDotButton";

describe("DotButton", () => {
  it("renders children", () => {
    render(<DotButton>Click me</DotButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick handler", () => {
    const handleClick = jest.fn();
    render(<DotButton onClick={handleClick}>Click me</DotButton>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
