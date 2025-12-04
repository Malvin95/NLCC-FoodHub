import EventCard, { Event } from "../../atoms/events-card/event-card";

/**
 * Sample upcoming events data for demonstration purposes.
 * 
 * @constant
 * @remarks
 * This is provided as sensible default mock data. In production, this data
 * would be fetched from an API or database.
 */
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
    {
        id: '4',
        title: 'Mobile Pantry - North District',
        date: 'Dec 12, 2025',
        time: '11:00 AM - 3:00 PM',
        location: 'North Park',
        volunteers: 18,
    },
    {
        id: '5',
        title: 'Mobile Pantry - North District',
        date: 'Dec 12, 2025',
        time: '11:00 AM - 3:00 PM',
        location: 'North Park',
        electedVolunteer: 'John Doe',
    },
];

/**
 * Props for the `UpcomingEvents` component.
 * 
 * @interface UpcomingEventsProps
 * @property {Event[]} [events] Optional array of events to display. Defaults to mockEvents.
 * @property {boolean} [isLoading] Optional loading state. When true, skeleton is shown instead.
 */
interface UpcomingEventsProps {
  events?: Event[];
  isLoading?: boolean;
}

/**
 * UpcomingEvents displays a list of upcoming volunteer events in a container.
 * 
 * Features:
 * - Renders multiple event cards in a semantic list structure
 * - Consistent styling with rounded corners and shadow
 * - Responsive layout adapts to parent width
 * - Supports loading state with skeleton placeholder
 * - Semantic heading for page structure
 * - Empty state with descriptive messaging
 * 
 * Accessibility:
 * - Uses semantic `<section>` element with descriptive heading
 * - List structure with `<ul>` and `<li>` elements for proper semantic meaning
 * - Heading identifies the content purpose for screen readers
 * - `aria-label` announces total event count to screen reader users
 * - `aria-live="polite"` region for dynamic event updates
 * - Empty state message when no events are available
 * - Events rendered with EventCard component (accessible by default)
 * - Event count helps users understand list size upfront
 * 
 * @component
 * @since 1.0.0
 * @param {UpcomingEventsProps} props - Component props.
 * @returns {JSX.Element} The rendered upcoming events section.
 * @see EventCard for individual event display.
 * @see UpcomingEventsSkeleton for loading UI.
 * 
 * @example
 * ```tsx
 * // Default with mock data
 * <UpcomingEvents />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom events array
 * <UpcomingEvents events={customEvents} />
 * ```
 * 
 * @example
 * ```tsx
 * // With Suspense boundary (Next.js App Router)
 * <Suspense fallback={<UpcomingEventsSkeleton />}>
 *   <UpcomingEvents events={asyncEvents} />
 * </Suspense>
 * ```
 */
export default function UpcomingEvents({ events = mockEvents }: UpcomingEventsProps = {}) {
    const eventCount = events.length;
    const eventText = eventCount === 1 ? 'event' : 'events';
    
    return (
        <section 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            aria-labelledby="upcoming-events-heading"
            aria-live="polite"
            aria-atomic="false"
        >
            <h2 id="upcoming-events-heading" className="text-gray-900 mb-6">
                Upcoming Events
                <span className="sr-only"> ({eventCount} {eventText} available)</span>
            </h2>
            
            {eventCount === 0 ? (
                <div 
                    className="text-center py-8 text-gray-500"
                    role="status"
                >
                    <p>No upcoming events scheduled at this time.</p>
                    <p className="text-sm mt-2">Check back soon for new volunteer opportunities.</p>
                </div>
            ) : (
                <ul 
                    className="space-y-4"
                    aria-label={`${eventCount} upcoming volunteer ${eventText}`}
                >
                    {events.map((event) => (
                        <li key={event.id} className="list-none">
                            <EventCard event={event} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}