'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  IconButton,
  Modal as MuiModal,
  Typography,
  type ButtonOwnProps,
  type ButtonProps,
  type IconButtonOwnProps,
  type IconButtonProps,
  type ModalOwnProps,
} from '@mui/material';

interface ModalProps {
  buttonTitle?: string;
  buttonProps?: ButtonProps & ButtonOwnProps;
  iconButtonProps?: IconButtonProps & IconButtonOwnProps;
  modalLabel?: string;
  modalDescription?: string;
  Content: ModalOwnProps['children'];
  isIcon?: boolean;
  Icon?: React.ReactNode;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  boxShadow: 24,
  p: 4,
};

function Modal({
  Content,
  buttonTitle,
  buttonProps,
  iconButtonProps,
  modalDescription,
  modalLabel,
  Icon,
  isIcon = false,
}: ModalProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      {isIcon ? (
        <IconButton {...iconButtonProps} onClick={handleOpen}>
          {/* <Typography variant="subtitle2"></Typography> */}
          {/* <Icon /> */}
          {Icon}
        </IconButton>
      ) : (
        <Button variant="contained" {...buttonProps} onClick={handleOpen}>
          {buttonTitle ?? 'Open Modal'}
        </Button>
      )}
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby={modalLabel ?? ''}
        aria-describedby={modalDescription ?? ''}
      >
        <Card variant="elevation" sx={style}>
          {Content}
        </Card>
      </MuiModal>
    </>
  );
}

export default Modal;
