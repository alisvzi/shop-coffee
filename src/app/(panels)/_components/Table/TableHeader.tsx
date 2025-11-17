"use client";

import { Column } from "./table.types";

interface Props<T> {
  columns: Column<T>[];
  bordered: boolean;
  sortable: boolean;
  isIndex: boolean;
  sortKey: keyof T | null;
  sortOrder: "asc" | "desc";
  onSort: (col: Column<T>) => void;
  hasActions: boolean;
}

export function TableHeader<T>({
  columns,
  bordered,
  sortable,
  sortKey,
  sortOrder,
  isIndex,
  onSort,
  hasActions,
}: Props<T>) {
  return (
    <thead className="bg-base-100 text-base-content text-sm font-medium">
      <tr>
        {isIndex && (
          <th
            className={`px-4 text-center py-3 ${
              bordered ? "border border-base-300" : ""
            }`}
          >
            شناسه
          </th>
        )}

        {columns.map((col) => (
          <th
            key={String(col.key)}
            className={`px-4 text-center py-3 ${
              col.sortable && sortable ? "cursor-pointer select-none" : ""
            } ${bordered ? "border border-base-300" : ""}`}
            onClick={() => onSort(col)}
          >
            {col.header}
            {sortable && col.sortable && sortKey === col.key && (
              <span className="ml-1">{sortOrder === "asc" ? "▲" : "▼"}</span>
            )}
          </th>
        ))}
        {hasActions && <th className="px-4 py-3 text-center">عملیات</th>}
      </tr>
    </thead>
  );
}
