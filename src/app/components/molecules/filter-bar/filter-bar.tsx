import { DEFAULT_FILTER_LABELS, FILTER_TYPES } from "@/app/shared/config";
import { Button } from "../../atoms/button/button";

export interface FilterBarProps {
  /** Currently selected filter value, matches an EngagementRequestType enum value */
  activeTab?: string;
  /** Callback invoked when a filter button is clicked, receives the selected filter type */
  onFilterChange?: (value: string) => void;
  /** Optional custom label overrides, merged with default filter labels */
  customLabels?: Record<string, string>;
}

/**
 * FilterBar component displays engagement request types as a button-based filter group
 * 
 * Provides an accessible, customizable set of filter buttons for toggling between different
 * engagement request types. Uses native HTML buttons for maximum accessibility and relies on
 * the shared config for consistent labeling across the application.
 * 
 * Features:
 * - Five filter buttons (All, Help, Volunteer, Donation, Question) backed by EngagementRequestType
 * - Visual feedback via button variants (secondary for active, outline for inactive)
 * - ARIA pressed state for assistive technology compatibility
 * - Fully customizable labels with fallback to defaults
 * - Dark mode support with theme-aware styling
 * - Responsive flex layout that wraps on smaller screens
 * 
 * Accessibility:
 * - Semantic HTML `<button>` elements with proper `type="button"`
 * - `role="group"` wrapper with descriptive `aria-label`
 * - `aria-pressed` attribute to indicate active filter state
 * - Keyboard operable by default (Tab, Enter, Space)
 * - Works seamlessly with screen readers
 * 
 * @component
 * @param {FilterBarProps} props - Component props
 * @returns {JSX.Element} A flex container with semantic filter buttons
 * 
 * @example
 * ```tsx
 * // Controlled filter with state
 * const [activeFilter, setActiveFilter] = useState(EngagementRequestType.ALL);
 * 
 * <FilterBar
 *   activeTab={activeFilter}
 *   onFilterChange={setActiveFilter}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom labels
 * <FilterBar
 *   activeTab={activeFilter}
 *   onFilterChange={setActiveFilter}
 *   customLabels={{
 *     [EngagementRequestType.ALL]: 'Show All',
 *     [EngagementRequestType.HELP]: 'Help Needed',
 *   }}
 * />
 * ```
 * 
 * @see {@link FilterBarSkeleton} - Loading skeleton placeholder
 * @see {@link DEFAULT_FILTER_LABELS} - Default filter label configuration
 * @see {@link FILTER_TYPES} - Supported filter type constants
 */

export default function FilterBar({
  activeTab,
  onFilterChange: onTabChange,
  customLabels = {}
}: FilterBarProps) {
  const labels = {
    ...DEFAULT_FILTER_LABELS,
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

