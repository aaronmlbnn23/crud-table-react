import React, {useEffect, useState} from 'react'
import { propertyStore } from '../stores/PropertyStore'
import { userStore } from '../stores/UserStore'
import Loader from '../components/loader'
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
import EnhancedTableHead from "../components/property-table-components/table-head";
import TableToolbar from "../components/property-table-components/table-toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmModal from '../components/confirmModal';
import Toaster from '../components/toaster'

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


 

const Properties = () => {
  const [order, setOrder] = useState("asc");
  const [orderby, setorderby] = useState("name");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchProperties = propertyStore((state) => state.fetchProperties)
  const getUser = userStore((state) => state.getUser)
  const user = userStore((state) => state.user)
  const properties = propertyStore((state) => state.properties)
  const loading = propertyStore((state) => state.loading)
  const [query, setQuery] = useState('')
  const [isDeleteModalOpen, setDeleteModal] = useState(false)
  const [toDelete, setToDelete] = useState()
  const deleteProperty = propertyStore((state) => state.deleteProperty)
  const message = propertyStore((state) => state.message)
  const status = propertyStore((state) => state.status)

  useEffect(() => {
    const getProperties = async () => {
     getUser();
      document.title = 'Properties - RPT'
      await fetchProperties(user.token);
    };
    getProperties();
  }, []);


  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

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

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - properties.length) : 0;

  const handleClose = () => {
    setDeleteModal(false)
  }
  const handleDelete = (id) => {
    setDeleteModal(true)
    setToDelete(id)
  }
  const onDelete = async () => {
    await deleteProperty(toDelete, user.token);
    setToDelete("");
    setDeleteModal(false);
  };
  return (
    <div className='properties-wrapper'>
      {message && status ? <Toaster message={message} status={status} /> : ''}
      <ConfirmModal
        open={isDeleteModalOpen}
        handleClose={handleClose}
        action={onDelete}
        message="
                  Are you sure you want to delete this property?

      "
      title="Delete Property"
      />
    {!loading ?  <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
          <TableToolbar handleSearch={handleSearch} />

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
                  {properties && stableSort(properties, getComparator(order, orderby))
                    .filter((property) => {
                      if (query === "") {
                        return property;
                      } else if (
                        property.tdId.includes(query) ||
                        property.name.toLowerCase().includes(query.toLowerCase())
                      ) {
                        return property;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((property) => {
                      return (
                        <TableRow key={property.id}>
                          <TableCell
                            align="center"
                            style={{ fontWeight: "600" }}
                          >
                            {property.tdId}
                          </TableCell>
        
                          <TableCell align="center">{property.name}</TableCell>
                          <TableCell align="center">{property.address}</TableCell>
                          
                          <TableCell align="center">
                            <Tooltip title="Delete">
                              <IconButton onClick={() => handleDelete(property.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton>
                                <EditIcon />
                              </IconButton>
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
              count={properties.length}
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
        </Box> : <Loader/>}
    
    </div>
  )
}

export default Properties