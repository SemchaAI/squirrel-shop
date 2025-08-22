import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/shared/skeletons/Skeleton";

describe("Skeleton", () => {
  it("renders with default classes", () => {
    render(<Skeleton />);
    const skeletonDiv = screen.getByRole("status", { name: /loading/i });

    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv.className).toMatch(/animate-pulse/);
    expect(skeletonDiv.className).toMatch(/bg-ui-selected/);
  });
  it("merges additional className props", () => {
    render(<Skeleton className="h-4 w-4 rounded" />);
    const skeletonDiv = screen.getByRole("status", { name: /loading/i });

    expect(skeletonDiv.className).toMatch(/animate-pulse/);
    expect(skeletonDiv.className).toMatch(/bg-ui-selected/);
    expect(skeletonDiv.className).toMatch(/h-4/);
    expect(skeletonDiv.className).toMatch(/w-4/);
    expect(skeletonDiv.className).toMatch(/rounded/);
  });
});
