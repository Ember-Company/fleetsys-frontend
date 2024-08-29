'use client';

import React from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { VehicleStatus } from '@/types/vehicles';
import { useDeleteVehicleType } from '@/hooks/queries';
import Dialog from '@/components/shared/dialog';

interface DeleteStatusDialogProps {
  row: VehicleStatus;
}

export function DeleteTypeDialog({ row }: DeleteStatusDialogProps): React.JSX.Element {
  const { mutate, isPending } = useDeleteVehicleType(row.id);

  const handleDelete = (): void => {
    mutate(null);
  };

  return (
    <Dialog
      isIcon
      Icon={<Delete color="error" />}
      iconButtonProps={{ color: 'secondary' }}
      title="Delete Vehicle Status"
      customBody={
        <Box>
          Are you sure you want to delete{' '}
          <Typography color="red" component="span" sx={{ fontWeight: 'bold' }}>
            {row.name}
          </Typography>
        </Box>
      }
      actions={
        <Button variant="contained" color="error" disabled={isPending} onClick={handleDelete}>
          {isPending ? <CircularProgress color="error" /> : 'Yes, delete'}
        </Button>
      }
    />
  );
}
