"use client";

import { ReactNode } from "react";
import { Column } from "./table.types";

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  striped: boolean;
  bordered: boolean;
  isIndex: boolean;
  actions?: (row: T) => ReactNode;
}

export function TableBody<T>({
  data,
  columns,
  striped,
  isIndex,
  bordered,
  actions,
}: Props<T>) {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (actions ? 1 : 0)}
            className="text-center py-6 text-base-content/70"
          >
            هیچ داده‌ای موجود نیست
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, i) => (
        <tr
          key={i}
          className={`${
            striped && i % 2 === 1 ? "bg-base-50" : ""
          } hover:bg-base-100 transition`}
        >
          {isIndex && (
            <td
              className={`px-4 py-3 text-center ${
                bordered ? "border border-base-300" : ""
              }`}
            >
              {i + 1}
            </td>
          )}

          {columns.map((col) => (
            <td
              key={String(col.key)}
              className={`px-4 py-3 text-center ${
                bordered ? "border border-base-300" : ""
              }`}
            >
              {col.render
                ? col.render(row[col.key], row)
                : (row[col.key] as ReactNode)}
            </td>
          ))}
          {actions && <td className="px-4 py-3 text-center">{actions(row)}</td>}
        </tr>
      ))}
    </tbody>
  );
}
