import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/shared/buttons/Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-base");
    expect(button).toHaveClass("rounded-md");
  });

  it("shows loading spinner when loading is true", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
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
      render(
        <Button variant={variant} size={size} rounded={rounded}>
          {variant} {size} {rounded}
        </Button>,
      );
      const btn = screen.getByRole("button");
      expect(btn).toMatchSnapshot();
    },
  );
});
