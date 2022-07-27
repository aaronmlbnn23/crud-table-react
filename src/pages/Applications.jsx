import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EnhancedTableHead from "../components/application-table-components/table-head";
import TableToolbar from "../components/application-table-components/table-toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { userStore } from "../stores/UserStore";
import Loader from "../components/loader";
import { appStore } from "../stores/AppStore";
 

function descendingComparator(a, b, orderby) {
  if (b[orderby] < a[orderby]) {
    return -1;
  }
  if (b[orderby] > a[orderby]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderby) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderby)
    : (a, b) => -descendingComparator(a, b, orderby);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Applications = () => {
  const [order, setOrder] = useState("asc");
  const [orderby, setorderby] = useState("name");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchApplications = appStore((state) => state.fetchApplications);
  const applications = appStore((state) => state.applications);
  const [querySearch, setQuerySearch] = useState("");
  const getUser = userStore((state) => state.getUser);
  const token = userStore((state) => state.token);
  const [filteredData, setFilteredData] = useState("pending");
  const loading = appStore((state) => state.loading);
  const user = userStore((state) => state.user)

  const handleSearch = (e) => {
    setQuerySearch(e.target.value);
  };
  const filterApplications = (e) => {
    setFilteredData(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const getApplications = async () => {
      getUser();
      document.title = 'Applications - RPT'
      await fetchApplications(user.token);
    };
    getApplications();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderby === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setorderby(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const applicationStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending'
      case 'approved':
        return 'status-approved'
      case 'rejected':
        return 'status-rejected'
      default:
        return ''
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applications.length) : 0;

  return (
    <div className="applications-wrapper">
      {!loading ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableToolbar
              handleSearch={handleSearch}
              filterApplications={filterApplications}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  order={order}
                  orderby={orderby}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderby)) */}
                  {applications &&
                    stableSort(applications, getComparator(order, orderby))
                      .filter((app) => {
                        if (querySearch === "") {
                          return app;
                        } else if (
                          app.tdId
                            .toLowerCase()
                            .includes(querySearch.toLowerCase()) ||
                          app.name
                            .toLowerCase()
                            .includes(querySearch.toLowerCase())
                        ) {
                          return app;
                        }
                      })
                      .filter((app) => {
                        if (filteredData === app.status) {
                          return app;
                        }
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((app) => {
                        return (
                          <TableRow key={app.id}>
                            <TableCell
                              align="center"
                              style={{ fontWeight: "600" }}
                            >
                              {app.tdId}
                            </TableCell>
                            <TableCell align="center">{app.name}</TableCell>
                            <TableCell align="center">{app.address}</TableCell>
                            <TableCell align="center">
                              {app.classification}
                            </TableCell>
                            <TableCell align="center">
                              <span className={`application-status ${applicationStatus(app.status)}`}> {app.status}</span>

                            </TableCell>

                            <TableCell align="center">
                              <Tooltip title="View details">
                                <Link
                                  className=""
                                  to={`/application/${app.id}`}
                                >
                                  <IconButton>
                                    <OpenInNewIcon />
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 40]}
              component="div"
              count={applications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Applications;
