'use client';

import React, { useCallback, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, type GridSlots } from '@mui/x-data-grid';

import { type Company } from '@/types/company';
import { logger } from '@/lib/default-logger';
import { useGetCompanies } from '@/hooks/queries';
import { useActionFields, useColumnVisibility } from '@/hooks/tables';
import { ToolBar } from '@/components/shared/datagrid/tool-bar';
import Modal from '@/components/shared/modal';

// import ToolBar from '@/components/shared/datagrid/tool-bar';

import { getCompaniesTableFields } from './company-columns';
import CreateCompanyForm from './forms/create';

export default function CompanyList(): React.JSX.Element {
  const { data, isLoading } = useGetCompanies();
  const { columnVisibilityModel, handleColumnVisibilityChange } = useColumnVisibility('company-column-model-key', {
    city: false,
    subscription_type: false,
    contact_name: false,
    contact_phone: false,
    has_support_access: false,
  });

  useEffect(() => {
    logger.debug(data);
  }, [data]);

  return (
    <Stack direction="column" width="100%" rowGap={3}>
      <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Registered Clients</Typography>
        </Box>
        <Box>
          <Modal
            buttonTitle="Add Client"
            buttonProps={{
              size: 'large',
            }}
            Content={<CreateCompanyForm />}
            modalLabel="Register Client"
            size="large"
          />
        </Box>
      </Stack>
      <DataGrid
        columns={[...getCompaniesTableFields()]}
        rows={data}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25, 50]}
        autoHeight
        // disableColumnFilter
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
        slotProps={{
          toolbar: {
            title: 'Company',
          },
        }}
        slots={{
          toolbar: ToolBar as GridSlots['toolbar'],
        }}
      />
    </Stack>
  );
}
