import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeSwitcher } from "@/components/features/buttons/ThemeSwitcher";

// Mock next-themes
const mockSetTheme = jest.fn();
const mockUseTheme = jest.fn();
jest.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
}));

describe("ThemeSwitcher", () => {
  it("renders MoonIcon initially when not mounted", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
    });
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /moon/i })).toBeInTheDocument();
  });

  it("calls setTheme with dark when clicked on light theme", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
    });
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("renders SunIcon when theme is dark", () => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: "dark",
      setTheme: mockSetTheme,
    });
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button", {
      name: /switch to light mode/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /sun/i })).toBeInTheDocument();
  });
});
