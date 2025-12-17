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
          <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        </div>
        <div className="px-3 py-2 rounded-full border border-border h-6 w-20 bg-muted animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-5 w-48 bg-muted rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-muted rounded mb-2 animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      </CardContent>
      <CardFooter 
        className="h-full w-full flex items-center justify-between pt-4 border-t border-border"
        role="status"
        aria-label="Loading engagement card">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="h-4 w-40 bg-muted rounded animate-pulse" />
            <div className="h-4 w-24 bg-muted rounded animate-pulse mr-auto sm:mr-0" />
          </div>
          <div className="h-4 w-28 bg-muted rounded animate-pulse" />
      </CardFooter>
      <span className="sr-only">Loading engagement content...</span>
    </Card>
  );
}