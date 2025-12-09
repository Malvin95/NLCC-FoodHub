import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, waitFor } from 'storybook/test';
import { TrendChart } from './trend-chart';
import { TrendChartSkeleton } from './trend-chart-skeleton';
import { mockChartData } from './mock-chart-data';

const meta: Meta<typeof TrendChart> = {
  title: 'Atoms/TrendChart',
  component: TrendChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile line chart component displaying data trends over time using Recharts. Can be used for any two-series comparison (attendance, donations, engagement, etc.) with interactive tooltips and legend. Features full dark mode support with theme-aware colors, shadows, and smooth transitions.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TrendChart>;
type SkeletonStory = StoryObj<typeof TrendChartSkeleton>;

const data = mockChartData;

/**
 * Default chart displaying trends for the last 6 months
 */
export const Default: Story = {
  render: () => <TrendChart data={data}/>
};

export const CustomLabelsTest: Story = { 
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <div className="flex-1 min-w-[320px]">
        <TrendChart 
          chartTitle="Custom Title Test" 
          firstLineName="Volunteers" 
          secondLineName="Clients"
          data={[
            { month: 'Jan', Volunteers: 30, Clients: 50 },
            { month: 'Feb', Volunteers: 45, Clients: 60 },
            { month: 'Mar', Volunteers: 40, Clients: 70 },
            { month: 'Apr', Volunteers: 60, Clients: 80 },
            { month: 'May', Volunteers: 55, Clients: 90 },
            { month: 'Jun', Volunteers: 70, Clients: 100 }
          ]}
        /> 
      </div>
    </div>
  ), 
  play: async ({ canvasElement }) => { 
    const canvas = within(canvasElement);
    // Wait for Recharts animation to complete (typically 400-500ms)
    waitFor(() => {
      // Check for line paths (Recharts renders lines as path elements)
      const linePaths = canvasElement.querySelectorAll('.recharts-line');
      expect(linePaths.length).toBe(2); // Series A and Series B Trends

      expect(canvas.getByText('Custom Title Test')).toBeInTheDocument(); 
      // Check for legend items or use queryByText with exact: false if labels are rendered
      expect(canvas.queryByText(/Volunteers/i)).toBeInTheDocument();
      expect(canvas.queryByText(/Clients/i)).toBeInTheDocument();
    });
  }
};

/**
 * Chart structure and content test
 */
export const ChartStructureTest: Story = {
  render: () => <TrendChart data={mockChartData} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check title exists
    const title = canvas.getByText(/Trends/i);
    await expect(title).toBeInTheDocument();
    
    // Check container has proper styling
    const container = canvasElement.querySelector('.bg-white.rounded-lg');
    await expect(container).toBeInTheDocument();
  }
};

/**
 * Verify chart renders with data
 */
export const ChartRendersData: Story = {
  render: () => <TrendChart data={mockChartData} />,
  play: async ({ canvasElement }) => {
    // Wait for Recharts animation to complete (typically 400-500ms)
    await waitFor(() => {
      // Check for line paths (Recharts renders lines as path elements)
      const linePaths = canvasElement.querySelectorAll('.recharts-line');
      expect(linePaths.length).toBe(2); // Series A and Series B Trends
      
      // Check that SVG elements exist (Recharts renders as SVG)
      const svgElements = canvasElement.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  }
};

/**
 * Verify legend is present
 */
export const LegendTest: Story = {
  render: () => <TrendChart data={mockChartData} />,
  play: async ({ canvasElement }) => {
    // Wait for Recharts animation to complete (typically 400-500ms)
    await waitFor(() => {
      // Check for line paths (Recharts renders lines as path elements)
      const linePaths = canvasElement.querySelectorAll('.recharts-line');
      expect(linePaths.length).toBe(2); // Series A and Series B Trends
    });

    const canvas = within(canvasElement);

    // Check legend items exist
    await waitFor(() => {
      expect(canvas.queryByText(/Series A/i)).toBeInTheDocument();
      expect(canvas.queryByText(/Series B/i)).toBeInTheDocument();
    });
  }
};

/**
 * Verify axes are rendered
 */
export const AxesTest: Story = {
  render: () => <TrendChart data={mockChartData} />,
  play: async ({ canvasElement }) => {
    waitFor(() => {
      // Check for X-axis (months should be visible)
      const xAxisElements = canvasElement.querySelectorAll('.recharts-xAxis');  
      expect(xAxisElements.length).toBeGreaterThan(0);

      // Check for Y-axis
      const yAxisElements = canvasElement.querySelectorAll('.recharts-yAxis');
      expect(yAxisElements.length).toBeGreaterThan(0);
    });
  }
};

/**
 * Verify responsive container
 */
export const ResponsiveTest: Story = {
  render: () => <TrendChart data={mockChartData} />,
  play: async ({ canvasElement }) => {
    const responsiveContainer = canvasElement.querySelector('.recharts-responsive-container');
    await expect(responsiveContainer).toBeInTheDocument();
  }
};

// Skeleton Loading States

/**
 * Loading skeleton matching the chart layout
 */
export const LoadingSkeleton: SkeletonStory = {
  render: () => <TrendChartSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton that matches the TrendChart layout with animated pulse effects.'
      }
    }
  }
};

/**
 * Verify skeleton structure and accessibility
 */
export const SkeletonStructureTest: SkeletonStory = {
  render: () => <TrendChartSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check role and aria-label
    const container = canvas.getByRole('status');
    await expect(container).toHaveAttribute('aria-label', 'Loading chart data');
    
    // Check skeleton elements exist
    const pulsingElements = canvasElement.querySelectorAll('.animate-pulse');
    await expect(pulsingElements.length).toBeGreaterThan(0);
    
    // Check for screen reader text
    const srText = canvas.getByText('Loading chart data...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');
  }
};

/**
 * Verify skeleton has title placeholder
 */
export const SkeletonTitleTest: SkeletonStory = {
  render: () => <TrendChartSkeleton />,
  play: async ({ canvasElement }) => {
    // Check title skeleton exists
    const titleSkeleton = canvasElement.querySelector('.w-64.h-6.bg-gray-200');
    await expect(titleSkeleton).toBeInTheDocument();
    await expect(titleSkeleton?.className).toContain('animate-pulse');
  }
};

/**
 * Verify skeleton has legend placeholders
 */
export const SkeletonLegendTest: SkeletonStory = {
  render: () => <TrendChartSkeleton />,
  play: async ({ canvasElement }) => {
    // Check legend skeleton items
    const legendContainer = canvasElement.querySelector('.flex.justify-center.gap-6');
    await expect(legendContainer).toBeInTheDocument();
    
    // Should have legend item placeholders
    const legendItems = legendContainer?.querySelectorAll('.flex.items-center.gap-2');
    await expect(legendItems?.length).toBe(2);
  }
};

/**
 * Comparison view showing chart and skeleton side by side
 */
export const ChartVsSkeleton: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <div className="flex-1 min-w-[320px]">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Loaded State</h3>
        <TrendChart data={mockChartData} />
      </div>
      <div className="flex-1 min-w-[320px]">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Loading State</h3>
        <TrendChartSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of the loaded chart and its loading skeleton.'
      }
    }
  }
};
