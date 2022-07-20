import React from 'react'
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
import EnhancedTableHead from '../components/table-head'
import TableToolbar from '../components/table-toolbar'
import AddModal from '../components/addModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ConfirmModal from '../components/confirmModal';
import EditModal from '../components/editModal'
import UpdateAccount from '../components/UpdateAccount';


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
  
const Applications = () => {


    
  return (
    <div className='applications-wrapper'>Applications</div>
  )
}

export default Applications