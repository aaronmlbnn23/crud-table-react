import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const confirmModal = (props) => {
    const { open, handleClose, action, message, title} = props;
  return (
     <Dialog
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <button onClick={handleClose}>Close</button>
            <button className="btn-primary" onClick={action}>Yes, Proceed</button>
        </DialogActions>
      </Dialog>
  )
}

export default confirmModal