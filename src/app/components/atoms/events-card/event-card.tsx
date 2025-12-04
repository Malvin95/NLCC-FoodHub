import { Calendar, MapPin, Users } from "lucide-react";

/**
 * Represents a single event with details for volunteer coordination.
 * 
 * @interface Event
 * @property {string} id - Unique identifier for the event.
 * @property {string} title - Title or name of the event.
 * @property {string} date - Event date (e.g., "Dec 15, 2025").
 * @property {string} time - Event time (e.g., "10:00 AM").
 * @property {string} location - Physical location or address of the event.
 * @property {number} volunteers - Optional number of volunteers registered for the event.
 * @property {string} electedVolunteer - Optional name of the elected volunteer for the event.
 */
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  volunteers?: number;
  electedVolunteer?: string;
}

/**
 * Props for the `EventCard` component.
 * 
 * @interface EventCardProps
 * @property {Event} event - The event object containing all details to display.
 */
interface EventCardProps {
  event: Event;
}

/**
 * EventCard displays event information in a compact, accessible card format.
 * 
 * Features:
 * - Displays event title, date, time, location, and volunteer details
 * - Icon-based visual hierarchy using Lucide icons
 * - Responsive layout with consistent spacing
 * - Semantic HTML structure for accessibility (article, dl/dt/dd, time element)
 * - Accessible color contrast and readable typography
 * - Optional volunteer count and elected volunteer display
 * 
 * Accessibility:
 * - Uses `<article>` element with `aria-labelledby` pointing to the event title
 * - Event title has unique ID for proper ARIA labeling
 * - Uses description list (`<dl>`, `<dt>`, `<dd>`) for structured key-value pairs
 * - Screen reader labels (`sr-only` class) for term definitions (Date, Location, etc.)
 * - Icons marked with `aria-hidden="true"` to prevent redundant announcements
 * - Semantic `<time>` element with `dateTime` attribute for proper date/time parsing
 * - `aria-label` on volunteer count for enhanced screen reader clarity
 * - Sufficient color contrast for WCAG AA compliance
 * 
 * @component
 * @since 1.0.0
 * @param {EventCardProps} props - Component props.
 * @returns {JSX.Element} The rendered event card.
 * @see EventCardSkeleton for loading UI.
 * 
 * @example
 * ```tsx
 * const event = {
 *   id: '1',
 *   title: 'Food Drive',
 *   date: 'Dec 15, 2025',
 *   time: '10:00 AM',
 *   location: '123 Main St',
 *   volunteers: 12,
 *   electedVolunteer: 'Jane Doe',
 * };
 * 
 * <EventCard event={event} />
 * ```
 * 
 * @example
 * ```tsx
 * // In a list of events
 * {events.map(event => (
 *   <EventCard key={event.id} event={event} />
 * ))}
 * ```
 */
export default function EventCard({ event }: EventCardProps) {
  return (
    <article 
      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
      aria-labelledby={`event-title-${event.id}`}
    >
        <h3 id={`event-title-${event.id}`} className="text-gray-900 mb-3">{event.title}</h3>
        <dl className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <dt className="sr-only">Date and time</dt>
                <dd>
                  <time dateTime={`${event.date} ${event.time}`}>
                    {event.date} • {event.time}
                  </time>
                </dd>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd>{event.location}</dd>
            </div>
            {(event.volunteers || event.electedVolunteer) && (
              <div className="flex flex-col gap-2 text-gray-600 text-sm">
                {event.electedVolunteer && (
                    <div className="flex gap-2">
                        <Users className="w-4 h-4" color="#3e9392" aria-hidden="true" />
                        <dt className="sr-only">Elected volunteer</dt>
                        <dd>Elected Volunteer: {event.electedVolunteer}</dd>
                    </div>)}
                {event.volunteers && (
                    <div className="flex gap-2">
                        <Users className="w-4 h-4" aria-hidden="true" />
                        <dt className="sr-only">Volunteers registered</dt>
                        <dd>
                          <span aria-label={`${event.volunteers} volunteers registered`}>
                            {event.volunteers} volunteers registered
                          </span>
                        </dd>
                    </div>)}
              </div>
            )}
        </dl>
    </article>
  );
}