import React, { forwardRef, useCallback, useRef } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GridActionsCell, GridActionsCellItem } from '@mui/x-data-grid';
import { Trash } from '@phosphor-icons/react';

import { DActionComponent } from '@/types/tables';
import { User } from '@/types/user';
import { useDeleteUser } from '@/hooks/queries';
import Dialog from '@/components/shared/dialog';

type Props = {};

export function DeleteAction({ props, data: { name, id } }: DActionComponent<User>): React.JSX.Element {
  const actionRef = useRef<HTMLButtonElement | null>(null);
  const { mutate, isPending } = useDeleteUser(id);

  const handleDelete = useCallback(() => {
    mutate(null);
  }, []);

  return (
    <GridActionsCellItem
      {...props}
      icon={<Trash fill="var(--NavItem-icon-active-color)" fontSize="2rem" weight="fill" />}
      title="delete"
      key={id}
      role="button"
      label="Delete"
      color="inherit"
      ref={actionRef}
      component={forwardRef((itemProps, ref) => (
        <Dialog
          title="Delete User"
          isIcon
          Icon={<Delete color="error" />}
          iconButtonProps={{ color: 'secondary' }}
          customBody={
            <>
              Are you sure you want to delete{' '}
              <Typography color="red" component="span">
                {name}
              </Typography>
            </>
          }
          actions={
            <Button variant="contained" color="error" disabled={isPending} onClick={handleDelete}>
              {isPending ? <CircularProgress color="error" /> : 'Yes, delete'}
            </Button>
          }
        />
      ))}
      sx={{
        fontSize: '2rem',
      }}
    />
  );
}
