import { render, screen } from "@testing-library/react";
import { SaleBadge } from "@/components/entities/product/SaleBadge";

describe("SaleBadge", () => {
  it("renders correct discount percentage", () => {
    render(<SaleBadge price={100} previousPrice={200} />);
    expect(screen.getByText("-50%")).toBeInTheDocument();
  });

  it("rounds discount to nearest whole number", () => {
    render(<SaleBadge price={133} previousPrice={200} />);
    // 200 - 133 = 67 → 67 / 200 = 0.335 → 33.5% → rounds to 34%
    expect(screen.getByText("-34%")).toBeInTheDocument();
  });

  it("shows 0% discount when prices are equal", () => {
    render(<SaleBadge price={200} previousPrice={200} />);
    expect(screen.getByText("-0%")).toBeInTheDocument();
  });

  it("handles small discounts correctly", () => {
    render(<SaleBadge price={95} previousPrice={100} />);
    // (100 - 95) / 100 = 0.05 → 5%
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });
});
