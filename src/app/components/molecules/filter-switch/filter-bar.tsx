import { EngagementRequestType } from "@/app/shared/enums";
import { Button } from "../../atoms/button/button";

export interface FilterBarProps {
  /** Currently selected filter value (e.g., EngagementRequestType enum values) */
  activeTab?: string;
  /** Callback fired when a filter button is clicked, receives the selected value */
  onTabChange?: (value: string) => void;
  /** Custom filter labels mapping. Keys should match EngagementRequestType values */
  customLabels?: Record<string, string>;
}

/**
 * FilterBar component displays engagement request types as a button-based filter group
 * 
 * Features:
 * - Displays five request type categories as filter buttons (All, Help, Volunteer, Donation, Question)
 * - Uses EngagementRequestType enum for consistent type values
 * - Active filter indication via button variants and `aria-pressed`
 * - Customizable labels for each filter via customLabels prop
 * - Full dark mode support with theme-aware styling
 * - Built on accessible buttons (no hidden tab panels required)
 * - Keyboard friendly (Tab + Enter/Space) by default via native buttons
 * - Screen reader friendly with proper ARIA pressed state
 * 
 * Styling:
 * - Secondary color palette with dark mode variants
 * - Smooth transitions and visual feedback on interaction
 * - Responsive container that adapts to parent width
 * 
 * Accessibility:
 * - Native buttons with clear pressed state via `aria-pressed`
 * - Focusable and keyboard operable without additional handlers
 * - No reliance on hidden tab panels; purely filter intent
 * 
 * @component
 * @param {FilterBarProps} props - Component props
 * @returns {JSX.Element} The rendered filter bar component
 * 
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <FilterBar />
 * ```
 * 
 * @example
 * ```tsx
 * // With controlled state
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
 *     [EngagementRequestType.VOLUNTEER]: 'Volunteer Ops',
 *     [EngagementRequestType.DONATION]: 'Donate',
 *     [EngagementRequestType.QUESTION]: 'Q&A'
 *   }}
 * />
 * ```
 * 
 * @see {@link FilterBarSkeleton} for loading state
 * @see {@link EngagementRequestType} for available filter values
 */
export default function FilterBar({
  activeTab,
  onTabChange,
  customLabels = {}
}: FilterBarProps) {
  const labels = {
    [EngagementRequestType.ALL]: customLabels[EngagementRequestType.ALL] || "All Requests",
    [EngagementRequestType.HELP]: customLabels[EngagementRequestType.HELP] || "Help Requests",
    [EngagementRequestType.VOLUNTEER]: customLabels[EngagementRequestType.VOLUNTEER] || "Volunteers Needed",
    [EngagementRequestType.DONATION]: customLabels[EngagementRequestType.DONATION] || "Donations",
    [EngagementRequestType.QUESTION]: customLabels[EngagementRequestType.QUESTION] || "Questions"
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter requests by type">
      <Button
        type="button"
        aria-pressed={activeTab === EngagementRequestType.ALL}
        onClick={() => onTabChange && onTabChange(EngagementRequestType.ALL)}
        variant={activeTab === EngagementRequestType.ALL ? 'secondary' : 'outline'}
      >
        {labels[EngagementRequestType.ALL]}
      </Button>
      <Button
        type="button"
        aria-pressed={activeTab === EngagementRequestType.HELP}
        onClick={() => onTabChange && onTabChange(EngagementRequestType.HELP)}
        variant={activeTab === EngagementRequestType.HELP ? 'secondary' : 'outline'}
      >
        {labels[EngagementRequestType.HELP]}
      </Button>
      <Button
        type="button"
        aria-pressed={activeTab === EngagementRequestType.VOLUNTEER}
        onClick={() => onTabChange && onTabChange(EngagementRequestType.VOLUNTEER)}
        variant={activeTab === EngagementRequestType.VOLUNTEER ? 'secondary' : 'outline'}
      >
        {labels[EngagementRequestType.VOLUNTEER]}
      </Button>
      <Button
        type="button"
        aria-pressed={activeTab === EngagementRequestType.DONATION}
        onClick={() => onTabChange && onTabChange(EngagementRequestType.DONATION)}
        variant={activeTab === EngagementRequestType.DONATION ? 'secondary' : 'outline'}
      >
        {labels[EngagementRequestType.DONATION]}
      </Button>
      <Button
        type="button"
        aria-pressed={activeTab === EngagementRequestType.QUESTION}
        onClick={() => onTabChange && onTabChange(EngagementRequestType.QUESTION)}
        variant={activeTab === EngagementRequestType.QUESTION ? 'secondary' : 'outline'}
      >
        {labels[EngagementRequestType.QUESTION]}
      </Button>
    </div>
  );
}

