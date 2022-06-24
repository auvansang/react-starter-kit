import { ReactNode } from 'react';

export type ColDef<TDataItem> = {
  name: keyof TDataItem;
  header: ReactNode;
  visible?: boolean;

  width?: number;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
};
