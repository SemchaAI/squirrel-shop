import { render, screen } from "@testing-library/react";
import { StockInfo } from "@/components/entities/product/StockInfo";

describe("StockInfo", () => {
  it("renders out of stock message when stock is 0 (<1)", () => {
    render(<StockInfo stock={0} />);
    expect(screen.getByText(/product is out of stock/i)).toBeInTheDocument();
  });

  it("renders low stock warning when stock is between 1 and 9", () => {
    render(<StockInfo stock={3} />);
    expect(screen.getByText(/only/i)).toBeInTheDocument();
    expect(screen.getByText(/3 items/i)).toHaveClass("text-orange-500");
  });

  it("renders nothing when stock is 10 or more", () => {
    const { container } = render(<StockInfo stock={15} />);
    expect(container).toBeEmptyDOMElement();
  });
});
