/**
 * Loading skeleton component that mirrors the layout of `InventoryStatusCard`.
 *
 * Features:
 * - Animated pulsing effect using Tailwind's `animate-pulse`
 * - Matches exact spacing and dimensions of the real card
 * - Placeholder blocks for category name, status pill, quantities, progress bar, and percentage
 * - Subtle gray background matching loading state conventions
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 *
 * Usage:
 * Display this component while inventory data is being fetched to provide
 * visual feedback and reduce perceived loading time.
 *
 * @component
 *
 * @example
 * ```tsx
 * // Show skeleton while loading
 * {isLoading ? (
 *   <InventoryStatusCardSkeleton />
 * ) : (
 *   <InventoryStatusCard item={inventoryItem} />
 * )}
 * ```
 *
 * @see {@link InventoryStatusCard} for the actual card component
 */
export default function InventoryStatusCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading inventory item status"
      className="p-4 rounded-lg border border-border dark:border-slate-800 bg-card dark:bg-slate-950 shadow-sm dark:shadow-md animate-pulse transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2" />
      </div>
      <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
      <span className="sr-only">Loading inventory item status...</span>
    </div>
  );
}
