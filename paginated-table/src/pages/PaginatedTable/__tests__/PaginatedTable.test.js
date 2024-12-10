import { render, screen, waitFor , fireEvent} from "@testing-library/react";

import PaginatedTable from "../PaginatedTable";
import { fetchTableData } from "../paginatedTable.actions";

jest.mock("../paginatedTable.actions", () => ({
  fetchTableData: jest.fn(),
}));

describe("PaginatedTable", () => {
  beforeEach(() => {
    fetchTableData.mockResolvedValue([
      { "s.no": 1, "percentage.funded": 50, "amt.pledged": 60 },
      { "s.no": 2, "percentage.funded": 1000, "amt.pledged": 2000 },
    ]);
  });

  it("renders the table with correct data", async () => {
    render(<PaginatedTable />);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("1000")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("60")).toBeInTheDocument();
      expect(screen.getByText("2000")).toBeInTheDocument();
    });
  });
  it('renders the table header correctly', async () => {
    render(<PaginatedTable />);

    await waitFor(() => screen.getByText('S.No.'));

    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount pledged')).toBeInTheDocument();
  });

  it('paginates correctly when next/previous page is clicked', async () => {
    fetchTableData.mockResolvedValueOnce([
      { "s.no": 1, "percentage.funded": 50, "amt.pledged": 60 },
      { "s.no": 2, "percentage.funded": 1000, "amt.pledged": 2000 },
      { "s.no": 3, "percentage.funded": 70, "amt.pledged": 80 },
      { "s.no": 4, "percentage.funded": 3000, "amt.pledged": 4000 },
      { "s.no": 5, "percentage.funded": 3000, "amt.pledged": 4000 },
      { "s.no": 6, "percentage.funded": 3000, "amt.pledged": 4000 },


    ]);

    render(<PaginatedTable />);

    await waitFor(() => screen.getByText('1'));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBeNull();

    fireEvent.click(screen.getByText('Next >'));
    await waitFor(() => screen.getByText('6'));
  
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('changes rows per page correctly when the user selects a new value', async () => {
    render(<PaginatedTable />);

    await waitFor(() => screen.getByText('S.No.'));

    fireEvent.change(screen.getByLabelText('Rows per page:'), { target: { value: '3' } });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('handles errors during data fetching', async () => {
    fetchTableData.mockRejectedValueOnce(new Error('Error fetching data'));

    render(<PaginatedTable />);
    await waitFor(() => screen.getByText(/error fetching data/i));
    expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
  });
});


