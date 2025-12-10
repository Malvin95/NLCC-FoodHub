/**
 * Loading skeleton component that mirrors the layout of `DashboardPageTemplate`.
 * 
 * Features:
 * - Animated pulsing effect using Tailwind's `animate-pulse`
 * - Matches exact spacing and layout of the real template
 * - Placeholder blocks for title, description, and configurable content sections
 * - Responsive container matching template constraints
 * - Full dark mode support with theme-aware colors
 * - Smooth color transitions when switching themes
 * 
 * Usage:
 * Display this component while dashboard data is being fetched to provide
 * visual feedback and reduce perceived loading time. The `contentBlocks` prop
 * allows you to show the expected number of content sections.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.contentBlocks=2] - Number of content section placeholders to display
 * 
 * @example
 * ```tsx
 * // Default with 2 content blocks
 * {isLoading && <DashboardPageTemplateSkeleton />}
 * ```
 * 
 * @example
 * ```tsx
 * // Custom content blocks matching expected sections
 * {isLoading ? (
 *   <DashboardPageTemplateSkeleton contentBlocks={3} />
 * ) : (
 *   <DashboardPageTemplate title="Dashboard" description="Overview">
 *     <Section1 />
 *     <Section2 />
 *     <Section3 />
 *   </DashboardPageTemplate>
 * )}
 * ```
 * 
 * @see {@link DashboardPageTemplate} for the actual template component
 */
export default function DashboardPageTemplateSkeleton({ contentBlocks = 2 }: { contentBlocks?: number }) {
  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse transition-colors"
      role="status"
      aria-label="Loading dashboard page"
    >
      {/* Title skeleton */}
      <div className="h-8 w-64 bg-gray-200 dark:bg-slate-700 rounded mb-6" />
      
      {/* Description skeleton */}
      <div className="h-4 w-96 bg-gray-200 dark:bg-slate-700 rounded mb-8" />
      
      {/* Content blocks */}
      <div className="space-y-8">
        {Array.from({ length: contentBlocks }).map((_, idx) => (
          <div key={idx} className="bg-gray-100 dark:bg-slate-900 rounded-lg p-6 h-64">
            <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
        ))}
      </div>
      
      <span className="sr-only">Loading dashboard page...</span>
    </div>
  );
}
