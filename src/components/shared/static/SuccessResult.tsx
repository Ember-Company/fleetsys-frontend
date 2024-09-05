'use client';

import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

import SuccessImage from '../../../assets/success-illustration.svg';

function SuccessResult(): React.JSX.Element {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image src={SuccessImage} alt="Success" width={400} height={400} />
    </Box>
  );
}

export default SuccessResult;
