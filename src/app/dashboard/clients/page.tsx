import React, { Suspense } from 'react';

import CompanyList from '@/components/dashboard/companies';

export default function ClientsPage(): React.JSX.Element {
  return (
    <div className="">
      <Suspense fallback={<div>Loading</div>}>
        <CompanyList />
      </Suspense>
    </div>
  );
}
