import React, { useEffect, useState, useMemo } from 'react'
import { userStore } from '../stores/UserStore'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedTableHead from '../components/user-table-components/table-head'
import TableToolbar from '../components/user-table-components/table-toolbar'
import AddModal from '../components/addModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ConfirmModal from '../components/confirmModal';
import EditModal from '../components/editModal'
import UpdateAccount from '../components/UpdateAccount';
import Loader from '../components/loader';

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
  return order === 'desc'
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




const Accounts = () => {
 

  

  const [order, setOrder] = useState('asc');
  const [orderby, setorderby] = useState('name');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchAccounts = userStore((state) => state.fetchAccounts)
  const users = userStore((state) => state.accounts)
  const updateAccountStatus = userStore((state) => state.updateAccountStatus)
  const deleteAccount = userStore((state) => state.deleteAccount)
  const [isEditModalOpen, setEditModal] = useState(false);
  const accountsToEdit = userStore((state) => state.accountsToEdit)
  const setAccountsToEdit = userStore((state) => state.setAccountsToEdit)
  const [isAddModalOpen, setAddModal] = useState(false);
  const [isDeleteModalOPen, setDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState();
  const updateAccount = userStore((state) => state.updateAccount)
  const token = userStore((state) => state.user)
  const getUser = userStore((state) => state.getUser)
  const loading = userStore((state) => state.loading)
  console.log(loading)
  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    fetchAccounts()
  }, [])



  const handleRequestSort = (event, property) => {
    const isAsc = orderby === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;


    
  const toggleAccountStatus = (id) => {
    const accountStatus = document.getElementById(`${id}`);
    accountStatus.classList.toggle('active')

  }
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  const handleClose = () => {
    setAddModal(false)
    setDeleteModal(false)
    setEditModal(false)
  }

  const openModal = () => {
    setAddModal(true)
  }

  const updateStatus = (id) => {
    updateAccountStatus(id);
  }
  
  const handleDelete = (id) => {
    setDeleteModal(true)
    setToDelete(id)

  }
  const onDelete = async () => {
    await deleteAccount(toDelete);
    setToDelete('')
    setDeleteModal(false)
  }



  const handleEdit = async (user) => {
    await setAccountsToEdit(user)
    setEditModal(true)
  }

  const onUpdate = async (data) => {
    await UpdateAccount(accountsToEdit.name);
  }


 
  return (
    <div className='accounts-wrapper'>
      <ConfirmModal open={isDeleteModalOPen} handleClose={handleClose} onDelete={onDelete} />
      <AddModal open={isAddModalOpen} handleClose={handleClose} />
      <EditModal open={isEditModalOpen} handleClose={handleClose} onUpdate={onUpdate} />
      {!loading ? 
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableToolbar
            handleSearch={handleSearch}
            openModal={openModal}

          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderby={orderby}
                onRequestSort={handleRequestSort}

              />

              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderby)) */}
                {stableSort(users, getComparator(order, orderby))
                  .filter((user) => {
                    if (query === '') {
                      return user
                    } else if (user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase())) {
                      return user;
                    }
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {

                    return (
                      <TableRow key={user.id}>

                        <TableCell align='center' style={{ fontWeight: '600' }} >{user.id}</TableCell>
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.role}</TableCell>
                        <TableCell align="center" className={`status ${user.status === 'active' ? 'active' : 'inactive'}`}>
                          <Switch size='small' onChange={() => updateStatus(user.id)} checked={user.status == 'active'} />

                          {user.status}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(user.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(user)}>
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
            count={users.length}
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


export default Accounts