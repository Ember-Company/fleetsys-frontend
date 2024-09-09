import { useEffect, useState } from 'react';

type ColumnVisibilityModel = Record<string, boolean>;

export const useColumnVisibility = (
  key: string = 'columnVisibilityModel',
  initialState?: ColumnVisibilityModel
): {
  columnVisibilityModel: ColumnVisibilityModel;
  handleColumnVisibilityChange: (newModel: ColumnVisibilityModel) => void;
} => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<ColumnVisibilityModel>(initialState ?? {});

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
