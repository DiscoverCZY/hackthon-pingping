import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal(props) {
  const { id = 'dialog', title, show, onClose, children, actions = [], ...dialogProps } = props;
  const [open, setOpen] = React.useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show])


  const onHandleClose = (e, fn) => {
    setOpen(false);
    onClose(false);
    if(typeof fn === 'function') fn();
  };

  return (
    <Dialog
      onClose={onHandleClose}
      aria-labelledby={id}
      open={open}
      {...dialogProps}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id={`${id}-title`}>
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onHandleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {
        !actions.length ? null :
        <DialogActions>
          {
            actions.map((action, index) =>{
              const { close, children, id = index, ...btnProps } = action;
              if(close) return <Button key={id} onClick={(e)=>onHandleClose(e, action.onClick)}>{children}</Button>;
              return <Button key={id} {...btnProps}>{children}</Button>
            })
          }
        </DialogActions>
      }
    </Dialog>
  );
}