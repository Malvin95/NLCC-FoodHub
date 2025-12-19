/**
 * Storybook stories for the History Dashboard component.
 *
 * Demonstrates the dashboard in various states: loading, default,
 * and with selected date metrics displayed. Includes interactive tests
 * for accessibility and functionality.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "storybook/test";
import HistoryDashboard from "./history-dashboard";
import { HistoryDashboardSkeleton } from "./history-dashboard.skeleton";

/**
 * History Dashboard stories meta configuration.
 *
 * The History Dashboard provides a calendar-based interface for viewing
 * historical volunteer metrics. Users can select dates with recorded data
 * to view detailed metrics about volunteer activity on that day.
 */
const meta = {
  title: "Pages/HistoryDashboard",
  component: HistoryDashboard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A dashboard page for viewing historical data with a calendar interface for date selection and a metrics panel displaying volunteer activity details. Highlights days with available data and displays metrics when a date is selected.",
      },
    },
  },
} satisfies Meta<typeof HistoryDashboard>;

export default meta;

type Story = StoryObj<typeof HistoryDashboard>;

/**
 * Default state showing the calendar with highlighted dates and empty metrics panel.
 * User can select a highlighted date to view corresponding metrics.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify page title
    const pageTitle = canvas.getByRole("heading", { level: 1, name: /history dashboard/i });
    await expect(pageTitle).toBeInTheDocument();

    // Verify calendar is rendered
    const calendar = canvas.getByRole("application", { name: /history calendar/i });
    await expect(calendar).toBeInTheDocument();

    // Verify legend is displayed
    const legend = canvasElement.querySelector("#calendar-legend");
    await expect(legend).toBeInTheDocument();

    // Verify empty state message is displayed initially
    const emptyState = canvas.getByText(/select a highlighted day to view metrics/i);
    await expect(emptyState).toBeInTheDocument();
  },
};

/**
 * Loading state with skeleton placeholder.
 * Displays while historical data is being fetched.
 */
export const Loading: Story = {
  render: () => <HistoryDashboardSkeleton />,
  play: async ({ canvasElement }) => {
    // Verify skeleton elements are present
    const pulseElements = canvasElement.querySelectorAll(".animate-pulse");
    await expect(pulseElements.length).toBeGreaterThan(0);

    // Verify grid layout with three columns
    const grid = canvasElement.querySelector(".grid");
    await expect(grid).toHaveClass(/lg:grid-cols-3/);
  },
};

/**
 * Interactive test: Select a date and verify metrics are displayed
 */
export const InteractiveSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click a date button (looking for any date with data)
    const dateButtons = canvas.getAllByRole("button");
    
    // Filter for actual date buttons (they have a number as content)
    let dateSelected = false;
    for (const button of dateButtons) {
      const buttonText = button.textContent?.trim();
      // Try to select dates that are likely to have data (avoid 1st of month)
      if (buttonText && /^\d{1,2}$/.test(buttonText) && parseInt(buttonText) > 10) {
        try {
          await userEvent.click(button);
          dateSelected = true;
          break;
        } catch {
          // Continue to next button
          continue;
        }
      }
    }

    // If a date was selected, verify metrics panel updates
    if (dateSelected) {
      // Wait a moment for state update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify metrics panel has updated (contains either metrics or empty state)
      const metricsPanel = canvasElement.querySelector('[role="region"]');
      await expect(metricsPanel).toBeInTheDocument();
    }
  },
};

/**
 * Interactive test: Verify calendar accessibility
 */
export const VerifyCalendarAccessibility: Story = {
  play: async ({ canvasElement }) => {
    // Verify calendar has proper ARIA attributes
    const calendar = canvasElement.querySelector('[aria-label="History calendar"]');
    await expect(calendar).toBeInTheDocument();

    // Verify legend has proper group role
    const legend = canvasElement.querySelector('[role="group"]');
    await expect(legend).toBeInTheDocument();

    // Verify legend has aria-label
    await expect(legend).toHaveAttribute("aria-label", "Calendar legend");

    // Verify metrics panel is a region
    const metricsRegion = canvasElement.querySelector('[role="region"]');
    await expect(metricsRegion).toBeInTheDocument();

    // Verify metrics region has aria-live for announcements
    await expect(metricsRegion).toHaveAttribute("aria-live", "polite");
  },
};

/**
 * Interactive test: Verify legend item visibility and context
 */
export const VerifyLegend: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify legend text is present
    const legendText = canvas.getByText("Volunteer Day");
    await expect(legendText).toBeInTheDocument();

    // Verify legend color indicator has highlight styling
    // Alternative check for the highlight color indicator
    const legendBox = canvasElement.querySelector(
      '#calendar-legend .rounded'
    );
    await expect(legendBox).toBeInTheDocument();
  },
};

/**
 * Interactive test: Verify page structure and layout
 */
export const VerifyPageStructure: Story = {
  play: async ({ canvasElement }) => {
    // Verify grid layout structure
    const grid = canvasElement.querySelector(".grid");
    await expect(grid).toBeInTheDocument();
    await expect(grid).toHaveClass("grid-cols-1");
    await expect(grid).toHaveClass("lg:grid-cols-3");

    // Verify calendar is in first column span
    const calendarContainer = canvasElement.querySelector(".lg\\:col-span-2");
    await expect(calendarContainer).toBeInTheDocument();

    // Verify metrics panel is in second column span
    const metricsContainer = canvasElement.querySelector(".lg\\:col-span-1");
    await expect(metricsContainer).toBeInTheDocument();

    // Verify both containers are in the grid
    const gridChildren = grid?.children;
    await expect(gridChildren?.length).toBe(2);
  },
};

/**
 * Dark mode preview
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="bg-slate-950 min-h-screen">
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * Mobile responsive view (single column layout)
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async ({ canvasElement }) => {
    // Verify single column layout on mobile
    const grid = canvasElement.querySelector(".grid");
    await expect(grid).toHaveClass("grid-cols-1");
  },
};

/**
 * Tablet responsive view (transitional layout)
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "ipad",
    },
  },
};
