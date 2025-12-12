import { Clock, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card/card";

interface EngagementCardProps {
  /** Icon component for the engagement type (e.g., MessageCircle, HelpCircle, AlertCircle) */
  typeConfigIcon: React.ReactNode;
  /** Tailwind color class for type label styling (e.g., 'text-blue-600', 'text-red-500') */
  typeConfigColor: string;
  /** Readable engagement type label that pairs with icon (e.g., 'Comment', 'Question', 'Alert') */
  typeConfigLabel: string;
  /** Tailwind classes for status badge border and text (e.g., 'border-green-300 text-green-700') */
  statusColor: string;
  /** Status indicator text (e.g., 'Open', 'Closed', 'In Progress') */
  statusLabel: string;
  /** Primary heading/title of the engagement item */
  title: string;
  /** Main body text content of the engagement */
  content: string;
  /** Human-readable relative timestamp (e.g., '2h ago', '1d ago', '5m ago') */
  time: string;
  /** Author/creator name of the engagement. Optional for anonymous posts */
  author?: string;
  /** Count of responses or replies to this engagement, displayed in footer */
  responseCount: number;
}

/**
 * EngagementCard component for displaying user-generated community content
 * 
 * A flexible card component that displays engagement items like comments, questions, and discussions.
 * Supports custom type indicators (icons + colors), status badges, metadata, and response counts.
 * Ideal for community forums, feedback systems, and discussion boards.
 * 
 * Layout Structure:
 * - Header: Type icon/label and status badge
 * - Content: Title and body text
 * - Footer: Author, timestamp, and response count
 * 
 * Features:
 * - Fully customizable type icons and colors for different content categories
 * - Status badges with custom styling for workflow states (Open, Closed, etc.)
 * - Author attribution and relative timestamp metadata
 * - Response count indicator for engagement metrics
 * - Responsive layout using Tailwind flex with proper spacing
 * - Dark mode compatible via Tailwind classes
 * - Clean semantic structure built on shadcn Card component
 * 
 * Accessibility:
 * - Semantic HTML structure (heading for title, paragraph for content)
 * - Icons paired with text labels for clarity
 * - High contrast color recommendations for badges
 * - Responsive and works with screen readers
 * 
 * @component
 * @param {EngagementCardProps} props - Component configuration
 * @returns {JSX.Element} A card displaying formatted engagement content
 * 
 * @example
 * ```tsx
 * // Comment-type engagement with open status
 * <EngagementCard
 *   typeConfigIcon={<MessageCircle className="w-4 h-4" />}
 *   typeConfigColor="text-blue-600"
 *   typeConfigLabel="Comment"
 *   statusColor="border-green-300 text-green-700"
 *   statusLabel="Open"
 *   title="Community Pantry Request"
 *   content="We are organizing a food drive and looking for volunteers to help with sorting and distribution."
 *   time="2h ago"
 *   author="Jane Doe"
 *   responseCount={3}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Question-type engagement with closed status
 * <EngagementCard
 *   typeConfigIcon={<HelpCircle className="w-4 h-4" />}
 *   typeConfigColor="text-orange-600"
 *   typeConfigLabel="Question"
 *   statusColor="border-gray-300 text-gray-700"
 *   statusLabel="Closed"
 *   title="How do I apply for the food assistance program?"
 *   content="I would like to know the eligibility requirements and application process."
 *   time="3d ago"
 *   author="John Smith"
 *   responseCount={5}
 * />
 * ```
 * 
 * @see {@link EngagementCardSkeleton} - Loading placeholder with same layout
 */
export default function EngagementCard(props: EngagementCardProps) {
  return (
    <Card>
        <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {props.typeConfigIcon}
                <span className={`text-sm ${props.typeConfigColor}`}>
                    {props.typeConfigLabel}
                </span>
            </div>
            <span className={`px-3 py-1 rounded-full border text-xs ${props.statusColor}`}>
                {props.statusLabel}
            </span>
        </CardHeader>
        <CardContent>
            <h3 className="text-gray-900 mb-2">{props.title}</h3>
            <p className="text-gray-600 mb-4">{props.content}</p>
        </CardContent>
        <CardFooter>
            <div className="h-full w-full flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Posted by {props.author}</span>
                    <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {props.time}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{props.responseCount} responses</span>
                </div>
            </div>
        </CardFooter>
    </Card>
  );
}
