import EventCard from "../../atoms/events-card/event-card";
import { Event } from "@/app/shared/types";

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
        date: '2025-12-05T09:00:00.000Z',
        time: '9:00 AM - 2:00 PM',
        location: 'Central Community Center',
        volunteers: 24,
    },
    {
        id: '2',
        title: 'Holiday Meal Distribution',
        date: '2025-12-10T10:00:00.000Z',
        time: '10:00 AM - 4:00 PM',
        location: 'Main Food Bank Facility',
        volunteers: 45,
    },
    {
        id: '3',
        title: 'Mobile Pantry - North District',
        date: '2025-12-12T11:00:00.000Z',
        time: '11:00 AM - 3:00 PM',
        location: 'North Park',
        volunteers: 18,
    },
    {
        id: '4',
        title: 'Mobile Pantry - Town Center',
        date: '2025-12-13T11:00:00.000Z',
        time: '11:00 AM - 3:00 PM',
        location: 'Town Center',
        electedVolunteer: 'John Doe',
    },
    {
        id: '5',
        title: 'Volunteer Training Session',
        date: '2025-12-12T18:00:00.000Z',
        time: '6:00 PM - 8:00 PM',
        location: 'Food Bank Office',
        volunteers: 12,
    }
];

/**
 * Props for the `UpcomingEvents` component.
 * 
 * @interface UpcomingEventsProps
 * @property {Event[]} [events] Optional array of events to display. Defaults to mockEvents.
 */
interface UpcomingEventsProps {
  events?: Event[];
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