import { EngagementRequestType } from "@/app/shared/enums";
import { Tabs, TabsList, TabsTrigger } from "../../atoms/tabs";

export interface FilterTabProps {
  /** Currently selected filter/tab value (e.g., EngagementRequestType enum values) */
  activeTab?: string;
  /** Callback fired when a tab trigger is clicked, receives the selected value */
  onTabChange?: (value: string) => void;
  /** CSS class name for the root Tabs element */
  className?: string;
  /** Custom tab trigger labels mapping. Keys should match EngagementRequestType values */
  customLabels?: Record<string, string>;
}

/**
 * FilterTabs component displays engagement request types as tabbed filters
 * 
 * Features:
 * - Displays five request type categories as tab triggers (All, Help, Volunteer, Donation, Question)
 * - Uses EngagementRequestType enum for consistent type values
 * - Active tab state indication with visual styling
 * - Customizable labels for each tab via customLabels prop
 * - Full dark mode support with theme-aware styling
 * - Built on Radix UI Tabs primitive with full accessibility
 * - Keyboard navigation support (arrow keys, Enter, Tab)
 * - Screen reader friendly with proper ARIA attributes and tab roles
 * 
 * Styling:
 * - Secondary color palette with dark mode variants
 * - Smooth transitions and visual feedback on interaction
 * - Responsive container that adapts to parent width
 * 
 * Accessibility:
 * - Semantic tab roles for proper screen reader announcement
 * - aria-selected state for active tab indication
 * - Full keyboard navigation support
 * - Keyboard shortcut support via Radix UI Tabs
 * 
 * @component
 * @param {FilterTabProps} props - Component props
 * @returns {JSX.Element} The rendered filter tabs component
 * 
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <FilterTabs />
 * ```
 * 
 * @example
 * ```tsx
 * // With controlled state
 * const [activeTab, setActiveTab] = useState(EngagementRequestType.ALL);
 * 
 * <FilterTabs
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom labels
 * <FilterTabs
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
 * @see {@link FilterTabsSkeleton} for loading state
 * @see {@link EngagementRequestType} for available tab values
 */
export default function FilterTabs({
  activeTab,
  onTabChange,
  className = "",
  customLabels = {}
}: FilterTabProps) {
  const labels = {
    [EngagementRequestType.ALL]: customLabels[EngagementRequestType.ALL] || "All Requests",
    [EngagementRequestType.HELP]: customLabels[EngagementRequestType.HELP] || "Help Requests",
    [EngagementRequestType.VOLUNTEER]: customLabels[EngagementRequestType.VOLUNTEER] || "Volunteers Needed",
    [EngagementRequestType.DONATION]: customLabels[EngagementRequestType.DONATION] || "Donations",
    [EngagementRequestType.QUESTION]: customLabels[EngagementRequestType.QUESTION] || "Questions"
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={className}>
      <TabsList className="bg-secondary/10 dark:bg-secondary/20 p-1 rounded-md border border-secondary/30 dark:border-secondary/60">
        <TabsTrigger value={EngagementRequestType.ALL}>{labels[EngagementRequestType.ALL]}</TabsTrigger>
        <TabsTrigger value={EngagementRequestType.HELP}>{labels[EngagementRequestType.HELP]}</TabsTrigger>
        <TabsTrigger value={EngagementRequestType.VOLUNTEER}>{labels[EngagementRequestType.VOLUNTEER]}</TabsTrigger>
        <TabsTrigger value={EngagementRequestType.DONATION}>{labels[EngagementRequestType.DONATION]}</TabsTrigger>
        <TabsTrigger value={EngagementRequestType.QUESTION}>{labels[EngagementRequestType.QUESTION]}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

