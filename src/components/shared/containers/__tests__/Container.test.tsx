import { render, screen } from "@testing-library/react";
import { Container } from "@/components/shared/containers/Container";

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <span>Test Content</span>
      </Container>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Container>Content</Container>);
    const container = screen.getByText("Content");

    expect(container).toHaveClass(
      "rounded-md",
      "border",
      "border-border",
      "p-4",
      "text-high-contrast",
      "shadow",
    );
  });

  it("applies additional className", () => {
    render(<Container className="extra-class">Content</Container>);
    const container = screen.getByText("Content");
    expect(container).toHaveClass("extra-class");
  });

  it("applies inline styles", () => {
    render(
      <Container style={{ backgroundColor: "rgb(255, 0, 0)" }}>
        Content
      </Container>,
    );
    const container = screen.getByText("Content");
    expect(container).toHaveStyle("background-color: rgb(255, 0, 0)");
  });
});
