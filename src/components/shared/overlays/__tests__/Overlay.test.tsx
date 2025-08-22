import { fireEvent, render, screen } from "@testing-library/react";
import { Overlay } from "@/components/shared/overlays/Overlay";

describe("Overlay", () => {
  const handleClick = jest.fn();
  it("renders correctly", () => {
    render(<Overlay onClick={handleClick} />);
    const overlay = screen.getByRole("presentation");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass(
      "fixed",
      "top-0",
      "left-0",
      "z-10",
      "h-dvh",
      "w-full",
      "bg-black/50",
    );
  });
  it("calls onClick when clicked", () => {
    render(<Overlay onClick={handleClick} />);
    const overlay = screen.getByRole("presentation");
    fireEvent.click(overlay);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
