import { useEffect, useState } from 'react';

type ColumnVisibilityModel = Record<string, boolean>;

const defaultColumnModel = {
  city: false,
  subscription_type: false,
  contact_name: false,
  contact_phone: false,
  has_support_access: false,
} satisfies ColumnVisibilityModel;

export const useColumnVisibility = (
  key: string = 'columnVisibilityModel'
): {
  columnVisibilityModel: ColumnVisibilityModel;
  handleColumnVisibilityChange: (newModel: ColumnVisibilityModel) => void;
} => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<ColumnVisibilityModel>(defaultColumnModel);

  useEffect(() => {
    const savedVisibilityModel = sessionStorage.getItem(key);
    if (savedVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedVisibilityModel));
    }
  }, []);

  const handleColumnVisibilityChange = (newModel: ColumnVisibilityModel) => {
    setColumnVisibilityModel(newModel);
    sessionStorage.setItem(key, JSON.stringify(newModel));
  };

  return {
    columnVisibilityModel,
    handleColumnVisibilityChange,
  };
};
