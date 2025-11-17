import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  striped?: boolean;
  bordered?: boolean;

  pagination?: boolean;
  pageSize?: number;

  sortable?: boolean;

  filterable?: boolean;
  isIndex?: boolean;

  actions?: (row: T) => ReactNode;
}
