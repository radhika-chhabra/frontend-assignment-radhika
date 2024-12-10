import React from "react";
import PropTypes from "prop-types";

const TableItems = ({ items }) => {
  return items.map((item) => (
    <tr key={item["s.no"]}>
      <td>{item["s.no"]}</td>
      <td>{item["percentage.funded"]}</td>
      <td>{item["amt.pledged"]}</td>
    </tr>
  ));
};

TableItems.propTypes = {
  items: PropTypes.Array,
};

TableItems.defaultProps = {
  items: [],
};

export default TableItems;
