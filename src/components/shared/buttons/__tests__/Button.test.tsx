import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/shared/buttons/Button";

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-base");
    expect(button).toHaveClass("rounded-md");
  });

  it("shows loading spinner when loading is true", () => {
    const { container } = render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    const svgEl = container.querySelector("svg.lucide-loader-circle"); //Loader2 Loader2Icon  class
    expect(svgEl).toBeInTheDocument();
  });

  it("is disabled when disabled is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Can`t click
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

const variants = ["primary", "ghost", "text", "destructive"] as const;
const sizes = ["none", "sm", "md", "lg"] as const;
const roundings = ["full", "md", "none"] as const;

describe("Button snapshot combinations", () => {
  it.each(
    variants.flatMap((variant) =>
      sizes.flatMap((size) =>
        roundings.map((rounded) => [variant, size, rounded] as const),
      ),
    ),
  )(
    "matches snapshot for variant='%s', size='%s', rounded='%s'",
    (variant, size, rounded) => {
      const { container } = render(
        <Button variant={variant} size={size} rounded={rounded}>
          {variant} {size} {rounded}
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    },
  );
});

// it.each([
//   ["sm", ["px-3", "py-1.5", "text-sm"]],
//   ["md", ["px-4", "py-2", "text-base"]],
//   ["lg", ["px-6", "py-3", "text-lg"]],
//   ["none", ["text-sm"]],
// ])("applies size variant '%s'", (size, expectedClasses) => {
//   render(<Button size={size as "sm" | "md" | "lg" | "none"}>{size}</Button>);
//   expect(screen.getByRole("button")).toHaveClass(...expectedClasses);
// });

// it.each([
//   ["md", "rounded-md"],
//   ["full", "rounded-full"],
//   ["none", "rounded-none"],
// ])("applies rounded variant '%s'", (rounded, expectedClass) => {
//   render(
//     <Button rounded={rounded as "md" | "full" | "none"}>Rounded</Button>,
//   );
//   const button = screen.getByRole("button");
//   expect(button).toHaveClass(expectedClass);
// });

// it.each([
//   ["primary", ["bg-primary"]],
//   ["ghost", ["bg-transparent", "text-primary", "border-primary"]],
//   ["text", ["border-transparent", "text-primary", "border-transparent"]],
//   ["destructive", ["bg-error", "border-error", "text-white"]],
// ])("applies visual variant '%s'", (variant, expectedClasses) => {
//   render(
//     <Button variant={variant as "primary" | "ghost" | "text" | "destructive"}>
//       Variant
//     </Button>,
//   );
//   const button = screen.getByRole("button");
//   expect(button).toHaveClass(...expectedClasses);
// });
