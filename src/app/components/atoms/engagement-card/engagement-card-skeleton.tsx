/**
 * EngagementCardSkeleton component for loading states
 * 
 * Displays a pulsing placeholder that mirrors the EngagementCard layout exactly.
 * Used with Suspense boundaries or as a fallback while loading engagement data.
 * 
 * Features:
 * - Matches EngagementCard structure and dimensions
 * - Tailwind animate-pulse for smooth loading effect
 * - Dark mode support
 * - No props required, purely presentational
 * 
 * @component
 * @file engagement-card-skeleton.tsx
 * 
 * @example
 * ```tsx
 * import { Suspense } from 'react';
 * 
 * <Suspense fallback={<EngagementCardSkeleton />}>
 *   <AsyncEngagementCard />
 * </Suspense>
 * ```
 */

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card/card";

export default function EngagementCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse" />
          <div className="h-4 w-24 rounded bg-gray-300 dark:bg-slate-700 animate-pulse" />
        </div>
        <div className="px-3 py-2 rounded-full border border-gray-200 dark:border-slate-700 h-6 w-20 bg-gray-200 dark:bg-slate-800 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-5 w-48 bg-gray-300 dark:bg-slate-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded mb-2 animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
      </CardContent>
      <CardFooter>
        <div 
          className="h-full w-full flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800"
          role="status"
          aria-label="Loading engagement card"
        >
          <div className="flex items-center gap-4">
            <div className="h-4 w-40 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-4 w-28 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>
      </CardFooter>
      <span className="sr-only">Loading engagement content...</span>
    </Card>
  );
}