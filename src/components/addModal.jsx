import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Register from '../pages/Register'

const addModal = (props) => {
    const { open, handleClose} = props;
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add Account</DialogTitle>
    <DialogContent>
    <Register handleClose={handleClose}/>

     
    </DialogContent>
  </Dialog>
  )
}

export default addModal