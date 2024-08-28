'use client';

import React, { useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { VehicleStatus } from '@/types/vehicles';
import { logger } from '@/lib/default-logger';
import { useGetVehicleStatuses } from '@/hooks/queries/v-status';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

interface VStatusPanelProps {
  count?: number;
  page?: number;
  // rows?: VehicleStatus[];
  rowsPerPage?: number;
}

function VStatusPanel({ count = 0, page = 0, rowsPerPage = 0 }: VStatusPanelProps): React.JSX.Element {
  const { data: rows, isLoading } = useGetVehicleStatuses();

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
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

  if (isLoading) return <CircularProgress />;
  if (!rows) return null;

  return (
    <TableBody>
      {rows?.map((row) => {
        const isSelected = selected?.has(row.id);

        return (
          <TableRow hover key={row.name} selected={isSelected}>
            <TableCell>
              <Stack spacing={2}>
                <Typography variant="overline">{row.id}</Typography>
              </Stack>
            </TableCell>
            <TableCell scope="row">
              <Typography variant="subtitle2">{row.name}</Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default VStatusPanel;
