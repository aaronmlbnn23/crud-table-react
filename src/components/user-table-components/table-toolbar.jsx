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
  const { handleSearch, openModal } = props;

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
        Manage Accounts
      </Typography>

      <div className="right-toolbar">
        <button type="button" className='addButton' onClick={openModal}>Add Account</button>
        <div className='search-wrapper'>
          <input type='text' className='search' onChange={handleSearch} placeholder='Search' />
          <BiSearch className='search-icon' />
        </div>
      </div>
    </Toolbar>
  );
};


export default TableToolbar;