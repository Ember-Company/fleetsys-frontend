'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Modal as MuiModal,
  type ButtonOwnProps,
  type ButtonProps,
  type ModalOwnProps,
} from '@mui/material';

interface ModalProps {
  buttonTitle?: string;
  buttonProps?: ButtonProps & ButtonOwnProps;
  modalLabel?: string;
  modalDescription?: string;
  Content: ModalOwnProps['children'];
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  boxShadow: 24,
  p: 4,
};

function Modal({ Content, buttonTitle, buttonProps, modalDescription, modalLabel }: ModalProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" {...buttonProps} onClick={handleOpen}>
        {buttonTitle ?? 'Open Modal'}
      </Button>
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
