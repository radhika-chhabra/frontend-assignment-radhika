import { render, screen, fireEvent } from "@testing-library/react";
import TableFooter from "../components/TableFooter";

describe("TableFooter", () => {
  let handlePageChangeMock;

  beforeEach(() => {
    handlePageChangeMock = jest.fn();
  });

  it("renders the correct page information", () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={2}
        totalPages={5}
      />
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it('disables the "First" and "Prev" buttons when on the first page', () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={1}
        totalPages={5}
      />
    );

    expect(screen.getByText("<< First")).toBeDisabled();
    expect(screen.getByText("< Prev")).toBeDisabled();
  });

  it('disables the "Next" and "Last" buttons when on the last page', () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={5}
        totalPages={5}
      />
    );
    expect(screen.getByText("Next >")).toBeDisabled();
    expect(screen.getByText("Last >>")).toBeDisabled();
  });

  it('calls handlePageChange with correct arguments when the "First" button is clicked', () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={2}
        totalPages={5}
      />
    );
    fireEvent.click(screen.getByText("<< First"));
    expect(handlePageChangeMock).toHaveBeenCalledWith(1);
  });

  it('calls handlePageChange with correct arguments when the "Prev" button is clicked', () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={3}
        totalPages={5}
      />
    );
    fireEvent.click(screen.getByText("< Prev"));
    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls handlePageChange with correct arguments when the "Next" button is clicked', () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={2}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText("Next >"));
    expect(handlePageChangeMock).toHaveBeenCalledWith(3);
  });

  it('calls handlePageChange with correct arguments when the "Last" button is clicked', () => {
    render(
      <TableFooter
        handlePageChange={handlePageChangeMock}
        currentPage={2}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText("Last >>"));
    expect(handlePageChangeMock).toHaveBeenCalledWith(5);
  });
});
