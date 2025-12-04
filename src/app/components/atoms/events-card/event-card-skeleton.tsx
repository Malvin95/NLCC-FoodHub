/**
 * EventCardSkeleton displays a loading placeholder for `EventCard`.
 * 
 * Features:
 * - Matches EventCard dimensions and layout for visual stability
 * - Animated pulse effect using Tailwind's `animate-pulse`
 * - Follows Next.js `loading.tsx` UI conventions
 * - Suitable for React Suspense boundaries
 * 
 * Accessibility:
 * - Uses `role="status"` with an `aria-label` describing the loading state
 * - Includes visually hidden text (`sr-only`) for screen readers
 * 
 * @component
 * @since 1.0.0
 * @returns {JSX.Element} Rendered skeleton loader.
 * @see EventCard for the card component that this skeleton represents.
 * 
 * @example
 * ```tsx
 * // With Suspense boundary
 * <Suspense fallback={<EventCardSkeleton />}>
 *   <AsyncEventCard />
 * </Suspense>
 * ```
 * 
 * @example
 * ```tsx
 * // In a loading.tsx file
 * export default function Loading() {
 *   return <EventCardSkeleton />;
 * }
 * ```
 */
export function EventCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading event details"
      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
    >
      {/* Title skeleton */}
      <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-3" />
      
      {/* Event details skeleton */}
      <div className="space-y-2">
        {/* Date/Time row */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
          <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
        
        {/* Location row */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
          <div className="w-36 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
        
        {/* Optional Volunteers/Elected Volunteer row */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
          <div className="w-44 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      
      <span className="sr-only">Loading event details...</span>
    </div>
  );
}
