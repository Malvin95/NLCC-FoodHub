/**
 * Storybook stories for EngagementDashboard
 */
import type { Meta, StoryObj } from '@storybook/react';
import EngagementDashboard from './engagement-dashboard';
import EngagementDashboardSkeleton from './engagement-dashboard-skeleton';
import { within, expect } from 'storybook/test';

const meta: Meta<typeof EngagementDashboard> = {
  title: 'Pages/EngagementDashboard',
  component: EngagementDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Engagement dashboard showing community requests, questions, and volunteer opportunities.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EngagementDashboard>;

type SkeletonStory = StoryObj<typeof EngagementDashboardSkeleton>;

export const Default: Story = {};

export const RendersCards: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Engagement Dashboard/i)).toBeInTheDocument();
    await expect(canvas.getAllByText(/responses/i).length).toBeGreaterThan(0);
  },
};

export const LoadingSkeleton: SkeletonStory = {
  render: () => <EngagementDashboardSkeleton />,
};
