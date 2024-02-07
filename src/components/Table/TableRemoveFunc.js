/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import SortIcon from "@mui/icons-material/Sort";
import classes from "./TableRemoveFunc.module.css";

const TableRemoveFunc = ({ clients, setClients }) => {
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

  const compareClients = (clientA, clientB) => {
    const valueA = clientA[sortedColumn];
    const valueB = clientB[sortedColumn];
    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  };

  const filterClients = (client) => {
    const fullName = `${client?.first_name} ${client?.last_name}`;
    const fullNameMatch = fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const companyNameMatch = client?.company_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return fullNameMatch || companyNameMatch;
  };

  const filteredAndSortedClients = clients
    ? clients.filter(filterClients).sort(compareClients)
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedClients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClient = (id) => {
    const opts = {
      method: "DELETE",
    };

    fetch(`http://localhost:4000/clients/${id}`, opts)
      .then((response) => {
        if (response.ok) {
          return fetch(`http://localhost:4000/clients`)
            .then((res) => res.json())
            .then((data) => {
              setClients(data?.clients);
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
        placeholder="Search by name or company..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredAndSortedClients.length === 0 && (
        <div className={classes.noUsersMessage}>No users found</div>
      )}
      {filteredAndSortedClients.length > 0 && (
        <table>
          <thead className={classes.headersContainer}>
            <tr className={classes.tableHeaders}>
              <th onClick={() => handleSort("first_name")}>
                <span>
                  {" "}
                  <SortIcon />
                  Name
                </span>
              </th>
              <th onClick={() => handleSort("company_name")}>
                <span>
                  {" "}
                  <SortIcon />
                  Company Name
                </span>
              </th>
              <th onClick={() => handleSort("phone_number")}>
                <span>
                  {" "}
                  <SortIcon />
                  Phone Number
                </span>
              </th>
              <th onClick={() => handleSort("email")}>
                <span>
                  {" "}
                  <SortIcon />
                  Email
                </span>
              </th>
              <th onClick={() => handleSort("country")}>
                <span>
                  {" "}
                  <SortIcon />
                  Country
                </span>
              </th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((client, index) => (
              <tr key={index}>
                <td>
                  {client.first_name} {client.last_name}
                </td>
                <td>{client.company_name}</td>
                <td>{client.phone_number}</td>
                <td>{client.email}</td>
                <td>{client.country}</td>
                <td>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className={classes.deleteButton}
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
            <span className={classes.arrows}> {"<"}</span>
          </button>
          <span className={classes.pagesInfo}>
            {currentPage} of {totalPages}
          </span>
          <button
            className={classes.paginationButton}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className={classes.arrows}> {">"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

TableRemoveFunc.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
      company_name: PropTypes.string.isRequired,
    })
  ),
};

export default TableRemoveFunc;
