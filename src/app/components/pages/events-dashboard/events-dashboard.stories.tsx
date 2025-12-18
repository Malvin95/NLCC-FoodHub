/**
 * Storybook stories for EventsDashboard
 */
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import EventsDashboard from './events-dashboard';
import EventsDashboardSkeleton from './events-dashboard-skeleton';
import { mockEvents } from '../overview-dashboard/_mock-data_';

const meta: Meta<typeof EventsDashboard> = {
  title: 'Pages/EventsDashboard',
  component: EventsDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Events dashboard wrapper that presents the events/programs overview page and delegates event rendering to UpcomingEvents. Uses the shared DashboardPageTemplate for consistent layout and dark mode support.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EventsDashboard>;
type SkeletonStory = StoryObj<typeof EventsDashboardSkeleton>;

/**
 * Default events dashboard with mock events data
 */
export const Default: Story = {};

/**
 * Verifies title/description and that all upcoming events render
 */
export const RendersUpcomingEvents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ensures the page heading, description, and upcoming events list render as expected.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Title and description from the dashboard template
    await expect(
      canvas.getByRole('heading', { level: 1, name: /Events & Programs/i })
    ).toBeInTheDocument();
    await expect(canvas.getByText(/Overview of upcoming and past events/i)).toBeInTheDocument();

    // Upcoming events section should be present
    const section = canvas.getByLabelText(/Upcoming Events/i);
    await expect(section).toBeInTheDocument();

    // Number of list items should match mock dataset length
    const listItems = within(section).getAllByRole('listitem');
    await expect(listItems.length).toBe(mockEvents.length);

    // Calendar placeholder region should be present and labeled
    const layoutGroup = canvas.getByRole('group', { name: /Events and calendar layout/i });
    await expect(layoutGroup).toBeInTheDocument();

    const calendarRegion = canvas.getByRole('region', { name: /Event Calendar/i });
    await expect(calendarRegion).toBeInTheDocument();
    await expect(calendarRegion).toHaveAttribute('aria-describedby');
  },
};

/**
 * Verifies semantic structure and accessibility attributes
 */
export const HasAccessibilityStructure: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checks heading hierarchy and ARIA labeling for the upcoming events section.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page heading should be an h1
    const title = canvas.getByRole('heading', { level: 1 });
    await expect(title).toBeInTheDocument();

    // Description should be present as a heading/subheading element
    const description = canvas.getByText(/Overview of upcoming and past events/i);
    await expect(description).toBeInTheDocument();

    // Upcoming events section landmark should expose live region attributes
    const section = canvas.getByLabelText(/Upcoming Events/i);
    await expect(section).toHaveAttribute('aria-live', 'polite');
    await expect(section).toHaveAttribute('aria-atomic', 'false');

    // Calendar region should be labeled by its heading and expose describedby for status
    const calendarRegion = canvas.getByRole('region', { name: /Event Calendar/i });
    await expect(calendarRegion).toBeInTheDocument();
    await expect(calendarRegion).toHaveAttribute('aria-describedby');

    // Layout group should communicate combined content purpose
    const layoutGroup = canvas.getByRole('group', { name: /Events and calendar layout/i });
    await expect(layoutGroup).toBeInTheDocument();
  },
};

/**
 * Loading state showing the events dashboard skeleton
 */
export const LoadingSkeleton: SkeletonStory = {
  render: () => <EventsDashboardSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton state mirroring the events dashboard layout while data loads.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const layoutGroup = canvas.getByRole('group', { name: /Events and calendar layout \(loading\)/i });
    await expect(layoutGroup).toBeInTheDocument();

    const calendarRegion = canvas.getByRole('group').childNodes[1];
    await expect(calendarRegion).toHaveAttribute('aria-busy', 'true');
  },
};
