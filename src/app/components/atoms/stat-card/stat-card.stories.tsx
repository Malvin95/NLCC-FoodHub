import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import { StatCard } from "./stat-card";
import { StatCardSkeleton } from "./stat-card-skeleton";
import { Users } from "lucide-react";

const meta: Meta<typeof StatCard> = {
  title: "Atoms/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A statistic display card showing a label, value, delta change and trend indicator (up/down) with customizable accent color and icon. Features full dark mode support with theme-aware colors, shadows, and smooth transitions.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Label describing the statistic" },
    value: { control: "text", description: "Primary numeric/stat value" },
    change: {
      control: "text",
      description: "Change descriptor (e.g. +12%, -4%)",
    },
    trend: {
      control: { type: "radio" },
      options: ["up", "down"],
      description: "Trend direction",
    },
    color: {
      control: { type: "select" },
      options: ["rose", "blue", "green", "purple"],
      description: "Accent color theme",
    },
    icon: {
      control: false,
      description: "Icon ReactNode rendered in accent bubble",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatCard>;

const baseArgs = {
  title: "Active Volunteers",
  value: "128",
  change: "+12%",
  trend: "up" as const,
  color: "rose" as const,
  icon: Users,
  iconLabel: "Volunteers Icon",
};

export const Default: Story = {
  args: baseArgs,
};

// Interactive test stories

// Interactive test stories
export const RenderTest: Story = {
  args: baseArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Title and value render
    await expect(canvas.getByText("Active Volunteers")).toBeInTheDocument();
    await expect(canvas.getByText("128")).toBeInTheDocument();
    // Trend change renders
    await expect(canvas.getByText("+12%")).toBeInTheDocument();
    // Color classes applied
    const accentDiv = canvasElement.querySelector("div.p-3.rounded-lg");
    await expect(accentDiv?.className).toMatch(/bg-rose-100/);
    await expect(accentDiv?.className).toMatch(/text-rose-600/);
  },
};

export const DownTrendTest: Story = {
  args: { ...baseArgs, trend: "down", change: "-8%", color: "blue" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("-8%")).toBeInTheDocument();
    // Verify color theme changed
    const accentDiv = canvasElement.querySelector("div.p-3.rounded-lg");
    await expect(accentDiv?.className).toMatch(/bg-blue-100/);
  },
};
// Skeleton Loading States
type SkeletonStory = StoryObj<typeof StatCardSkeleton>;

export const LoadingSkeleton: SkeletonStory = {
  render: () => <StatCardSkeleton />,
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton that matches the StatCard layout with animated pulse effects.",
      },
    },
  },
};

export const SkeletonTest: SkeletonStory = {
  render: () => <StatCardSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check structure and accessibility
    const container = canvas.getByRole("status");
    await expect(container).toHaveAttribute("aria-label", "Loading statistics");

    // Check skeleton elements exist
    const pulsingElements = canvasElement.querySelectorAll(".animate-pulse");
    await expect(pulsingElements.length).toBeGreaterThan(0);

    // Check for screen reader text
    const srText = canvas.getByText("Loading statistics data...");
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain("sr-only");
  },
};
export const MultipleSkeletons: SkeletonStory = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple skeleton loaders in a grid layout, simulating a dashboard loading state.",
      },
    },
    layout: "padded",
  },
};
