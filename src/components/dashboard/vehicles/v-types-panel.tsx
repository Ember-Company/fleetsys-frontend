'use client';

import React, { useMemo } from 'react';
import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { VehicleType } from '@/types/vehicles';
import { useGetVehicleTypes } from '@/hooks/queries';
import { useSelection } from '@/hooks/use-selection';
import Modal from '@/components/shared/modal';

import { TypesForm } from './v-types/v-types-form';

function noop(): void {
  // do nothing
}

interface VTypesPanelProps {
  count?: number;
  page?: number;
  rowsPerPage?: number;
}

const tableHeaders: readonly string[] = ['ID', 'Name', 'Vehicle Amount', 'Actions'];

function VehicleTypesPanel({ count = 0, page = 0, rowsPerPage = 0 }: VTypesPanelProps): React.JSX.Element {
  const { data: rows, isLoading } = useGetVehicleTypes();

  return (
    <>
      <Stack width="100%">
        <Box ml="auto" mb={2}>
          <Modal
            buttonTitle="New Vehicle Type"
            modalLabel="New Vehicle type"
            Content={<TypesForm variant="create" />}
          />
        </Box>
      </Stack>
      <Card variant="elevation">
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((text) => (
                  <TableCell key={text} component="th">
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <VTypesPanelRows rows={rows} isLoading={isLoading} />
            {/* <VStatusPanelRows rows={rows} isLoading={isLoading} /> */}
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

function VTypesPanelRows({
  rows,
  isLoading,
}: {
  rows: VehicleType[] | undefined;
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
          <TableCell colSpan={4} align="center">
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
              <Typography variant="subtitle2">{row.name}</Typography>
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
                Content={<TypesForm variant="edit" targetId={row.id} />}
                modalLabel="Edit Vehicle Status"
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default VehicleTypesPanel;
