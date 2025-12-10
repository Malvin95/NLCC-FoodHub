import { EngagementRequestType } from "@/app/shared/enums";
import { Button } from "../../atoms/button/button";

export interface FilterBarProps {
  /** Currently selected filter value from EngagementRequestType enum */
  activeTab?: string;
  /** Callback fired when a filter button is clicked with the selected filter type */
  onTabChange?: (value: string) => void;
  /** Optional custom labels for filter buttons, merged with default labels */
  customLabels?: Record<string, string>;
}

/**
 * FilterBar component displays engagement request types as a button-based filter group
 * 
 * Features:
 * - Five filter buttons (All, Help, Volunteer, Donation, Question) using EngagementRequestType enum
 * - Active filter indication via button variants (secondary when pressed, outline otherwise)
 * - ARIA pressed state for accessibility and screen reader support
 * - Customizable labels per filter via the customLabels prop
 * - Full dark mode support with theme-aware styling
 * - Keyboard accessible (native button Tab/Enter/Space support)
 * 
 * Styling:
 * - Uses secondary color palette with dark mode variants
 * - Responsive flex layout that wraps on smaller screens
 * - Smooth transitions and visual feedback
 * 
 * Accessibility:
 * - `role="group"` with descriptive `aria-label` for context
 * - Native buttons with `aria-pressed` state
 * - Keyboard operable by default (no custom handlers needed)
 * - Works with screen readers out of the box
 * 
 * @component
 * @param {FilterBarProps} props - Component configuration
 * @returns {JSX.Element} Rendered filter bar with buttons
 * 
 * @example
 * ```tsx
 * // Basic usage with controlled state
 * const [activeTab, setActiveTab] = useState(EngagementRequestType.ALL);
 * 
 * <FilterBar
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom labels
 * <FilterBar
 *   activeTab={EngagementRequestType.ALL}
 *   customLabels={{
 *     [EngagementRequestType.ALL]: 'All Types',
 *     [EngagementRequestType.HELP]: 'Need Help',
 *   }}
 *   onTabChange={handleFilterChange}
 * />
 * ```
 * 
 * @see {@link FilterBarSkeleton} for loading state placeholder
 * @see {@link EngagementRequestType} for available filter values
 */
const DEFAULT_LABELS: Record<string, string> = {
  [EngagementRequestType.ALL]: "All Requests",
  [EngagementRequestType.HELP]: "Help Requests",
  [EngagementRequestType.VOLUNTEER]: "Volunteers Needed",
  [EngagementRequestType.DONATION]: "Donations",
  [EngagementRequestType.QUESTION]: "Questions"
};

const FILTER_TYPES = [
  EngagementRequestType.ALL,
  EngagementRequestType.HELP,
  EngagementRequestType.VOLUNTEER,
  EngagementRequestType.DONATION,
  EngagementRequestType.QUESTION
];

export default function FilterBar({
  activeTab,
  onTabChange,
  customLabels = {}
}: FilterBarProps) {
  const labels = {
    ...DEFAULT_LABELS,
    ...customLabels
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter requests by type">
      {FILTER_TYPES.map((filterType) => (
        <Button
          key={filterType}
          type="button"
          aria-pressed={activeTab === filterType}
          onClick={() => onTabChange?.(filterType)}
          variant={activeTab === filterType ? 'secondary' : 'outline'}
        >
          {labels[filterType]}
        </Button>
      ))}
    </div>
  );
}

