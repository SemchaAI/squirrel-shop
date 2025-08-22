import { render, screen } from "@testing-library/react";
import { AccessDenied } from "@/components/shared/placeholders/AccessDenied";

describe("AccessDenied", () => {
  it("renders default title and text when no props are provided", () => {
    render(<AccessDenied />);

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(
      screen.getByText("You do not have access to this page."),
    ).toBeInTheDocument();
  });

  it("renders custom title and text when props are provided", () => {
    render(
      <AccessDenied
        title="Custom Title"
        text="Custom text message for access denied."
      />,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(
      screen.getByText("Custom text message for access denied."),
    ).toBeInTheDocument();
  });
});
