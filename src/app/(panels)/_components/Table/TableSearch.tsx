"use client";

interface Props {
  filterText: string;
  onChange: (value: string) => void;
}

export function TableSearch({ filterText, onChange }: Props) {
  return (
    <div className="mb-3">
      <input
        type="text"
        placeholder="جستجو..."
        value={filterText}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-1/3 px-3 py-2 border rounded-md text-sm dark:bg-gray-900 dark:border-gray-700"
      />
    </div>
  );
}
