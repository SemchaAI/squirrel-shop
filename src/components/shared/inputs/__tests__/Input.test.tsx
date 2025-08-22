import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "@/components/shared/inputs/Input";

describe("Input", () => {
  it("applies correct default and custom classes", () => {
    render(<Input data-testid="input" className="custom-class" />);
    const input = screen.getByTestId("input");

    // Check default classes
    expect(input).toHaveClass("rounded-md");
    expect(input).toHaveClass("p-2");
    expect(input).toHaveClass(
      "border-border",
      "text-text-primary",
      "border",
      "bg-background",
      "outline-none",
    );

    // Check custom class
    expect(input).toHaveClass("custom-class");
  });

  it("applies rounded classes", () => {
    render(<Input data-testid="input" rounded />);
    const input = screen.getByTestId("input");

    expect(input).toHaveClass("rounded-full");
    expect(input).toHaveClass("p-1", "pl-8");
  });
  it("applies InputHTMLAttributes", () => {
    render(
      <Input
        data-testid="input"
        rounded
        placeholder="Enter something"
        min={0}
        max={100}
        step={0.1}
        type="number"
      />,
    );
    const input = screen.getByTestId("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "42" } });
    expect(input.value).toBe("42");
    const numericValue = Number(input.value);
    expect(typeof numericValue).toBe("number");
    expect(numericValue).toBe(42);
  });
});
