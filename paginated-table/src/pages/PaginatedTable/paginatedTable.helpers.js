import { ITEMS_PER_PAGE } from "./paginationTable.constants";

export const getCurrentItems = (data, currentPage, rowsPerPage) => {
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  return data.slice(indexOfFirstItem, indexOfLastItem);
};

export const getTotalPages = (data, rowsPerPage) =>
  Math.ceil(data.length / rowsPerPage);
