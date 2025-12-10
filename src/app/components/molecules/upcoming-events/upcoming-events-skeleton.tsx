import { EventCardSkeleton } from "../../atoms/events-card/event-card-skeleton";

/**
 * UpcomingEventsSkeleton displays a loading placeholder for `UpcomingEvents`.
 * 
 * Features:
 * - Matches UpcomingEvents container styling (dark mode compatible)
 * - Displays 5 EventCardSkeleton placeholders (matching default event count)
 * - Animated pulse effect for visual feedback
 * - Follows Next.js `loading.tsx` UI conventions
 * - Suitable for React Suspense boundaries
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 * 
 * Accessibility:
 * - Uses `role="status"` with `aria-label` describing the loading state
 * - Includes visually hidden text (`sr-only`) for screen readers
 * - Proper semantic structure maintained during loading
 * - Live region attributes (`aria-live="polite"`) for status updates
 * 
 * @component
 * @since 1.0.0
 * @returns {JSX.Element} Rendered skeleton loader.
 * @see UpcomingEvents for the component that this skeleton represents.
 * @see EventCardSkeleton for individual event card skeleton.
 * 
 * @example
 * ```tsx
 * // With Suspense boundary
 * <Suspense fallback={<UpcomingEventsSkeleton />}>
 *   <AsyncUpcomingEvents />
 * </Suspense>
 * ```
 * 
 * @example
 * ```tsx
 * // In a loading.tsx file
 * export default function Loading() {
 *   return <UpcomingEventsSkeleton />;
 * }
 * ```
 */
export function UpcomingEventsSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading upcoming events"
      className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Heading skeleton */}
      <div className="w-40 h-7 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-6" />
      
      {/* Event list skeleton */}
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="list-none" aria-hidden="true">
            <EventCardSkeleton />
          </li>
        ))}
      </ul>
      
      <span className="sr-only">Loading upcoming events...</span>
    </section>
  );
}
