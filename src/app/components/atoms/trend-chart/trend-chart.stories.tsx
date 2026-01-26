import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, waitFor } from "storybook/test";
import { TrendChart } from "./trend-chart";
import { TrendChartSkeleton } from "./trend-chart-skeleton";
import { mockChartData } from "./mock-chart-data";

const meta: Meta<typeof TrendChart> = {
  title: "Atoms/TrendChart",
  component: TrendChart,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile line chart component displaying data trends over time using Recharts. Can be used for any two-series comparison (attendance, donations, engagement, etc.) with interactive tooltips and legend. Features full dark mode support with theme-aware colors, shadows, and smooth transitions.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TrendChart>;
type SkeletonStory = StoryObj<typeof TrendChartSkeleton>;

const data = mockChartData;

/**
 * Default chart displaying trends for the last 6 months
 */
export const Default: Story = {
  render: () => <TrendChart data={data} />,
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
            { month: "Jan", Volunteers: 30, Clients: 50 },
            { month: "Feb", Volunteers: 45, Clients: 60 },
            { month: "Mar", Volunteers: 40, Clients: 70 },
            { month: "Apr", Volunteers: 60, Clients: 80 },
            { month: "May", Volunteers: 55, Clients: 90 },
            { month: "Jun", Volunteers: 70, Clients: 100 },
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
      const linePaths = canvasElement.querySelectorAll(".recharts-line");
      expect(linePaths.length).toBe(2); // Series A and Series B Trends

      expect(canvas.getByText("Custom Title Test")).toBeInTheDocument();
      // Check for legend items or use queryByText with exact: false if labels are rendered
      expect(canvas.queryByText(/Volunteers/i)).toBeInTheDocument();
      expect(canvas.queryByText(/Clients/i)).toBeInTheDocument();
    });
  },
};

/**
 * Chart structure and content test
 */

/**
 * Chart structure, data, and rendering test
 */
export const RenderTest: Story = {
  render: () => <TrendChart data={mockChartData} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Container and title
    const title = canvas.getByText(/Trends/i);
    await expect(title).toBeInTheDocument();
    const container = canvasElement.querySelector(".bg-card.rounded-lg");
    await expect(container).toBeInTheDocument();

    // Chart renders with data
    await waitFor(() => {
      const linePaths = canvasElement.querySelectorAll(".recharts-line");
      expect(linePaths.length).toBe(2);
      const svgElements = canvasElement.querySelectorAll("svg");
      expect(svgElements.length).toBeGreaterThan(0);

      // Legend items exist
      expect(canvas.queryByText(/Series A/i)).toBeInTheDocument();
      expect(canvas.queryByText(/Series B/i)).toBeInTheDocument();

      // Axes rendered
      const xAxisElements = canvasElement.querySelectorAll(".recharts-xAxis");
      expect(xAxisElements.length).toBeGreaterThan(0);
      const yAxisElements = canvasElement.querySelectorAll(".recharts-yAxis");
      expect(yAxisElements.length).toBeGreaterThan(0);
    });

    // Responsive container
    const responsiveContainer = canvasElement.querySelector(
      ".recharts-responsive-container",
    );
    await expect(responsiveContainer).toBeInTheDocument();
  },
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
        story:
          "Loading skeleton that matches the TrendChart layout with animated pulse effects.",
      },
    },
  },
};

/**
 * Verify skeleton structure and accessibility
 */
export const SkeletonTest: SkeletonStory = {
  render: () => <TrendChartSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check role and accessibility
    const container = canvas.getByRole("status");
    await expect(container).toHaveAttribute("aria-label", "Loading chart data");
    const srText = canvas.getByText("Loading chart data...");
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain("sr-only");

    // Check skeleton elements with animations
    const pulsingElements = canvasElement.querySelectorAll(".animate-pulse");
    await expect(pulsingElements.length).toBeGreaterThan(0);

    // Title and legend placeholders
    const titleSkeleton = canvasElement.querySelector(".w-64.h-6.bg-gray-200");
    await expect(titleSkeleton).toBeInTheDocument();

    const legendContainer = canvasElement.querySelector(
      ".flex.justify-center.gap-6",
    );
    await expect(legendContainer).toBeInTheDocument();
    const legendItems = legendContainer?.querySelectorAll(
      ".flex.items-center.gap-2",
    );
    await expect(legendItems?.length).toBe(2);
  },
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
        <h3 className="text-sm font-medium mb-2 text-gray-700">
          Loading State
        </h3>
        <TrendChartSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Side-by-side comparison of the loaded chart and its loading skeleton.",
      },
    },
  },
};
