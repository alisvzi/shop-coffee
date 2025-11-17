"use client";

interface DashboardStatBoxProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export default function DashboardStatBox({
  title,
  value,
  icon,
  description,
  className = "",
}: DashboardStatBoxProps) {
  return (
    <div
      className={`flex bg-base-200/60 items-center gap-5 rounded-xl p-6 shadow-lg transition-shadow hover:shadow-xl ${className} w-full md:w-[300px]`}
    >
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white text-3xl shadow-md">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-base-content/70 ">
          {title}
        </h3>
        <p className="mt-1 text-4xl font-extrabold text-gray-900 ">{value}</p>
        {description && (
          <p className="mt-2 text-sm text-base-content/60 whitespace-nowrap">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
