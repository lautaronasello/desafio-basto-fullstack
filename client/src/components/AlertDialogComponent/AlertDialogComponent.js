import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialogComponent(props) {
  const { handleClose, handleConfirmAccionDialog, title, secondaryText, row } =
    props;

  return (
    <div>
      <Dialog
        open={title !== null}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {secondaryText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
          <Button onClick={() => handleConfirmAccionDialog(row._id)}>
            confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
