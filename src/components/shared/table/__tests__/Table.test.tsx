import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/shared/table/table";

describe("Table", () => {
  it("renders all Table components with default and custom classes", () => {
    render(
      <Table data-testid="table" className="custom-table">
        <caption>My table</caption>
        <TableHeader data-testid="thead" className="custom-header">
          <TableRow data-testid="tr" className="custom-row">
            <TableHead data-testid="th" className="custom-head">
              Custom Header
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="tbody" className="custom-body">
          <TableRow className="transition-colors hover:bg-ui-hover">
            <TableCell data-testid="td" className="custom-cell">
              Some Table text
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const selectors = [
      {
        el: screen.getByTestId("table"),
        match: "min-w-full overflow-hidden rounded-md text-left text-sm",
        custom: "custom-table",
      },
      {
        el: screen.getByTestId("thead"),
        match: "bg-ui text-xs text-text-low uppercase",
        custom: "custom-header",
      },
      {
        el: screen.getByTestId("tbody"),
        match: "divide-y divide-border bg-ui-selected",
        custom: "custom-body",
      },
      {
        el: screen.getByTestId("tr"),
        match: "",
        custom: "custom-row",
      },
      {
        el: screen.getByTestId("th"),
        match: "px-4 py-3 font-medium",
        custom: "custom-head",
      },
      {
        el: screen.getByTestId("td"),
        match: "px-4 py-2",
        custom: "custom-cell",
      },
    ];

    selectors.forEach(({ el, match, custom }) => {
      expect(el).toBeInTheDocument();
      expect(el?.className).toMatch(match);
      expect(el?.className).toMatch(custom);
    });

    expect(screen.getByText("My table")).toBeInTheDocument();
  });
});
