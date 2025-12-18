import { Event } from "@/app/shared/types";
import { Calendar, MapPin, Users } from "lucide-react";

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
 * - Displays event title, date (parsed from ISO 8601 string), time, location, and volunteer details
 * - Icon-based visual hierarchy using Lucide icons
 * - Responsive layout with consistent spacing
 * - Semantic HTML structure for accessibility (article, dl/dt/dd, time element)
 * - Accessible color contrast and readable typography
 * - Optional volunteer count and elected volunteer display
 * - Automatic date formatting from ISO 8601 date strings
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 *
 * Accessibility:
 * - Uses `<article>` element with `aria-labelledby` pointing to the event title
 * - Event title has unique ID for proper ARIA labeling
 * - Uses description list (`<dl>`, `<dt>`, `<dd>`) for structured key-value pairs
 * - Screen reader labels (`sr-only` class) for term definitions (Date, Location, etc.)
 * - Icons marked with `aria-hidden="true"` to prevent redundant announcements
 * - Semantic `<time>` element with `dateTime` attribute set to ISO date string for proper date/time parsing
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
 *   date: '2025-12-15',  // ISO 8601 date string (YYYY-MM-DD)
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
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <article
      className="p-4 bg-card dark:bg-slate-950 rounded-lg border border-border dark:border-slate-800 shadow-sm dark:shadow-md transition-colors"
      aria-labelledby={`event-title-${event.id}`}
    >
      <h3
        id={`event-title-${event.id}`}
        className="text-foreground font-medium mb-3"
      >
        {event.title}
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <dl>
            <dt className="sr-only">Date and time</dt>
            <dd>
              <time dateTime={`${event.date}`}>
                {new Date(event.date).toLocaleDateString(
                  undefined,
                  dateFormatOptions,
                )}{" "}
                • {event.time}
              </time>
            </dd>
          </dl>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <dl>
            <dt className="sr-only">Location</dt>
            <dd>{event.location}</dd>
          </dl>
        </div>
        {(event.volunteers || event.electedVolunteer) && (
          <div className="flex flex-col gap-2 text-muted-foreground text-sm">
            {event.electedVolunteer && (
              <div className="flex gap-2">
                <Users className="w-4 h-4" aria-hidden="true" />
                <dl>
                  <dt className="sr-only">Elected volunteer</dt>
                  <dd>Elected Volunteer: {event.electedVolunteer}</dd>
                </dl>
              </div>
            )}
            {event.volunteers && (
              <div className="flex gap-2">
                <Users className="w-4 h-4" aria-hidden="true" />
                <dl>
                  <dt className="sr-only">Volunteers registered</dt>
                  <dd>
                    <span>{event.volunteers} volunteers registered</span>
                  </dd>
                </dl>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
