import React from 'react';
import { Delete } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { type VehicleStatus } from '@/types/vehicles';
import { useDeleteVehicleStatus } from '@/hooks/queries/v-status';
import Dialog from '@/components/shared/dialog';

interface DeleteStatusDialogProps {
  row: VehicleStatus;
}

export function DeleteStatusDialog({ row }: DeleteStatusDialogProps): React.JSX.Element {
  const { mutate, isPending } = useDeleteVehicleStatus(row.id);

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
          <Typography color="red" component="span">
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
