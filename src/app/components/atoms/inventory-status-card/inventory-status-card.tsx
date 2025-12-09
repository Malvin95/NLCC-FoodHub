import { StatusLevels } from "@/app/shared/enums";

/**
 * Represents a single inventory item with current vs target levels.
 */
export interface InventoryItem {
    /** Unique identifier for the inventory item. */
    id: number;
    /** Category or name of the inventory item (e.g., "Canned Goods"). */
    category: string;
    /** Current quantity on hand. */
    current: number;
    /** Target quantity to reach. */
    target: number;
    /** Unit of measurement (e.g., "lbs", "units"). */
    unit: string;
    /** Status level describing how close the item is to its target. */
    status: StatusLevels;
}

// Tailwind color tokens for the status pill and progress bar.
const statusColors = {
  low: 'bg-red-500',
  medium: 'bg-yellow-500',
  good: 'bg-green-500',
};

// Subtle background fills for the card container.
const statusBgColors = {
  low: 'bg-red-50 dark:bg-red-950/20',
  medium: 'bg-yellow-50 dark:bg-yellow-950/20',
  good: 'bg-green-50 dark:bg-green-950/20',
};

/**
 * Card component that visualizes an inventory item's status with current vs target levels.
 * 
 * Features:
 * - Visual progress bar showing percentage of target reached
 * - Color-coded status indicators (red/yellow/green for low/medium/good)
 * - Semantic HTML structure using article element
 * - Current and target quantities with units
 * - Percentage calculation with display
 * - Progress bar capped at 100% to prevent visual overflow
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 * 
 * Accessibility:
 * - Uses `<article>` element with `aria-labelledby` for semantic structure
 * - Progress bar has `role="progressbar"` with full ARIA attributes
 * - Status pill includes `aria-label` for screen readers
 * - Quantity spans have descriptive `aria-label` attributes
 * - Percentage text uses `aria-live="polite"` for dynamic updates
 * - Color contrast meets WCAG AA standards
 * 
 * @component
 * @param {Object} props - Component props
 * @param {InventoryItem} props.item - The inventory item data to display
 * 
 * @example
 * ```tsx
 * <InventoryStatusCard 
 *   item={{
 *     id: 1,
 *     category: 'Canned Goods',
 *     current: 50,
 *     target: 100,
 *     unit: 'units',
 *     status: statusLevels.MEDIUM
 *   }} 
 * />
 * ```
 * 
 * @see {@link InventoryStatusCardSkeleton} for loading state
 * @see {@link InventoryItem} for the data interface
 */
export default function InventoryStatusCard({ item }: { item: InventoryItem }) {
    const percentage = item.target > 0 ? (item.current / item.target) * 100 : 0;
    const percentageLabel = `${percentage.toFixed(0)}% of target`;
    
    return (
        <article
            className={`p-4 rounded-lg border border-border dark:border-slate-800 shadow-sm dark:shadow-md transition-colors ${statusBgColors[item.status]}`}
            aria-labelledby={`inventory-item-${item.id}`}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 id={`inventory-item-${item.id}`} className="text-foreground dark:text-foreground font-medium">{item.category}</h3>
                <span 
                    className={`px-2 py-1 rounded text-white text-xs font-medium ${statusColors[item.status]}`}
                    aria-label={`Status: ${item.status}`}
                >
                    {item.status}
                </span>
            </div>
            <div className="mb-2">
                <div className="flex justify-between text-sm text-muted-foreground dark:text-muted-foreground mb-1">
                    <span aria-label={`Current: ${item.current} ${item.unit}`}>{item.current} {item.unit}</span>
                    <span aria-label={`Target: ${item.target} ${item.unit}`}>{item.target} {item.unit}</span>
                </div>
                <div 
                    className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2"
                    role="progressbar"
                    aria-valuenow={Math.min(percentage, 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Inventory progress: ${percentageLabel}`}
                >
                    <div
                        className={`h-2 rounded-full ${statusColors[item.status]}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground" aria-live="polite">
                {percentageLabel}
            </p>
        </article>
    );
}
