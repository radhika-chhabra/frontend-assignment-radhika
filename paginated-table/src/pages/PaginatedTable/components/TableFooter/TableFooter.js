import React from "react";

import "../../paginatedTable.css";

const TableFooter = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <div className="Table-Footer">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="Footer-Button"
      >
        {"<< "}First
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="Footer-Button"
      >
        {"< "} Prev
      </button>
      <span>
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="Footer-Button"
      >
        Next{" >"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="Footer-Button"
      >
        Last{" >>"}
      </button>
    </div>
  );
};

export default TableFooter;
