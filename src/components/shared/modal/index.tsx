'use client';

import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
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
import { XCircle } from '@phosphor-icons/react';

interface ModalProps {
  buttonTitle?: string;
  buttonProps?: ButtonProps & ButtonOwnProps;
  iconButtonProps?: IconButtonProps & IconButtonOwnProps;
  modalLabel?: string;
  modalDescription?: string;
  Content: ModalOwnProps['children'];
  isIcon?: boolean;
  Icon?: React.ReactNode;
  size?: 'large' | 'normal';
}

function Modal({
  Content,
  buttonTitle,
  buttonProps,
  iconButtonProps,
  modalDescription,
  modalLabel,
  Icon,
  isIcon = false,
  size = 'normal',
}: ModalProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: size === 'normal' ? 450 : 800,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {isIcon ? (
        <IconButton {...iconButtonProps} onClick={handleOpen}>
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
          <IconButton
            onClick={handleClose}
            color="default"
            sx={{ position: 'absolute', top: 16, right: 16 }}
            size="large"
          >
            <Close width={32} height={32} />
          </IconButton>
          {/* <Icon sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Close width={32} height={32} />
          </Icon> */}
          {Content}
        </Card>
      </MuiModal>
    </>
  );
}

export default Modal;
