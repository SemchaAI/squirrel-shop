import { render, screen } from "@testing-library/react";
import { ProductInfo } from "@/components/entities/product/ProductInfo";
import type { ProductDescription } from "@prisma/client";

const mockItems: ProductDescription[] = [
  {
    id: "1",
    productId: "p1",
    title: "Weight",
    description: "200g",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    productId: "p1",
    title: "Color",
    description: "Black",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("ProductInfo", () => {
  it("renders nothing if items is empty", () => {
    const { container } = render(<ProductInfo items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders all provided items", () => {
    render(<ProductInfo items={mockItems} />);
    expect(screen.getAllByRole("heading")).toHaveLength(mockItems.length);
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("200g")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Black")).toBeInTheDocument();
  });
});
