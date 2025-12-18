/**
 * Storybook stories for InventoryDashboard
 */
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import InventoryDashboard from './inventory-dashboard';
import InventoryDashboardSkeleton from './inventory-dashboard-skeleton';

const meta: Meta<typeof InventoryDashboard> = {
  title: 'Pages/InventoryDashboard',
  component: InventoryDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Inventory dashboard wrapper that presents the inventory management overview page and delegates inventory grid rendering to InventoryStatusBar. Uses the shared DashboardPageTemplate for consistent layout and dark mode support.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InventoryDashboard>;
type SkeletonStory = StoryObj<typeof InventoryDashboardSkeleton>;

/**
 * Default inventory dashboard with mock inventory items
 */
export const Default: Story = {};

// Skeleton Loading States

/**
 * Loading skeleton with default inventory item count
 */
export const LoadingSkeleton: SkeletonStory = {
  render: () => <InventoryDashboardSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton state mirroring the inventory dashboard layout with 4 item placeholders while data loads.',
      },
    },
  },
};

/**
 * Verify skeleton structure and accessibility
 */
export const SkeletonStructureTest: SkeletonStory = {
  render: () => <InventoryDashboardSkeleton />,
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for role and aria-label
    const skeleton = canvas.getByRole('status');
    await expect(skeleton).toBeInTheDocument();
    await expect(skeleton).toHaveAttribute('aria-label', 'Loading inventory status');

    // Check for screen reader text
    const srText = canvas.getByText('Loading inventory dashboard...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');

    // Should have 4 skeleton cards (matching mock data count)
    const skeletonCards = canvasElement.querySelectorAll('[role="status"] .grid > div');
    await expect(skeletonCards.length).toBe(4);
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
        <InventoryDashboard />
      </div>
      <div className="flex-1 min-w-[500px]">
        <h3 className="text-sm font-medium mb-4 text-gray-700">Loading State</h3>
        <InventoryDashboardSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of the loaded inventory dashboard and its loading skeleton.',
      },
    },
  },
};
