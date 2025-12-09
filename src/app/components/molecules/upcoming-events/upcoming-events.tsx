import EventCard from "../../atoms/events-card/event-card";
import { Event } from "@/app/shared/types";
import { mockEvents } from "../../pages/overview-dashboard/_mock-data_";

/**
 * Sample upcoming events data for demonstration purposes.
 * 
 * @constant
 * This is provided as sensible default mock data. In production, this data
 * would be fetched from an API or database.
 */

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
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
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
export default function UpcomingEvents({ events = mockEvents }: UpcomingEventsProps) {
    const eventCount = events.length;
    const eventText = eventCount === 1 ? 'event' : 'events';
    
    return (
        <section 
            className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
            aria-labelledby="upcoming-events-heading"
            aria-live="polite"
            aria-atomic="false"
        >
            <h2 id="upcoming-events-heading" className="text-foreground dark:text-foreground font-medium mb-6">
                Upcoming Events
                <span className="sr-only"> ({eventCount} {eventText} available)</span>
            </h2>
            
            {eventCount === 0 ? (
                <div 
                    className="text-center py-8 text-muted-foreground dark:text-muted-foreground"
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