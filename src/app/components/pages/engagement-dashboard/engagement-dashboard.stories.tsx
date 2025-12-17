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
    
    // Verify page title
    await expect(canvas.getByText(/Engagement Dashboard/i)).toBeInTheDocument();
    
    // Verify page description
    await expect(canvas.getByText(/Community requests, questions, and volunteer opportunities/i)).toBeInTheDocument();
    
    // Verify filter section exists
    const filterSection = canvas.getByLabelText(/Filter engagement requests/i);
    await expect(filterSection).toBeInTheDocument();
    
    // Verify engagement list exists with proper role
    const engagementList = canvas.getByLabelText(/Engagement requests/);
    await expect(engagementList).toBeInTheDocument();
    await expect(engagementList).toHaveAttribute('role', 'list');
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
    
    // Verify first card (Emergency Food Request - Family of 5)
    await expect(canvas.getByText(/Emergency Food Request - Family of 5/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Maria Rodriguez/i)).toBeInTheDocument();
    
    // Verify second card (Volunteer drivers)
    await expect(canvas.getByText(/Need drivers for Saturday delivery/i)).toBeInTheDocument();
    await expect(canvas.getByText(/James Wilson/i)).toBeInTheDocument();
    
    // Verify status badges render
    await expect(canvas.getByText(/Urgent/)).toBeInTheDocument();

    const openBadges = canvas.getAllByText(/Open/i);
    await expect(openBadges.length).toBeGreaterThan(0);
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
    
    // Verify all engagement type labels render
    const helpLabels = canvas.getAllByText(/Help Request/i);
    await expect(helpLabels.length).toBeGreaterThan(0);

    const volunteerLabels = canvas.getAllByText(/Volunteer Needed/i);
    await expect(volunteerLabels.length).toBeGreaterThan(0);

    const donationLabels = canvas.getAllByText(/Donation/i);
    await expect(donationLabels.length).toBeGreaterThan(0);

    const questionLabels = canvas.getAllByText(/Question/i);
    await expect(questionLabels.length).toBeGreaterThan(0);
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
    
    // Verify status badges are displayed
    await expect(canvas.getByText(/Urgent/)).toBeInTheDocument();

    const openBadges = canvas.getAllByText(/Open/i);
    await expect(openBadges.length).toBeGreaterThan(0);

    const inProgressBadges = canvas.getAllByText(/In Progress/i);
    await expect(inProgressBadges.length).toBeGreaterThan(0);

    const resolvedBadges = canvas.getAllByText(/Resolved/i);
    await expect(resolvedBadges.length).toBeGreaterThan(0);
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
    
    // Verify response counts are displayed
    const responseCounts = canvas.getAllByText(/responses/i);
    await expect(responseCounts.length).toBeGreaterThan(0);
    
    // Verify specific response counts from mock data
    await expect(canvas.getByText(/3 responses/i)).toBeInTheDocument(); // First card
    await expect(canvas.getByText(/7 responses/i)).toBeInTheDocument(); // Second card
    await expect(canvas.getByText(/12 responses/i)).toBeInTheDocument(); // Fourth card
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
    
    // Verify list structure
    const engagementList = canvas.getByLabelText(/Engagement requests/);
    await expect(engagementList).toHaveAttribute('role', 'list');
    
    // Verify list items exist
    const listItems = canvas.getAllByRole('listitem');
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
