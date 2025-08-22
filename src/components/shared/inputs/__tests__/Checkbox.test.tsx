import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "@/components/shared/inputs/Checkbox";
import { useState } from "react";

interface IProps {
  initialChecked?: boolean;
  onChange?: () => void;
}

function TestWrapper({ initialChecked = false, onChange }: IProps) {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <Checkbox
      data-testid="checkbox"
      type="checkbox"
      checked={checked}
      onChange={() => {
        setChecked(!checked);
        onChange?.();
      }}
      name="test"
      label="Accept terms"
      // endAdornment={<div data-testid="end-adornment">End Adornment</div>}
      // error="Error message"
    />
  );
}

describe("Checkbox", () => {
  it("renders with label and is unchecked by default", () => {
    render(
      <Checkbox
        name="test"
        label="Accept terms"
        checked={false}
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText("Accept terms")).not.toBeChecked();
  });
  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        name="test"
        label="Accept"
        checked={false}
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByLabelText("Accept");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
  it("shows check icon when checked", () => {
    render(
      <Checkbox
        name="test"
        label="Accept"
        checked={true}
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText("Accept")).toBeChecked();
    const CheckIcon = screen.getAllByRole("status");
    expect(CheckIcon).toHaveLength(1);
    expect(CheckIcon[0]).toBeInTheDocument();
    expect(CheckIcon[0]).toHaveClass("lucide-check");
  });
  it("toggles checked state on click", () => {
    const handleChange = jest.fn();
    render(<TestWrapper onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
  it("check error state, endAdornment,disabled", () => {
    render(
      <Checkbox
        name="test"
        label="Accept terms"
        endAdornment={<div data-testid="end-adornment">End Adornment</div>}
        error="Error message"
        disabled
      />,
    );
    const input = screen.getByRole("checkbox");
    expect(input).toBeDisabled();

    const labelElement = screen.getByText("Accept terms");
    expect(labelElement).toHaveClass("cursor-not-allowed opacity-50");

    const xIcon = screen.getAllByRole("status");
    expect(xIcon).toHaveLength(1);
    expect(xIcon[0]).toHaveClass("lucide-x");

    const label = screen.getByText("Accept terms");
    expect(label).toHaveClass("text-error");

    expect(screen.getByTestId("end-adornment")).toBeInTheDocument();
  });
});
