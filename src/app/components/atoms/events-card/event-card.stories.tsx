import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import EventCard from './event-card';
import { EventCardSkeleton } from './event-card-skeleton';

const meta: Meta<typeof EventCard> = {
  title: 'Atoms/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component that displays event information including date, time, location, and volunteer count. Includes a matching skeleton for loading states.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof EventCard>;
type SkeletonStory = StoryObj<typeof EventCardSkeleton>;

const mockEvent = {
  id: '1',
  title: 'Food Drive',
  date: '2025-12-15',  // ISO 8601 date string
  time: '10:00 AM',
  location: '123 Main St, Downtown',
  volunteers: 12,
  electedVolunteer: 'John Smith',
};

/**
 * Default event card displaying sample event data
 */
export const Default: Story = {
  render: () => <EventCard event={mockEvent} />
};

/**
 * Event card displaying only volunteer count (no elected volunteer)
 */
export const VolunteerCountOnly: Story = {
  render: () => (
    <EventCard
      event={{
        ...mockEvent,
        title: 'Data Entry Help',
        volunteers: 8,
        electedVolunteer: undefined,
      }}
    />
  )
};

/**
 * Event card displaying only elected volunteer (no count)
 */
export const ElectedVolunteerOnly: Story = {
  render: () => (
    <EventCard
      event={{
        ...mockEvent,
        title: 'Special Project',
        volunteers: undefined,
        electedVolunteer: 'Sarah Johnson',
      }}
    />
  )
};

/**
 * Event card with many volunteers
 */
export const HighVolunteerCount: Story = {
  render: () => (
    <EventCard
      event={{
        ...mockEvent,
        title: 'Annual Gala',
        date: '2025-12-20',
        time: '6:00 PM',
        location: 'Grand Ballroom, 456 Park Ave',
        volunteers: 250,
      }}
    />
  )
};

/**
 * Event card with minimal volunteers
 */
export const LowVolunteerCount: Story = {
  render: () => (
    <EventCard
      event={{
        ...mockEvent,
        title: 'Team Lunch',
        volunteers: 1,
      }}
    />
  )
};

/**
 * Event card with long title and location
 */
export const LongContent: Story = {
  render: () => (
    <EventCard
      event={{
        ...mockEvent,
        title: 'Community Outreach and Educational Workshop Series',
        location: 'The Community Center Building East Wing, Room 315, Downtown District',
      }}
    />
  )
};

/**
 * Card structure and content test
 */
export const CardStructureTest: Story = {
  render: () => <EventCard event={mockEvent} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check article element with proper ARIA attributes
    const article = canvasElement.querySelector('article');
    await expect(article).toBeInTheDocument();
    await expect(article).toHaveAttribute('aria-labelledby', `event-title-${mockEvent.id}`);
    
    // Check title is rendered
    const title = canvas.getByText(mockEvent.title);
    await expect(title).toBeInTheDocument();
  }
};

/**
 * Verify all event details are rendered (including optional fields)
 */
export const AllDetailsRenderedTest: Story = {
  render: () => <EventCard event={mockEvent} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check title
    await expect(canvas.getByText(mockEvent.title)).toBeInTheDocument();
    
    // Check date is rendered (formatted from ISO string)
    // The ISO date '2025-12-15' should be displayed as 'Dec 15, 2025'
    const timeElement = canvasElement.querySelector('time');
    await expect(timeElement).toBeInTheDocument();
    await expect(timeElement).toHaveAttribute('dateTime', mockEvent.date);
    
    // Check time
    await expect(canvas.getByText(new RegExp(mockEvent.time))).toBeInTheDocument();
    
    // Check location
    await expect(canvas.getByText(mockEvent.location)).toBeInTheDocument();
    
    // Check volunteer count (since mockEvent includes it)
    if (mockEvent.volunteers) {
      await expect(canvas.getByText(new RegExp(`${mockEvent.volunteers} volunteers registered`))).toBeInTheDocument();
    }
    
    // Check elected volunteer (since mockEvent includes it)
    if (mockEvent.electedVolunteer) {
      await expect(canvas.getByText(new RegExp(`Elected Volunteer: ${mockEvent.electedVolunteer}`))).toBeInTheDocument();
    }
  }
};

/**
 * Verify optional volunteer details rendering
 */
export const OptionalVolunteerDetailsTest: Story = {
  render: () => <EventCard event={mockEvent} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // If event has volunteers count, it should be displayed
    if (mockEvent.volunteers) {
      await expect(canvas.getByText(new RegExp(`${mockEvent.volunteers} volunteers registered`))).toBeInTheDocument();
    }
    
    // If event has elected volunteer, it should be displayed
    if (mockEvent.electedVolunteer) {
      await expect(canvas.getByText(new RegExp(`Elected Volunteer: ${mockEvent.electedVolunteer}`))).toBeInTheDocument();
    }
  }
};

/**
 * Verify icons are rendered for each detail
 */
export const IconsTest: Story = {
  render: () => <EventCard event={mockEvent} />,
  play: async ({ canvasElement }) => {
    // Check for icon SVGs (Lucide icons render as SVG)
    const svgElements = canvasElement.querySelectorAll('svg');
    
    // Should have at least 3 icons:
    // 1 Calendar icon for date/time
    // 1 MapPin icon for location
    // 1 or 2 Users icons (one for elected volunteer, one for volunteer count)
    await expect(svgElements.length).toBeGreaterThanOrEqual(3);
    await expect(svgElements.length).toBeLessThanOrEqual(4);
  }
};

/**
 * Verify semantic structure and spacing
 */
export const SemanticStructureTest: Story = {
  render: () => <EventCard event={mockEvent} />,
  play: async ({ canvasElement }) => {
    // Check for heading (event title)
    const heading = canvasElement.querySelector('h3');
    await expect(heading).toBeInTheDocument();
    await expect(heading?.textContent).toContain(mockEvent.title);
    
    // Check for description lists (dl elements)
    const descriptionLists = canvasElement.querySelectorAll('dl');
    await expect(descriptionLists.length).toBeGreaterThan(0);
    
    // Check for structured details container
    const detailsContainer = canvasElement.querySelector('.space-y-2');
    await expect(detailsContainer).toBeInTheDocument();
  }
};

// Skeleton Loading States

/**
 * Loading skeleton matching the card layout
 */
export const LoadingSkeleton: SkeletonStory = {
  render: () => <EventCardSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton that matches the EventCard layout with animated pulse effects.'
      }
    }
  }
};

/**
 * Verify skeleton structure and accessibility
 */
export const SkeletonStructureTest: SkeletonStory = {
  render: () => <EventCardSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check role and aria-label
    const container = canvas.getByRole('status');
    await expect(container).toHaveAttribute('aria-label', 'Loading event details');
    
    // Check skeleton elements exist
    const pulsingElements = canvasElement.querySelectorAll('.animate-pulse');
    await expect(pulsingElements.length).toBeGreaterThan(0);
    
    // Check for screen reader text
    const srText = canvas.getByText('Loading event details...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');
  }
};

/**
 * Verify skeleton has title placeholder
 */
export const SkeletonTitleTest: SkeletonStory = {
  render: () => <EventCardSkeleton />,
  play: async ({ canvasElement }) => {
    // Check title skeleton exists
    const titleSkeleton = canvasElement.querySelector('.w-48.h-6.bg-gray-200');
    await expect(titleSkeleton).toBeInTheDocument();
    await expect(titleSkeleton?.className).toContain('animate-pulse');
  }
};

/**
 * Verify skeleton has detail rows
 */
export const SkeletonDetailsTest: SkeletonStory = {
  render: () => <EventCardSkeleton />,
  play: async ({ canvasElement }) => {
    // Check for detail rows (date/time, location, volunteers)
    const detailsContainer = canvasElement.querySelector('.space-y-2');
    await expect(detailsContainer).toBeInTheDocument();
    
    // Should have 3 detail rows (each with icon placeholder and text placeholder)
    const detailRows = detailsContainer?.querySelectorAll('.flex.items-center.gap-2');
    await expect(detailRows?.length).toBe(3);
  }
};

/**
 * Comparison view showing card and skeleton side by side
 */
export const CardVsSkeleton: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <div className="flex-1 min-w-[320px]">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Loaded State</h3>
        <EventCard event={mockEvent} />
      </div>
      <div className="flex-1 min-w-[320px]">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Loading State</h3>
        <EventCardSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of the loaded card and its loading skeleton.'
      }
    }
  }
};

/**
 * Multiple event cards in a list
 */
export const EventListDemo: Story = {
  render: () => (
    <div className="space-y-3 w-full max-w-md">
      <EventCard event={mockEvent} />
      <EventCard
        event={{
          id: '2',
          title: 'Beach Cleanup',
          date: '2025-12-17',
          time: '8:00 AM',
          location: 'Sunset Beach',
          volunteers: 45,
        }}
      />
      <EventCard
        event={{
          id: '3',
          title: 'Workshop: JavaScript Basics',
          date: '2025-12-22',
          time: '2:00 PM',
          location: 'Tech Center, Room 201',
          volunteers: 8,
        }}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Multiple event cards displayed as they would appear in a list view.'
      }
    }
  }
};
