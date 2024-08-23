import React from 'react';
import { Box, Button } from '@mui/material';
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarProps,
  GridToolbarQuickFilter,
  ToolbarPropsOverrides,
} from '@mui/x-data-grid';

function ToolBar(): React.JSX.Element {
  return (
    <GridToolbarContainer sx={{ paddingY: '0.75rem' }}>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ marginLeft: 'auto' }} display="flex" gap={4}>
        <GridToolbarQuickFilter />
        <Button variant="contained" size="small">
          Add Company
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}

export default ToolBar;
