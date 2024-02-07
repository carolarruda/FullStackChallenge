/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import SortIcon from "@mui/icons-material/Sort";
import classes from "./TableRemoveFunc.module.css";
import { useNavigate } from "react-router-dom";

const TableProducts = ({ products, setProducts }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 


  const handleSort = (columnName) => {
    if (columnName === sortedColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
  };

  const compareProducts = (productA, productB) => {
    const valueA = productA[sortedColumn];
    const valueB = productB[sortedColumn];
    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  };

  const filterProducts = (product) => {
    const productNameMatch = product?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const productDescriptionMatch = product?.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return productNameMatch || productDescriptionMatch;
  };

  const filteredAndSortedProducts = products
    ? products.filter(filterProducts).sort(compareProducts)
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteProduct = (id) => {
    const opts = {
      method: "DELETE",
    };
  
    fetch(`http://localhost:4000/products/${id}`, opts)
      .then((response) => {
        if (response.ok) {
          return fetch(`http://localhost:4000/products`)
            .then((res) => res.json())
            .then((data) => {
              setProducts(data?.products);
            })
            .catch((error) => {
              console.error("Error fetching products after deletion:", error);
            });
        } else {
          console.error("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  return (
    <div className={classes.tableContainer}>
      <input
        className={classes.searchInput}
        type="text"
        placeholder="Search by name or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredAndSortedProducts.length > 0 && (
        <table>
          <thead className={classes.headersContainer}>
            <tr className={classes.tableHeaders}>
              <th onClick={() => handleSort("name")}>
                <span>
                  {" "}
                  <SortIcon />
                  Name
                </span>
              </th>
              <th onClick={() => handleSort("description")}>
                <span>
                  {" "}
                  <SortIcon />
                  Description
                </span>
              </th>
              <th onClick={() => handleSort("price")}>
                <span>
                  {" "}
                  <SortIcon />
                  Price
                </span>
              </th>
              <th onClick={() => handleSort("quantity")}>
                <span>
                  {" "}
                  <SortIcon />
                  Category
                </span>
              </th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>

                <td>
                  <button
                    className={classes.deleteButton}
                    onClick={() => {
                      handleDeleteProduct(product.id, products);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className={classes.pagination}>
          <button
            className={classes.paginationButton}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className={classes.arrows}>{"<"}</span>
          </button>
          <span className={classes.pagesInfo}>
            {currentPage} of {totalPages}
          </span>
          <button
            className={classes.paginationButton}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className={classes.arrows}>{">"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

TableProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
  setProducts: PropTypes.func.isRequired,
};

export default TableProducts;
