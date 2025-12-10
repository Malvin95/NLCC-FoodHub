/**
 * FilterTabsSkeleton component displays a loading placeholder matching FilterTabs's layout
 * 
 * Features:
 * - Matches FilterTabs dimensions and structure exactly
 * - Renders five placeholder tab elements to match default tabs
 * - Animated pulse effect using Tailwind's animate-pulse utility
 * - Full dark mode support with theme-aware colors
 * - Follows Next.js loading UI conventions
 * - Can be used with React Suspense boundaries
 * - Accessible with proper ARIA status attributes and sr-only text
 * 
 * Styling:
 * - Matches FilterTabs container styling (border, border-radius, background)
 * - Dark mode colors aligned with FilterTabs theme
 * - Responsive and adapts to parent container
 * 
 * Accessibility:
 * - role="status" for proper status announcement
 * - aria-label describing the loading state
 * - sr-only text for additional context to screen readers
 * 
 * @component
 * @since 1.0.0
 * @returns {JSX.Element} The rendered skeleton loader
 * 
 * @example
 * ```tsx
 * // In a loading.tsx file
 * export default function Loading() {
 *   return <FilterTabsSkeleton />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With Suspense boundary
 * <Suspense fallback={<FilterTabsSkeleton />}>
 *   <AsyncFilterTabs />
 * </Suspense>
 * ```
 * 
 * @example
 * ```tsx
 * // Multiple skeletons in a layout
 * <div className="space-y-4">
 *   <FilterTabsSkeleton />
 *   <FilterTabsSkeleton />
 * </div>
 * ```
 * 
 * @see {@link FilterTabs} for the actual component
 */
export function FilterTabsSkeleton() {
  return (
    <div
      className="animate-pulse"
      role="status"
      aria-label="Loading filter tabs"
    >
      <div className="bg-secondary/10 dark:bg-secondary/20 p-1 rounded-md border border-secondary/30 dark:border-secondary/60 inline-flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-[calc(100%-2px)] px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-600 min-w-20"
          />
        ))}
      </div>
      <span className="sr-only">Loading filter tabs...</span>
    </div>
  );
}
