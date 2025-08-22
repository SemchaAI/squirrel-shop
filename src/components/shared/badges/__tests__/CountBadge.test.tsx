import { render, screen } from "@testing-library/react";
import { CountBadge } from "@/components/shared/badges/CountBadge";

describe("CountBadge", () => {
  it("renders 0 when totalItems is not provided", () => {
    render(<CountBadge totalItems={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the correct number when totalItems is less than or equal to 9", () => {
    render(<CountBadge totalItems={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders '9+' when totalItems is greater than 9", () => {
    render(<CountBadge totalItems={15} />);
    expect(screen.getByText("9+")).toBeInTheDocument();
  });

  it("applies correct class for small numbers", () => {
    render(<CountBadge totalItems={3} />);
    const badge = screen.getByText("3");
    expect(badge).toHaveClass("h-4", "w-4");
  });

  it("applies correct class for numbers greater than 9", () => {
    render(<CountBadge totalItems={12} />);
    const badge = screen.getByText("9+");
    expect(badge).toHaveClass("h-[18px]", "w-[18px]");
  });
});
