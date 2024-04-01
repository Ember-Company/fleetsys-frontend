'use client';

import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import type { ChartFilterOptions } from '@/types/charts';
import { Chart } from '@/components/core/chart';

export interface LoadTrendsProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
}

interface CardActionsProps {
  filter: ChartFilterOptions;
  handleFilterSelection: (event: SelectChangeEvent) => void;
}

export function LoadTrends({ chartSeries, sx }: LoadTrendsProps): React.JSX.Element {
  const [filter, setFilter] = React.useState<ChartFilterOptions>('6months');
  const chartOptions = useChartOptions();

  const handleFilterSelection = (event: SelectChangeEvent): void => {
    setFilter(event.target.value as ChartFilterOptions);
  };

  return (
    <Card sx={sx}>
      <CardHeader
        action={<CardHeaderActions filter={filter} handleFilterSelection={handleFilterSelection} />}
        title="Loading Trends"
      />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Overview
        </Button>
      </CardActions>
    </Card>
  );
}

function CardHeaderActions({ filter, handleFilterSelection }: CardActionsProps): React.JSX.Element {
  const filterTypes: Record<ChartFilterOptions, string> = {
    'last-month': 'Last month',
    '6months': 'Last 6 months',
    '1year': '1 Year',
  };

  return (
    <Stack direction="row" sx={{ alignItems: 'center' }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Filter by:</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter}
          onChange={handleFilterSelection}
          label="Filter"
        >
          {Object.entries(filterTypes).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
        Sync
      </Button>
    </Stack>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? value.toString() : value.toString()),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
