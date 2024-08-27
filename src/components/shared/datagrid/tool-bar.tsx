import React from 'react';
import { Box, Button } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  type GridToolbarProps,
  type ToolbarPropsOverrides,
} from '@mui/x-data-grid';

export function ToolBar({ title }: GridToolbarProps & ToolbarPropsOverrides): React.JSX.Element {
  return (
    <GridToolbarContainer sx={{ paddingY: '0.75rem' }}>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ marginLeft: 'auto' }} display="flex" gap={4}>
        <GridToolbarQuickFilter />
        <Button variant="contained" size="small">
          Add {title}
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}
