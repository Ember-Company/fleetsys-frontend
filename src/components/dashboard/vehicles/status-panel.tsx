'use client';

import React, { useMemo } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, CircularProgress, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { type VehicleStatus } from '@/types/vehicles';
import { useGetVehicleStatuses } from '@/hooks/queries/v-status';
import { useSelection } from '@/hooks/use-selection';
import Modal from '@/components/shared/modal';

import { DeleteStatusDialog, StatusForm } from './status';

function noop(): void {
  // do nothing
}

interface VStatusPanelProps {
  count?: number;
  page?: number;
  rowsPerPage?: number;
}

export default function VStatusPanel({ count = 0, page = 0, rowsPerPage = 0 }: VStatusPanelProps): React.JSX.Element {
  const { data: rows, isLoading } = useGetVehicleStatuses();

  return (
    <>
      <Stack width="100%">
        <Box ml="auto" mb={2}>
          <Modal
            buttonTitle="Create New Status"
            modalLabel="Create Vehicle Status"
            Content={<StatusForm variant="create" />}
          />
        </Box>
      </Stack>
      <Card variant="elevation">
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Vehicle Count</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <VStatusPanelRows rows={rows} isLoading={isLoading} />
          </Table>
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={rows?.length || 0}
          onPageChange={noop}
          onRowsPerPageChange={noop}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
}

function VStatusPanelRows({
  rows,
  isLoading,
}: {
  rows: VehicleStatus[] | undefined;
  isLoading: boolean;
}): React.JSX.Element | null {
  const rowIds: string[] = useMemo((): string[] => {
    if (!rows) return [];

    return rows.map((t) => t.id);
  }, [rows]);

  const { selected } = useSelection(rowIds);

  if (isLoading)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  if (!rows) return null;

  return (
    <TableBody>
      {rows?.map((row) => {
        const isSelected = selected?.has(row.id);

        return (
          <TableRow hover key={row.id} selected={isSelected}>
            <TableCell>
              <Typography variant="overline" component="div">
                {row.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Chip label={row.name} variant="filled" color={row.status_color} />
            </TableCell>
            <TableCell>
              <Typography variant="overline" component="div">
                {row.vehicles_count}
              </Typography>
            </TableCell>
            <TableCell>
              <Modal
                isIcon
                Icon={<Edit color="action" />}
                iconButtonProps={{ color: 'secondary' }}
                Content={<StatusForm variant="edit" targetId={row.id} />}
                modalLabel="Edit Vehicle Status"
              />
              <DeleteStatusDialog row={row} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
