import React, { useState, useMemo, useCallback, useEffect } from "react";

import TableFooter from "./components/TableFooter/TableFooter";
import TableItems from "./components/TableItems/TableItems";
import TableHeader from "./components/TableHeader/TableHeader";

import { getCurrentItems, getTotalPages } from "./paginatedTable.helpers";
import { fetchTableData } from "./paginatedTable.actions";
import { ITEMS_PER_PAGE } from "./paginationTable.constants";

import "./paginatedTable.css";

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch and set data on load
    const tableData = fetchTableData();
    tableData
      .then((response) => setData(response))
      .catch((err) => setError("Error fetching data. Please try again later."));
  }, []);

  const currentItems = useMemo(
    () => getCurrentItems(data, currentPage, rowsPerPage),
    [currentPage, data, rowsPerPage]
  );
  const totalPages = useMemo(
    () => getTotalPages(data, rowsPerPage),
    [data, rowsPerPage]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Paginated-Table">
      <TableHeader
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <table cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 && <TableItems items={currentItems} />}
        </tbody>
      </table>

      <TableFooter
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PaginatedTable;
