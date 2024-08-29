'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  type ButtonOwnProps,
  type ButtonProps,
  type IconButtonOwnProps,
  type IconButtonProps,
} from '@mui/material';

interface DialogProps {
  buttonTitle?: string;
  buttonProps?: ButtonProps & ButtonOwnProps;
  iconButtonProps?: IconButtonProps & IconButtonOwnProps;
  dialogLabel?: string;
  dialogDescription?: string;
  isIcon?: boolean;
  Icon?: React.ReactNode;
  title: string;
  body?: string;
  customBody?: React.ReactNode;
  actions: React.ReactNode;
}

function Dialog({
  buttonTitle,
  buttonProps,
  iconButtonProps,
  dialogLabel,
  dialogDescription,
  Icon,
  isIcon = false,
  title,
  body = '',
  customBody,
  actions,
}: DialogProps): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  // useEffect(() => {
  //   if (actionCompleted) {
  //     setOpen(false);
  //   }
  // }, [actionCompleted]);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {isIcon ? (
        <IconButton {...iconButtonProps} onClick={handleOpen}>
          {Icon}
        </IconButton>
      ) : (
        <Button variant="contained" {...buttonProps} onClick={handleOpen}>
          {buttonTitle ?? 'Open Dialog'}
        </Button>
      )}
      <MuiDialog
        open={open}
        onClose={handleClose}
        aria-labelledby={dialogLabel ?? ''}
        aria-describedby={dialogDescription ?? ''}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
            {customBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {actions}
        </DialogActions>
      </MuiDialog>
    </React.Fragment>
  );
}

export default Dialog;
