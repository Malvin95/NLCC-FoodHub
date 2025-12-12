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
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-4 w-24 rounded bg-gray-300 animate-pulse" />
        </div>
        <span className="px-3 py-2 rounded-full border h-6 w-20 bg-gray-200 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-5 w-48 bg-gray-300 rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-4 w-full">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="ml-auto h-4 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  );
}