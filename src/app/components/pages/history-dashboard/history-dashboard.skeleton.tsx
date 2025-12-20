import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";

/**
 * Loading skeleton for the History Dashboard component.
 *
 * Provides a visual placeholder while historical data is being loaded,
 * mimicking the layout of the actual dashboard with shimmer/pulse effects.
 */

export function HistoryDashboardSkeleton() {
  return (
    <DashboardPageTemplate
      title="History Dashboard"
      description="View historical data and logs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 animate-pulse">
        <div className="col-span-1 lg:col-span-2 space-y-3">
          <div className="w-full h-full rounded-md border border-border bg-card p-3 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:shadow-md [--cell-size:auto] pt-10">
            <div className="space-y-3">
              <div className="h-7 w-32 rounded bg-muted" />
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 rounded bg-muted"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2" aria-hidden="true">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="h-4 w-24 rounded bg-muted" />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border dark:border-slate-800 dark:bg-slate-950 p-6 col-span-1 lg:col-span-1 dark:shadow-md">
          <div className="space-y-4">
            <div className="h-5 w-40 rounded bg-muted" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-5 w-12 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPageTemplate>
  );
}
