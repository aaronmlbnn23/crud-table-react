import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateAccounts from '../components/UpdateAccount'

const editModal = (props) => {
    const {open, handleClose, onUpdate} = props;
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add Account</DialogTitle>
    <DialogContent>

    <UpdateAccounts handleClose={handleClose} onUpdate={onUpdate} />
     
    </DialogContent>
  </Dialog>
  )
}

export default editModal