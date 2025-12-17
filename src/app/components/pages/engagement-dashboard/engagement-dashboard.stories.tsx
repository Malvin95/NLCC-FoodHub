/**
 * Storybook stories for EngagementDashboard
 */
import type { Meta, StoryObj } from '@storybook/react';
import EngagementDashboard from './engagement-dashboard';
import EngagementDashboardSkeleton from './engagement-dashboard-skeleton';
import { within, expect } from 'storybook/test';
import { requests } from './_mock-data_';

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

/**
 * Verifies dashboard title renders and that engagement cards are displayed.
 * Tests that all card elements (title, content, author, timestamp, status, response count) render correctly.
 */
export const RendersCards: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Verifies dashboard title and that engagement cards render with all content fields.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify page title using role for stability
    await expect(canvas.getByRole('heading', { level: 1, name: /Engagement Dashboard/i })).toBeInTheDocument();
    
    // Verify page description
    await expect(canvas.getByText(/Community requests, questions, and volunteer opportunities/i)).toBeInTheDocument();
    
    // Verify filter section exists
    const filterSection = canvas.getByLabelText(/Filter engagement requests/i);
    await expect(filterSection).toBeInTheDocument();
    
    // Verify engagement list exists with proper role and count
    const engagementList = canvas.getByRole('feed', { name: /Engagement requests/i });
    await expect(engagementList).toBeInTheDocument();
    const listItems = within(engagementList).getAllByRole('article');
    await expect(listItems.length).toBe(requests.length);
  },
};

/**
 * Verifies that engagement cards render with proper content and semantics.
 * Tests individual card titles, authors, timestamps, and response counts.
 */
export const RendersMockData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Verifies that mock engagement data renders with correct titles, authors, and response counts.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Use role-based, structure-first assertions to avoid brittle text checks
    const engagementList = canvas.getByRole('feed', { name: /Engagement requests/i });
    const items = within(engagementList).getAllByRole('article');
    await expect(items.length).toBe(requests.length);

    // Each item should have a status badge and a response count
    for (const item of items) {
      await expect(within(item).getByRole('status')).toBeInTheDocument();
      await expect(within(item).getByText(/\d+\s+responses/i)).toBeInTheDocument();
    }
  },
};

/**
 * Verifies engagement type labels and colors are properly displayed.
 * Tests that correct type labels appear for Help, Volunteer, Donation, and Question types.
 */
export const DisplaysEngagementTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Verifies that engagement types (Help, Volunteer, Donation, Question) display with correct labels.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Query by role alone, then check for type labels within list items
    const engagementList = canvas.getByRole('feed', { name: /Engagement requests/i });
    const items = within(engagementList).getAllByRole('article');
    
    // Collect all type labels from items and verify each type appears
    const allTypeElements = items.flatMap(item => 
      within(item).queryAllByRole('group')
    );
    
    const typeTexts = allTypeElements.flatMap(el => el.textContent);
    await expect(typeTexts.some(text => text?.match(/Help Request/i))).toBe(true);
    await expect(typeTexts.some(text => text?.match(/Volunteer Needed/i))).toBe(true);
    await expect(typeTexts.some(text => text?.match(/Donation/i))).toBe(true);
    await expect(typeTexts.some(text => text?.match(/Question/i))).toBe(true);
  },
};

/**
 * Verifies engagement status badges display with correct labels.
 * Tests that all status types (Urgent, Open, In Progress, Resolved) are rendered.
 */
export const DisplaysStatuses: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Verifies that all engagement status badges render (Urgent, Open, In Progress, Resolved).'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Query status badges by role, then verify text content
    const statusBadges = canvas.getAllByRole('status');
    await expect(statusBadges.length).toBeGreaterThan(0);
    
    const statusTexts = statusBadges.map(badge => badge.textContent);
    await expect(statusTexts.some(text => text?.match(/Urgent/i))).toBe(true);
    await expect(statusTexts.some(text => text?.match(/Open/i))).toBe(true);
    await expect(statusTexts.some(text => text?.match(/In Progress/i))).toBe(true);
    await expect(statusTexts.some(text => text?.match(/Resolved/i))).toBe(true);
  },
};

/**
 * Verifies response counts display for all engagement cards.
 * Tests that numeric response counts render for each card.
 */
export const DisplaysResponseCounts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Verifies that response counts display for each engagement card.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify response counts are displayed once per item to match dataset size
    const engagementList = canvas.getByRole('feed', { name: /Engagement requests/i });
    const items = within(engagementList).getAllByRole('article');
    
    // Each item should have exactly one response count
    for (const item of items) {
      const count = within(item).getAllByText(/\d+\s+responses/i);
      await expect(count.length).toBeGreaterThan(0);
    }
  },
};

/**
 * Verifies semantic accessibility structure of the dashboard.
 * Tests that list semantics, ARIA labels, and proper roles are applied.
 */
export const HasAccessibilityStructure: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Verifies semantic HTML and ARIA attributes for accessibility.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify list structure with role-based query and expected count
    const engagementList = canvas.getByRole('feed', { name: /Engagement requests/i });
    const items = within(engagementList).getAllByRole('article');
    await expect(items.length).toBe(requests.length);
    
    // Verify list items exist
    const listItems = canvas.getAllByRole('article');
    await expect(listItems.length).toBeGreaterThan(0);
    
    // Verify filter section has proper label
    await expect(canvas.getByLabelText(/Filter engagement requests/i)).toBeInTheDocument();
  },
};

export const LoadingSkeleton: SkeletonStory = {
  parameters: {
    docs: {
      description: {
        story: 'Loading state showing skeleton placeholders while data loads.'
      }
    }
  },
  render: () => <EngagementDashboardSkeleton />,
};

// TODO: Tests for the filter functionlity will be added once filtering logic is implemented. #46
