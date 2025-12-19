/**
 * Storybook stories for the History Dashboard component.
 *
 * Demonstrates the dashboard in various states: loading, default,
 * and with selected date metrics displayed.
 */

import type { Meta, StoryObj } from "@storybook/react";
import HistoryDashboard from "./history-dashboard";
import { HistoryDashboardSkeleton } from "./history-dashboard.skeleton";

/**
 * History Dashboard stories meta configuration.
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
          "A dashboard page for viewing historical data with a calendar interface for date selection and a metrics panel displaying volunteer activity details.",
      },
    },
  },
} satisfies Meta<typeof HistoryDashboard>;

export default meta;

type Story = StoryObj<typeof HistoryDashboard>;

/**
 * Default state showing the calendar and empty metrics panel.
 * User can select a date to view corresponding metrics.
 */
export const Default: Story = {};

/**
 * Loading state with skeleton placeholder.
 * Displays while historical data is being fetched.
 */
export const Loading: Story = {
  render: () => <HistoryDashboardSkeleton />,
};
