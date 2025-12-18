import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import OverviewDashboard from "./overview-dashboard";
import OverviewDashboardSkeleton from "./overview-dashboard-skeleton";

const meta: Meta<typeof OverviewDashboard> = {
  title: "Pages/OverviewDashboard",
  component: OverviewDashboard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Overview dashboard composed of stat cards, trend chart, upcoming events, and inventory status sections.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OverviewDashboard>;
type SkeletonStory = StoryObj<typeof OverviewDashboardSkeleton>;

export const Default: Story = {
  render: () => <OverviewDashboard />,
};

export const StructureTest: Story = {
  render: () => <OverviewDashboard />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page heading
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Overview" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("A summary of key metrics and recent activities."),
    ).toBeInTheDocument();

    // Stat cards
    const statTitles = [
      "Total Donations",
      "Meals Distributed",
      "Active Volunteers",
      "Families Served",
    ];
    for (const title of statTitles) {
      await expect(canvas.getByText(title)).toBeInTheDocument();
    }

    // Trend chart heading
    await expect(
      canvas.getByText("Trends (Last 6 Months)"),
    ).toBeInTheDocument();

    // Upcoming events heading
    await expect(canvas.getByText("Upcoming Events")).toBeInTheDocument();

    // Inventory status heading and item count
    await expect(
      canvas.getByRole("heading", { name: "Inventory Status" }),
    ).toBeInTheDocument();
    const inventoryGrid = canvasElement.querySelector(
      '[aria-label="Inventory items (4 items)"]',
    );
    await expect(inventoryGrid).toBeInTheDocument();
  },
};

export const Loading: SkeletonStory = {
  render: () => <OverviewDashboardSkeleton />,
};

export const LoadingStateTest: SkeletonStory = {
  render: () => <OverviewDashboardSkeleton />,
  play: async ({ canvasElement }) => {
    // Stat card skeletons
    const statSkeletons = canvasElement.querySelectorAll(
      '[aria-label="Loading statistics"]',
    );
    await expect(statSkeletons.length).toBe(4);

    // Chart skeleton
    await expect(
      canvasElement.querySelector('[aria-label="Loading chart data"]'),
    ).toBeInTheDocument();

    // Upcoming events skeleton
    await expect(
      canvasElement.querySelector('[aria-label="Loading upcoming events"]'),
    ).toBeInTheDocument();

    // Content feed skeleton
    await expect(
      canvasElement.querySelector('[aria-label="Loading content feed"]'),
    ).toBeInTheDocument();

    // Inventory skeleton
    await expect(
      canvasElement.querySelector('[aria-label="Loading inventory status"]'),
    ).toBeInTheDocument();
  },
};

export const InventoryDataTest: Story = {
  render: () => <OverviewDashboard />,
  play: async ({ canvasElement }) => {
    const inventoryGrid = canvasElement.querySelector(
      '[aria-label="Inventory items (4 items)"]',
    );
    await expect(inventoryGrid).toBeInTheDocument();

    // Should render four inventory cards
    const cards = inventoryGrid?.querySelectorAll("article");
    await expect(cards?.length).toBe(4);

    // Check for at least one status label
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Inventory Status")).toBeInTheDocument();
  },
};
