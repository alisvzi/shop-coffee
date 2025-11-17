"use client";

import { useMemo, useState } from "react";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { TableSearch } from "./TableSearch";
import { TableProps } from "./table.types";

export function Table<T extends object>({
  columns,
  data,
  striped = true,
  bordered = false,
  pagination = false,
  pageSize = 5,
  sortable = false,
  filterable = false,
  isIndex = false,
  actions,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState("");

  // فیلتر
  const filteredData = useMemo(() => {
    if (!filterable || !filterText) return data;
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  }, [data, filterable, filterText]);

  // مرتب‌سازی
  const sortedData = useMemo(() => {
    if (!sortable || !sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [filteredData, sortable, sortKey, sortOrder]);

  // صفحه‌بندی
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1;

  // مرتب‌سازی
  const handleSort = (col: Column<T>) => {
    if (!sortable || !col.sortable) return;
    if (sortKey === col.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full space-y-4">
      {filterable && (
        <TableSearch filterText={filterText} onChange={setFilterText} />
      )}

      <div className="overflow-x-auto rounded-lg shadow-sm border border-base-300">
        <table className="w-full text-left text-sm text-base-content">
          <TableHeader
            isIndex={isIndex}
            columns={columns}
            bordered={bordered}
            sortable={sortable}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
            hasActions={!!actions}
          />
          <TableBody
            isIndex={isIndex}
            data={paginatedData}
            columns={columns}
            striped={striped}
            bordered={bordered}
            actions={actions}
          />
        </table>
      </div>

      {pagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
