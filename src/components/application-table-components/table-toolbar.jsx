import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { set } from 'react-hook-form';
import { userStore } from '../../stores/UserStore';
import { BiSearch } from 'react-icons/bi'

const TableToolbar = (props) => {
  const { handleSearch, openModal, filterApplications } = props;

  return (
    <Toolbar
      className='toolbar'
    >

      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Manage Applications
      </Typography>

      <div className="right-toolbar" >
        <select className='application-filter'  onChange={filterApplications}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className='search-wrapper'>
          <input type='text' className='search' onChange={handleSearch} placeholder='Search' />
          <BiSearch className='search-icon' />
        </div>
      </div>
    </Toolbar>
  );
};


export default TableToolbar;