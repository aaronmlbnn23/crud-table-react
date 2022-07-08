import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const confirmModal = (props) => {
    const { open, handleClose, onDelete} = props;
  return (
     <Dialog
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle>
            Delete Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this account? This action cannot be reversible. You may want to deactivate the account instead.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <button onClick={handleClose}>Close</button>
            <button className="btn-primary" onClick={onDelete}>Yes, Proceed</button>
        </DialogActions>
      </Dialog>
  )
}

export default confirmModal