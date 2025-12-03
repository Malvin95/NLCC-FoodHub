# TrendChart

A reusable two-series line chart built with Recharts. Suitable for visualizing any paired time-series (attendance, donations, engagement, etc.). Includes a matching `TrendChartSkeleton` for loading states.

## Components

- `TrendChart` — renders the chart
- `TrendChartSkeleton` — loading placeholder matching the chart layout

## Props

- `chartTitle?: string` — title displayed above the chart (default: "Trends (Last 6 Months)")
- `firstLineName?: string` — label for the first series (default: "Series A"). Must match a key in your data.
- `secondLineName?: string` — label for the second series (default: "Series B"). Must match a key in your data.
- `data?: Array<{month: string; [key: string]: string | number}>` — custom data array (default: mockChartData)

## Usage

```tsx
import { TrendChart } from './trend-chart';

export default function DashboardSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <TrendChart
        chartTitle="Monthly Attendance Trends"
        firstLineName="Active Volunteers"
        secondLineName="Served Clients"
      />
    </div>
  );
}
```

### With Suspense (Next.js App Router)

```tsx
import { Suspense } from 'react';
import { TrendChart } from './trend-chart';
import { TrendChartSkeleton } from './trend-chart-skeleton';

export default function Section() {
  return (
    <Suspense fallback={<TrendChartSkeleton />}>
      <TrendChart chartTitle="Donation Trends (Last 6 Months)" />
    </Suspense>
  );
}
```

## Storybook

Stories are available under `Atoms/TrendChart`:
- Default chart
- Structure and data rendering tests
- Skeleton accessibility and layout tests

Run Storybook:

```bash
npm run storybook
```

## Notes

- **Data Key Matching**: The keys in your data object must **exactly match** the `firstLineName` and `secondLineName` prop values. For example, if you pass `firstLineName="Active Volunteers"`, your data must have an `'Active Volunteers'` key.
- The internal demo data (`mockChartData`) uses `'Series A'` and `'Series B'` as keys to match the default prop values.
- For production, fetch and map your data shape to `{ month: string; [seriesKeys...]: number }`.
- Keep the chart inside a container that controls height/width; `ResponsiveContainer` will adapt to the parent.
