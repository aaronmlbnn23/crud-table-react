import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Box from '@mui/material/Box';
const EnhancedTableHead = (props) => {
    const headCells = [
      {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'TDID',
      
      },
      {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
  
      },
      {
        id: 'address',
        numeric: true,
        disablePadding: false,
        label: 'Address',
   
      },
      {
        id: 'classification',
        numeric: true,
        disablePadding: false,
        label: 'Classification',
      
      },
      {
        id: 'assessedValue',
        numeric: true,
        disablePadding: false,
        label: 'Assessed Value',
        
      },
      {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
        
      },
    ];


   const createSortHandler = (property) => (event) => {
      
      onRequestSort(event, property);
       

    };
    const { order, orderby, onRequestSort } = props;
      return(
        <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderby === headCell.id ? order : false}
            >
                
              <TableSortLabel
                active={orderby === headCell.id}
                direction={orderby === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderby === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      )
   
  }
  EnhancedTableHead.propTypes = {

    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  };

 
  export default EnhancedTableHead;