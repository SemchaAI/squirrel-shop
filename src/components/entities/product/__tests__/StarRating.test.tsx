import { render, screen, fireEvent } from "@testing-library/react";
import { StarRating } from "@/components/entities/product/StarRating";
import type { SVGProps } from "react";

// mock lucide-react's Star component to simplify output
jest.mock("lucide-react", () => ({
  Star: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="star" {...props} />
  ),
}));

describe("StarRating", () => {
  it("renders 5 stars", () => {
    render(<StarRating rating={3} />);
    expect(screen.getAllByTestId("star")).toHaveLength(5);
  });

  it("applies aria-label when id is not provided", () => {
    render(<StarRating rating={4} />);
    expect(screen.getByRole("group")).toHaveAttribute(
      "aria-label",
      "Rating in stars - 4",
    );
  });

  it("uses aria-labelledby when id is provided", () => {
    render(<StarRating id="custom-label" rating={2} />);
    expect(screen.getByRole("group")).toHaveAttribute(
      "aria-labelledby",
      "custom-label",
    );
  });

  it("calls onRate with the correct value when a star is clicked", () => {
    const handleRate = jest.fn();
    render(<StarRating rating={0} onRate={handleRate} />);
    const stars = screen.getAllByTestId("star");
    fireEvent.click(stars[2]); // click 3rd star
    expect(handleRate).toHaveBeenCalledWith(3);
  });

  it("calls setHoveredIndex on hover and reset on leave", () => {
    const setHoveredIndex = jest.fn();
    render(<StarRating rating={0} setHoveredIndex={setHoveredIndex} />);
    const stars = screen.getAllByTestId("star");

    fireEvent.mouseEnter(stars[1]); // hover 2nd star
    expect(setHoveredIndex).toHaveBeenCalledWith(1);

    fireEvent.mouseLeave(stars[1]);
    expect(setHoveredIndex).toHaveBeenCalledWith(-1);
  });

  it("applies text-primary color for active stars and text-text-low for inactive", () => {
    render(<StarRating rating={2.1} />);
    const stars = screen.getAllByTestId("star");

    // first 2 stars should have primary color
    expect(stars[0]).toHaveClass("text-primary");
    expect(stars[1]).toHaveClass("text-primary");
    expect(stars[2]).toHaveClass("text-primary");
    // remaining should have low text color
    expect(stars[3]).toHaveClass("text-text-low");
    expect(stars[4]).toHaveClass("text-text-low");
  });
});
