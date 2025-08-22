import { render, screen } from "@testing-library/react";
import { act } from "react";

import { LoadingOverlay } from "@/components/shared/overlays/LoadingOverlay";
import { useOverlayStore } from "@/utils/hooks/store/useOverlayStore";

describe("LoadingOverlay", () => {
  it("does not render when loading is false", () => {
    act(() => {
      useOverlayStore.setState({ isOverlayLoading: false });
    });
    render(<LoadingOverlay />);
    const element = screen.queryByRole("img");
    expect(element).not.toBeInTheDocument();
  });
  it("renders overlay when loading is true", () => {
    act(() => {
      useOverlayStore.setState({ isOverlayLoading: true });
    });
    render(<LoadingOverlay />);
    const element = screen.getByRole("img");
    expect(element).toBeInTheDocument();
  });
});
