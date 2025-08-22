import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip } from "@/components/shared/tooltip/Tooltip";

const positionExpectedClass: Record<
  NonNullable<React.ComponentProps<typeof Tooltip>["position"]>,
  string
> = {
  top: `bottom-full mb-2 left-1/2 -translate-x-1/2`,
  topLeft: `bottom-full mb-2 right-0`,
  topRight: `bottom-full mb-2 left-0`,
  bottom: `top-full mt-2 left-1/2 -translate-x-1/2`,
  bottomLeft: `top-full mt-2 right-0`,
  bottomRight: `top-full mt-2 left-0`,
  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
};

describe("Tooltip", () => {
  it("does not render tooltip content by default", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
  });

  it("shows tooltip content on hover", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  it("hides tooltip content on mouse leave", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
  });

  it.each(
    Object.entries(positionExpectedClass) as [
      keyof typeof positionExpectedClass,
      string,
    ][],
  )("applies correct class for position='%s'", (position, expectedClass) => {
    render(
      <Tooltip content="Tooltip text" position={position}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    fireEvent.mouseEnter(trigger);

    const tooltipDiv = screen.getByText("Tooltip text");
    expect(tooltipDiv.className).toMatch(expectedClass);
  });
});
