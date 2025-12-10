/**
 * FilterBarSkeleton component displays a loading placeholder matching FilterBar's button-group layout
 * 
 * Features:
 * - Matches FilterBar dimensions and horizontal button layout
 * - Renders five placeholder pill buttons to match default filters
 * - Animated pulse effect using Tailwind's animate-pulse utility
 * - Full dark mode support with theme-aware colors
 * - Follows Next.js loading UI conventions
 * - Can be used with React Suspense boundaries
 * - Accessible with proper ARIA status attributes and sr-only text
 * 
 * Styling:
 * - Matches FilterBar container styling (gap, rounded pills, secondary palette)
 * - Dark mode colors aligned with FilterBar theme
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
 *   return <FilterBarSkeleton />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With Suspense boundary
 * <Suspense fallback={<FilterBarSkeleton />}>
 *   <AsyncFilterBar />
 * </Suspense>
 * ```
 * 
 * @example
 * ```tsx
 * // Multiple skeletons in a layout
 * <div className="space-y-4">
 *   <FilterBarSkeleton />
 *   <FilterBarSkeleton />
 * </div>
 * ```
 * 
 * @see {@link FilterBar} for the actual component
 */
export function FilterBarSkeleton() {
  return (
    <div
      className="animate-pulse"
      role="status"
      aria-label="Loading filter bar"
    >
      <div className="flex flex-wrap gap-2 mb-6" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 px-4 rounded-md bg-secondary/10 dark:bg-secondary/20 border border-secondary/30 dark:border-secondary/60 min-w-24"
          />
        ))}
      </div>
      <span className="sr-only">Loading filter bar...</span>
    </div>
  );
}
