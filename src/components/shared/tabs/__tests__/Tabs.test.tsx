// Tabs.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "@/components/shared/tabs/Tabs";

describe("Tabs", () => {
  const tabs = [
    { label: "Tab 1", content: "Content 1" },
    { label: "Tab 2", content: "Content 2" },
    { label: "Tab 3", content: "Content 3" },
  ];

  it("shows only one tab content at a time", () => {
    render(<Tabs tabs={tabs} defaultIndex={0} />);
    const tab2Button = screen.getByRole("button", { name: "Tab 2" });
    const tab3Button = screen.getByRole("button", { name: "Tab 3" });

    expect(screen.getByText("Content 1")).toHaveClass("opacity-100");
    expect(screen.getByText("Content 2")).toHaveClass("opacity-0");
    expect(screen.getByText("Content 3")).toHaveClass("opacity-0");

    fireEvent.click(tab2Button);

    expect(screen.getByText("Content 1")).toHaveClass("opacity-0");
    expect(screen.getByText("Content 2")).toHaveClass("opacity-100");
    expect(screen.getByText("Content 3")).toHaveClass("opacity-0");

    fireEvent.click(tab3Button);

    expect(screen.getByText("Content 1")).toHaveClass("opacity-0");
    expect(screen.getByText("Content 2")).toHaveClass("opacity-0");
    expect(screen.getByText("Content 3")).toHaveClass("opacity-100");
  });

  it("changes active tab when clicked", () => {
    render(<Tabs tabs={tabs} defaultIndex={0} />);

    const tab2Button = screen.getByRole("button", { name: "Tab 2" });
    fireEvent.click(tab2Button);

    expect(screen.getByText("Content 2")).toHaveClass("opacity-100");
    expect(screen.getByText("Content 1")).toHaveClass("opacity-0");
  });

  it("applies active and inactive styles correctly", () => {
    render(<Tabs tabs={tabs} defaultIndex={0} />);

    const tab1Button = screen.getByRole("button", { name: "Tab 1" });
    const tab2Button = screen.getByRole("button", { name: "Tab 2" });

    // Tab 1 should have primary style
    expect(tab1Button.className).toMatch(/text-primary/);
    // Tab 2 should have low-text style
    expect(tab2Button.className).toMatch(/text-text-low/);

    fireEvent.click(tab2Button);

    // Now Tab 2 should be primary
    expect(tab2Button.className).toMatch(/text-primary/);
    expect(tab1Button.className).toMatch(/text-text-low/);
  });
});
