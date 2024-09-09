import React from 'react';
import { Box, Button, ButtonProps } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  type GridToolbarProps,
  type ToolbarPropsOverrides,
} from '@mui/x-data-grid';

interface CustomToolBarProps extends GridToolbarProps {
  createButtonProps: ButtonProps;
}

export function ToolBar({ title }: CustomToolBarProps & ToolbarPropsOverrides): React.JSX.Element {
  return (
    <GridToolbarContainer sx={{ paddingY: '0.75rem', paddingX: 2 }}>
      <GridToolbarQuickFilter sx={{ minWidth: 400 }} variant="outlined" size="small" />

      <Box sx={{ marginLeft: 'auto' }} display="flex" gap={1}>
        <GridToolbarColumnsButton slotProps={{ button: { color: 'secondary', variant: 'text' } }} />
        <GridToolbarDensitySelector slotProps={{ button: { color: 'secondary', variant: 'text' } }} />
        <GridToolbarExport slotProps={{ button: { color: 'secondary', variant: 'text' } }} />
        {/* <Button variant="contained" size="small" {...createButtonProps}>

          Add {title}
        </Button> */}
      </Box>
    </GridToolbarContainer>
  );
}
