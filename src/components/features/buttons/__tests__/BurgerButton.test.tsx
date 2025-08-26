import { render, screen, fireEvent } from "@testing-library/react";
import { BurgerButton } from "../BurgerButton";
import { useState } from "react";

const BurgerButtonWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />;
};
describe("BurgerButton", () => {
  it("renders the button", () => {
    const handleClick = jest.fn();
    render(<BurgerButton isOpen={false} onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /toggle menu/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick and changes classes when button is clicked", () => {
    render(<BurgerButtonWrapper />);
    const button = screen.getByRole("button", { name: /toggle menu/i });
    expect(button).not.toHaveClass("rotate-y-180");
    fireEvent.click(button);
    expect(button).toHaveClass("rotate-y-180");
    fireEvent.click(button);
    expect(button).not.toHaveClass("rotate-y-180");
  });
});
