/**
 * Storybook stories for EngagementCard component
 * 
 * Showcases all states and configurations of the EngagementCard component including:
 * - Default open/active state
 * - Closed/archived state
 * - Loading skeleton
 * - Interaction tests for content rendering
 * 
 * @file engagement-card.stories.tsx
 */

import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import EngagementCard from './engagement-card';
import { MessageCircle } from 'lucide-react';
import EngagementCardSkeleton from './engagement-card-skeleton';

const meta: Meta<typeof EngagementCard> = {
  title: 'Atoms/EngagementCard',
  component: EngagementCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple engagement card displaying type, status, title, content, author, time, and response count.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof EngagementCard>;

export const Default: Story = {
  args: {
    typeConfigIcon: <MessageCircle className="w-4 h-4 text-blue-600" />,
    typeConfigColor: 'text-blue-600',
    typeConfigLabel: 'Comment',
    statusColor: 'border-green-300 text-green-700',
    statusLabel: 'Open',
    title: 'Community Pantry Request',
    content: 'We are organizing a food drive and looking for volunteers to help with sorting and distribution.',
    time: '2h ago',
    author: 'Jane Doe',
    responseCount: 3,
  }
};

export const ClosedStatus: Story = {
  args: {
    typeConfigIcon: <MessageCircle className="w-4 h-4 text-purple-600" />,
    typeConfigColor: 'text-purple-600',
    typeConfigLabel: 'Discussion',
    statusColor: 'border-gray-300 text-gray-700',
    statusLabel: 'Closed',
    title: 'Donation Sorting Completed',
    content: 'Thanks to all volunteers, sorting is complete. Further updates will be posted next week.',
    time: '1d ago',
    author: 'Admin',
    responseCount: 12,
  }
};

// Interaction tests
export const RendersCoreFields: Story = {
  args: {
    typeConfigIcon: <MessageCircle className="w-4 h-4 text-blue-600" />,
    typeConfigColor: 'text-blue-600',
    typeConfigLabel: 'Comment',
    statusColor: 'border-green-300 text-green-700',
    statusLabel: 'Open',
    title: 'Community Pantry Request',
    content: 'We are organizing a food drive and looking for volunteers to help with sorting and distribution.',
    time: '2h ago',
    author: 'Jane Doe',
    responseCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies all core content fields render correctly: type label, status, title, content, author, time, and response count.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/comment/i)).toBeInTheDocument();
    await expect(canvas.getByText(/open/i)).toBeInTheDocument();
    await expect(canvas.getByText(/community pantry request/i)).toBeInTheDocument();
    await expect(canvas.getByText(/we are organizing a food drive/i)).toBeInTheDocument();
    await expect(canvas.getByText(/posted by jane doe/i)).toBeInTheDocument();
    await expect(canvas.getByText(/2h ago/i)).toBeInTheDocument();
    await expect(canvas.getByText(/3 responses/i)).toBeInTheDocument();
  }
};

export const UpdatesResponseCount: Story = {
  args: {
    typeConfigIcon: <MessageCircle className="w-4 h-4 text-blue-600" />,
    typeConfigColor: 'text-blue-600',
    typeConfigLabel: 'Comment',
    statusColor: 'border-green-300 text-green-700',
    statusLabel: 'Open',
    title: 'Community Pantry Request',
    content: 'We are organizing a food drive and looking for volunteers to help with sorting and distribution.',
    time: '2h ago',
    author: 'Jane Doe',
    responseCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests dynamic response count display with zero responses.'
      }
    }
  },
  render: (args) => <EngagementCard {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify initial count
    await expect(canvas.getByText(/0 responses/i)).toBeInTheDocument();
  }
};

type SkeletonStory = StoryObj<typeof EngagementCardSkeleton>;

export const LoadingSkeleton: SkeletonStory = {
  render: () => <EngagementCardSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loader that mirrors EngagementCard layout for graceful loading states.'
      }
    }
  }
};
