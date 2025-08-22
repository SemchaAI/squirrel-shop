import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React, { useState } from "react";
import { Select } from "@/components/shared/inputs/Select";

import type { IOption } from "@/models/inputs";

const options: IOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const ColorOptions: IOption[] = [
  { label: "Apple", value: "apple", color: "rgb(0, 128, 0)" },
  { label: "Banana", value: "banana", color: "rgb(255, 0, 0)" },
  { label: "Cherry", value: "cherry", color: "rgb(255, 255, 0)" },
];

describe("Select", () => {
  const handleChange = jest.fn();

  const renderSelect = (props = {}) =>
    render(
      <Select
        options={options}
        value={undefined}
        onChange={handleChange}
        {...props}
      />,
    );

  it("renders placeholder when no value is selected", () => {
    renderSelect({ placeholder: "Test placeholder" });
    expect(screen.getByText("Test placeholder")).toBeInTheDocument();
  });
  it("toggles menu on click and keyboard", () => {
    renderSelect();
    const toggleButton = screen.getByRole("button", {
      name: /toggle select menu/i,
    });

    ["Enter", " "].forEach((key) => {
      fireEvent.keyDown(toggleButton, { key });
      const element = screen.getByText("Apple");
      expect(element).toBeInTheDocument();
      fireEvent.keyDown(toggleButton, { key });
      expect(element).not.toBeInTheDocument();
    });

    //CLose on escape
    fireEvent.click(toggleButton);
    const el = screen.getByText("Apple");
    expect(el).toBeInTheDocument();
    fireEvent.keyDown(toggleButton, { key: "Escape" });
    expect(el).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    const el2 = screen.getByText("Apple");
    expect(el2).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(el2).not.toBeInTheDocument();
  });
  it("selects and deselects options in single mode", () => {
    const Wrapper = () => {
      const [val, setVal] = useState<IOption[] | IOption | undefined>(
        undefined,
      );
      return (
        <div data-testid="outside">
          <Select options={options} value={val} onChange={setVal} />
        </div>
      );
    };

    render(<Wrapper />);
    //open
    fireEvent.click(screen.getByText("Select..."));
    const apple = screen.getByText("Apple");

    fireEvent.click(screen.getByText("Banana"));
    expect(apple).not.toBeInTheDocument();
    // is selected Banana (list isn`t rendered now)
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });
  it("selects and deselects options in multi mode", () => {
    const Wrapper = () => {
      const [val, setVal] = useState<IOption[] | IOption | undefined>(
        undefined,
      );
      return (
        <div data-testid="outside">
          <Select options={options} value={val} isMulti onChange={setVal} />
        </div>
      );
    };

    render(<Wrapper />);
    fireEvent.click(screen.getByText("Select..."));
    fireEvent.click(screen.getByText("Apple"));
    fireEvent.click(screen.getByText("Cherry"));
    const Banana = screen.getByText("Banana");
    expect(Banana).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside")); // close menu
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
    expect(Banana).not.toBeInTheDocument();
  });

  it("filters options when searchable and stops propagation on input click", () => {
    renderSelect({ isSearchable: true });
    fireEvent.click(screen.getByText("Select..."));
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "ba" } });
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();

    const bodyClickHandler = jest.fn();
    document.body.addEventListener("click", bodyClickHandler);
    fireEvent.click(input);
    expect(bodyClickHandler).not.toHaveBeenCalled();
    fireEvent.click(document.body);
    expect(bodyClickHandler).toHaveBeenCalledTimes(1);
    document.body.removeEventListener("click", bodyClickHandler);
  });

  it("clears selection using X button in single mode", () => {
    const multiVal = [{ label: "Apple", value: "apple" }];
    render(
      <Select
        options={options}
        value={multiVal}
        isClearable
        onChange={handleChange}
      />,
    );

    const clearBtn = screen.getByRole("button", { name: /clear selection/i });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith(undefined);
  });
  it("clears selection using X button in multi mode", () => {
    const multiVal = [{ label: "Apple", value: "apple" }];
    render(
      <Select
        options={options}
        value={multiVal}
        isClearable
        isMulti
        onChange={handleChange}
      />,
    );

    const clearBtn = screen.getByRole("button", { name: /clear selection/i });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("Remove selected option using X button", () => {
    const multiVal = [{ label: "Apple", value: "apple" }];
    render(
      <Select
        options={options}
        value={multiVal}
        isClearable
        isMulti
        onChange={handleChange}
      />,
    );

    const clearBtn = screen.getByRole("button", {
      name: /Remove selected option/i,
    });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
  it("handles backspace to delete last item in multi mode", () => {
    const selected = [{ label: "Apple", value: "apple" }];
    render(
      <Select
        options={options}
        value={selected}
        isMulti
        onChange={handleChange}
      />,
    );
    const toggleButton = screen.getByRole("button", {
      name: /toggle select menu/i,
    });
    fireEvent.keyDown(toggleButton, { key: "Backspace" });
    expect(handleChange).toHaveBeenCalledWith([]);
  });
  it("selects options using Enter", () => {
    const selected = [{ label: "Apple", value: "apple" }];
    render(
      <Select
        options={options}
        value={selected}
        isMulti
        onChange={handleChange}
      />,
    );
    const toggleButton = screen.getByRole("button", {
      name: /toggle select menu/i,
    });
    fireEvent.click(toggleButton);
    const option = screen.getByText("Banana"); // 👈 change label accordingly
    option.focus();
    expect(option).toHaveFocus();
    fireEvent.keyDown(option, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith([
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ]);
  });
  it("renders menu in portal target and prevents propagation", () => {
    const portalTarget = document.createElement("ul");
    portalTarget.setAttribute("data-testid", "portal");
    document.body.appendChild(portalTarget);

    renderSelect({ isSearchable: true, menuPortalTarget: portalTarget });
    fireEvent.click(screen.getByRole("button", { hidden: true }));

    const optionEl = screen.getByText(options[0].label);
    expect(portalTarget).toContainElement(optionEl);
    expect(optionEl).toHaveAttribute("tabindex", "0");

    const bodyClickHandler = jest.fn();
    document.body.addEventListener("mousedown", bodyClickHandler);
    const listbox = screen.getByRole("listbox");
    fireEvent.mouseDown(listbox);
    expect(bodyClickHandler).not.toHaveBeenCalled();
    document.body.removeEventListener("mousedown", bodyClickHandler);
    document.body.removeChild(portalTarget);
  });
  it("renders selected tags with colors and stops propagation on click", () => {
    render(
      <Select
        options={ColorOptions}
        value={ColorOptions}
        isMulti
        onChange={handleChange}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: /toggle select menu/i }),
    );
    const selectedTags = screen.getAllByText(/./, { selector: "span" });
    selectedTags.forEach((tag, i) => {
      const expectedColor = ColorOptions[i].color ?? "";
      expect(tag).toHaveStyle({ backgroundColor: expectedColor });
    });

    const bodyClickHandler = jest.fn();
    document.body.addEventListener("click", bodyClickHandler);
    fireEvent.click(selectedTags[0]);
    expect(bodyClickHandler).not.toHaveBeenCalled();
    document.body.removeEventListener("click", bodyClickHandler);
  });
  it("falls back to document.body when selectRef.current is null", () => {
    const useRefSpy = jest
      .spyOn(React, "useRef")
      .mockImplementation(() => ({ current: null }));
    renderSelect({ isSearchable: true });

    fireEvent.click(screen.getByRole("button", { hidden: true }));
    const optionEl = screen.getByText(options[0].label);
    expect(document.body).toContainElement(optionEl);

    useRefSpy.mockRestore();
  });
  it("focuses container after deselecting option in multi mode", async () => {
    const selected = [{ label: "Apple", value: "apple" }];
    render(
      <Select
        data-testid="select"
        options={options}
        value={selected}
        isMulti
        onChange={handleChange}
      />,
    );
    const toggleButton = screen.getByRole("button", {
      name: /toggle select menu/i,
    });
    fireEvent.click(toggleButton);

    const option1 = screen.getByText("Apple", { selector: "div" });
    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith([]);

    const el = screen.getByTestId("select");
    await userEvent.tab();
    expect(el).toHaveFocus();
  });
  it("disabled component have own classes and cannot select", () => {
    const handleChange = jest.fn();
    render(
      <Select
        data-testid="select"
        options={options}
        value={undefined}
        isDisabled
        onChange={handleChange}
      />,
    );
    const selectEl = screen.getByTestId("select");
    expect(selectEl).toHaveClass("pointer-events-none opacity-50");
    fireEvent.click(screen.getByText("Select..."));
    fireEvent.click(screen.getByText("Banana"));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
