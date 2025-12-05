import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import UpcomingEvents from './upcoming-events';
import { UpcomingEventsSkeleton } from './upcoming-events-skeleton';
import type { Event } from '@/app/shared/types';

const meta: Meta<typeof UpcomingEvents> = {
  title: 'Molecules/UpcomingEvents',
  component: UpcomingEvents,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component displaying a list of upcoming volunteer events. Shows multiple EventCards in a container with loading skeleton support.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof UpcomingEvents>;
type SkeletonStory = StoryObj<typeof UpcomingEventsSkeleton>;

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Community Food Drive',
    date: 'Dec 5, 2025',
    time: '9:00 AM - 2:00 PM',
    location: 'Central Community Center',
    volunteers: 24,
  },
  {
    id: '2',
    title: 'Holiday Meal Distribution',
    date: 'Dec 15, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Food Bank Facility',
    volunteers: 45,
  },
  {
    id: '3',
    title: 'Volunteer Training Session',
    date: 'Dec 8, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Food Bank Office',
    volunteers: 12,
  },
];

/**
 * Default upcoming events list with mock data
 */
export const Default: Story = {
  render: () => <UpcomingEvents />
};

/**
 * Upcoming events with custom event list
 */
export const CustomEvents: Story = {
  render: () => (
    <UpcomingEvents
      events={[
        {
          id: 'custom-1',
          title: 'Special Community Outreach',
          date: 'Dec 10, 2025',
          time: '1:00 PM - 5:00 PM',
          location: 'Downtown Plaza',
          volunteers: 30,
        },
        {
          id: 'custom-2',
          title: 'Fundraising Gala',
          date: 'Dec 20, 2025',
          time: '6:00 PM - 9:00 PM',
          location: 'Grand Ballroom',
          volunteers: 100,
          electedVolunteer: 'Sarah Johnson',
        },
      ]}
    />
  )
};

/**
 * Upcoming events with single event
 */
export const SingleEvent: Story = {
  render: () => (
    <UpcomingEvents
      events={[
        {
          id: '1',
          title: 'Quick Volunteer Signup',
          date: 'Dec 6, 2025',
          time: '3:00 PM - 4:00 PM',
          location: 'Local Office',
          volunteers: 5,
        },
      ]}
    />
  )
};

/**
 * Upcoming events with no events
 */
export const NoEvents: Story = {
  render: () => <UpcomingEvents events={[]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Heading should be present
    await expect(canvas.getByText('Upcoming Events')).toBeInTheDocument();
    
    // Empty state message should be displayed
    await expect(canvas.getByText('No upcoming events scheduled at this time.')).toBeInTheDocument();
    await expect(canvas.getByText('Check back soon for new volunteer opportunities.')).toBeInTheDocument();
    
    // No list items should exist
    const listItems = canvasElement.querySelectorAll('li');
    await expect(listItems.length).toBe(0);
  }
};

/**
 * Section structure and styling test
 */
export const SectionStructureTest: Story = {
  render: () => <UpcomingEvents />,
  play: async ({ canvasElement }) => {
    // Check for section element
    const section = canvasElement.querySelector('section');
    await expect(section).toBeInTheDocument();
    
    // Check for live region attributes
    await expect(section).toHaveAttribute('aria-labelledby', 'upcoming-events-heading');
    await expect(section).toHaveAttribute('aria-live', 'polite');
    await expect(section).toHaveAttribute('aria-atomic', 'false');
    
    // Check container styling
    const container = canvasElement.querySelector('.bg-white.rounded-lg.shadow-sm.border');
    await expect(container).toBeInTheDocument();
    
    // Check heading exists and has proper ID
    const heading = canvasElement.querySelector('#upcoming-events-heading');
    await expect(heading).toBeInTheDocument();
    await expect(heading?.textContent).toContain('Upcoming Events');
  }
};

/**
 * Verify all events are rendered
 */
export const AllEventsRenderTest: Story = {
  render: () => <UpcomingEvents events={mockEvents} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check each event title is rendered
    await expect(canvas.getByText('Community Food Drive')).toBeInTheDocument();
    await expect(canvas.getByText('Holiday Meal Distribution')).toBeInTheDocument();
    await expect(canvas.getByText('Volunteer Training Session')).toBeInTheDocument();
  }
};

/**
 * Verify section accessibility and ARIA labeling
 */
export const AccessibilityTest: Story = {
  render: () => <UpcomingEvents />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check section has aria-labelledby
    const section = canvasElement.querySelector('section');
    await expect(section).toHaveAttribute('aria-labelledby', 'upcoming-events-heading');
    
    // Check heading is properly associated
    const heading = canvas.getByText('Upcoming Events');
    await expect(heading).toHaveAttribute('id', 'upcoming-events-heading');
    
    // Check for live region attributes
    await expect(section).toHaveAttribute('aria-live', 'polite');
  }
};

/**
 * Verify event count is announced to screen readers
 */
export const EventCountAnnouncementTest: Story = {
  render: () => <UpcomingEvents events={mockEvents} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check sr-only event count text is present
    const countText = canvas.getByText(new RegExp(`\\(${mockEvents.length} events available\\)`));
    await expect(countText).toBeInTheDocument();
    await expect(countText.className).toContain('sr-only');
  }
};

/**
 * Verify event cards maintain spacing in semantic list
 */
export const EventCardSpacingTest: Story = {
  render: () => <UpcomingEvents events={mockEvents} />,
  play: async ({ canvasElement }) => {
    // Check for list element
    const list = canvasElement.querySelector('ul');
    await expect(list).toBeInTheDocument();
    await expect(list?.className).toContain('space-y-4');
    
    // Check list has aria-label
    await expect(list).toHaveAttribute('aria-label');
    
    // Check number of list items matches events array
    const listItems = canvasElement.querySelectorAll('li');
    await expect(listItems.length).toBe(mockEvents.length);
  }
};

// Skeleton Loading States

/**
 * Loading skeleton matching the container and events layout
 */
export const LoadingSkeleton: SkeletonStory = {
  render: () => <UpcomingEventsSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton that matches the UpcomingEvents layout with animated pulse effects for heading and 5 event placeholders.'
      }
    }
  }
};

/**
 * Verify skeleton structure and accessibility
 */
export const SkeletonStructureTest: SkeletonStory = {
  render: () => <UpcomingEventsSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check role and aria-label
    const section = canvas.getByRole('status');
    await expect(section).toHaveAttribute('aria-label', 'Loading upcoming events');
    
    // Check heading skeleton exists
    const headingSkeleton = canvasElement.querySelector('.w-40.h-7.bg-gray-200');
    await expect(headingSkeleton).toBeInTheDocument();
    await expect(headingSkeleton?.className).toContain('animate-pulse');
    
    // Check event card skeletons
    const eventSkeletons = canvasElement.querySelectorAll('.space-y-4 > li');
    await expect(eventSkeletons.length).toBe(5);
    
    // Check for screen reader text
    const srText = canvas.getByText('Loading upcoming events...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');
  }
};

/**
 * Verify skeleton has correct number of event placeholders
 */
export const SkeletonEventCountTest: SkeletonStory = {
  render: () => <UpcomingEventsSkeleton />,
  play: async ({ canvasElement }) => {
    // Should have 5 event card skeletons (matching default mock data count)
    const eventPlaceholders = canvasElement.querySelectorAll('.space-y-4 > li');
    await expect(eventPlaceholders.length).toBe(5);
    
    // Each should have animating elements
    const pulseElements = canvasElement.querySelectorAll('.animate-pulse');
    await expect(pulseElements.length).toBeGreaterThan(5); // At least heading + event skeletons
  }
};

/**
 * Comparison view showing list and skeleton side by side
 */
export const EventsVsSkeleton: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap">
      <div className="flex-1 min-w-[400px]">
        <h3 className="text-sm font-medium mb-4 text-gray-700">Loaded State</h3>
        <UpcomingEvents events={mockEvents} />
      </div>
      <div className="flex-1 min-w-[400px]">
        <h3 className="text-sm font-medium mb-4 text-gray-700">Loading State</h3>
        <UpcomingEventsSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of the loaded events list and its loading skeleton.'
      }
    }
  }
};

/**
 * Multiple sections demonstrating various states
 */
export const MultipleStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Default State</h2>
        <UpcomingEvents />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Single Event</h2>
        <UpcomingEvents
          events={[
            {
              id: '1',
              title: 'Single Event Demo',
              date: 'Dec 5, 2025',
              time: '2:00 PM',
              location: 'Demo Location',
              volunteers: 5,
            },
          ]}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Empty State</h2>
        <UpcomingEvents events={[]} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Multiple UpcomingEvents sections demonstrating different states and content.'
      }
    }
  }
};
