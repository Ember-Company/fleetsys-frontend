import React, { useMemo } from 'react';

interface TransformOptions<T> {
  data: T | undefined;
  include?: Partial<Record<keyof T, boolean>>;
  exclude?: Partial<Record<keyof T, boolean>>;
}

export function useTransformData<T>({ data = {} as T, include, exclude }: TransformOptions<T>): Partial<T> {
  return useMemo(() => {
    let result: Partial<T> = { ...data };

    if (include) {
      result = (Object.keys(include) as (keyof T)[]).reduce((acc, key) => {
        if (include[key]) {
          acc[key] = data[key] ?? ('' as any);
        }
        return acc;
      }, {} as Partial<T>);
    }

    if (exclude) {
      result = (Object.keys(result) as (keyof T)[]).reduce((acc, key) => {
        if (!exclude[key]) {
          acc[key] = result[key];
        }
        return acc;
      }, {} as Partial<T>);
    }

    return result;
  }, [data, include, exclude]);
}
