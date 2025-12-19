"use client";

interface SidebarSkeletonProps {
  isCollapsed?: boolean;
  items?: number;
}

export function SidebarSkeleton({
  isCollapsed = false,
  items = 6,
}: SidebarSkeletonProps) {
  return (
    <>
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-lg
            ${isCollapsed ? "lg:justify-center" : ""}
          `}
        >
          <div className="w-5 h-5 bg-gray-200 dark:bg-slate-700 rounded animate-pulse shrink-0" />
          <div
            className={`
              h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse flex-1
              ${isCollapsed ? "lg:hidden" : ""}
            `}
          />
        </div>
      ))}
    </>
  );
}
