/**
 * Storybook stories for VolunteerDashboard
 */
import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import VolunteerDashboard from "./volunteer-dashboard";
import VolunteerDashboardSkeleton from "./volunteer-dashboard-skeleton";

const meta: Meta<typeof VolunteerDashboard> = {
  title: "Pages/VolunteerDashboard",
  component: VolunteerDashboard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Volunteer dashboard wrapper that presents the volunteer management overview page with stat cards and a placeholder for volunteer list details. Uses the shared DashboardPageTemplate for consistent layout and dark mode support.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VolunteerDashboard>;
type SkeletonStory = StoryObj<typeof VolunteerDashboardSkeleton>;

/**
 * Default volunteer dashboard with mock volunteer statistics
 */
export const Default: Story = {};

// Skeleton Loading States

/**
 * Loading skeleton with stat card and volunteer list placeholders
 */
export const LoadingSkeleton: SkeletonStory = {
  render: () => <VolunteerDashboardSkeleton />,
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton state mirroring the volunteer dashboard layout with 3 stat card placeholders and volunteer list section while data loads.",
      },
    },
  },
};

/**
 * Verify skeleton structure with proper semantic landmarks
 */
export const SkeletonStructureTest: SkeletonStory = {
  render: () => <VolunteerDashboardSkeleton />,
  parameters: {
    layout: "padded",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for stat card skeleton grid with region role
    const statGrid = canvas.getByRole("region", {
      name: /Loading volunteer statistics/i,
    });
    await expect(statGrid).toBeInTheDocument();
    await expect(statGrid).toHaveAttribute("aria-busy", "true");

    // Check for volunteer list section landmark
    const volunteerListSection = canvas.getByRole(
      "region",
      { name: "Volunteer list loading", hidden: true },
    );
    await expect(volunteerListSection).toBeInTheDocument();
    await expect(volunteerListSection).toHaveAttribute("aria-busy", "true");
    await expect(volunteerListSection?.className).toContain("animate-pulse");

    // Check for screen reader text
    const srTexts = canvas.getAllByText(/Loading volunteer/);
    await expect(srTexts.length).toBeGreaterThan(0);

    // Should have 3 stat card skeleton containers
    const statSkeletons = within(statGrid).getAllByRole("status");
    await expect(statSkeletons.length).toBe(3);
  },
};

/**
 * Side-by-side comparison of loaded and loading states
 */
export const DashboardVsSkeleton: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap">
      <div className="flex-1 min-w-[500px]">
        <h3 className="text-sm font-medium mb-4 text-gray-700">Loaded State</h3>
        <VolunteerDashboard />
      </div>
      <div className="flex-1 min-w-[500px]">
        <h3 className="text-sm font-medium mb-4 text-gray-700">
          Loading State
        </h3>
        <VolunteerDashboardSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Side-by-side comparison of the loaded volunteer dashboard and its loading skeleton.",
      },
    },
  },
};
