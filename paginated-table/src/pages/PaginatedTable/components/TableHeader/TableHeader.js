import React from "react";

const TableHeader = ({ rowsPerPage, setRowsPerPage, setCurrentPage }) => {
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="Table-Header">
      <h2 className="Table-Title">Paginated Table</h2>
      <div>
        <label className="Rows-Per-Page-Label" htmlFor="rowsPerPage">Rows per page: </label>
        <select
          className="Rows-Per-Page-Options"
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
    </div>
  );
};

export default TableHeader;
