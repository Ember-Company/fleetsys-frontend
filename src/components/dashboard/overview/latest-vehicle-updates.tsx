import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

const statusMap = {
  maintenance: { label: 'Maintenance', color: 'warning' },
  ready: { label: 'Ready', color: 'success' },
  unavailable: { label: 'Unavailable', color: 'error' },
  ongoing: { label: 'Ongoing', color: 'info' },
} as const;

export interface VehicleStatus {
  id: string;
  driver: { name: string };
  amount: number;
  status: 'maintenance' | 'ready' | 'unavailable' | 'ongoing';
  createdAt: Date;
}

export interface LatestVehicleUpdatesProps {
  vehicleUpdates?: VehicleStatus[];
  sx?: SxProps;
}

export function LatestVehicleUpdates({ vehicleUpdates = [], sx }: LatestVehicleUpdatesProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Updates on Vehicles" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Number Plate</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleUpdates.map(({ status, id, driver, createdAt }) => {
              const { label, color } = statusMap[status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{dayjs(createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
