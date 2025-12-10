import InventoryStatusCard, { InventoryItem } from "../../atoms/inventory-status-card/inventory-status-card";

/**
 * Props for the InventoryStatusBar component.
 */
interface InventoryStatusBarProps {
  /** Array of inventory items to display in the grid. */
  items: InventoryItem[];
}

/**
 * Container component that displays a responsive grid of inventory status cards.
 * 
 * Features:
 * - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
 * - Section heading with "Inventory Status" title
 * - Dynamic item count in ARIA label
 * - Empty state message when no items are provided
 * - Semantic HTML structure using section element
 * - Consistent spacing and styling
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 * 
 * Accessibility:
 * - Uses `<section>` landmark with `aria-labelledby`
 * - Heading has unique ID for proper ARIA association
 * - Grid region includes item count in `aria-label`
 * - Each child card maintains its own accessibility features
 * - Empty state provides clear feedback to screen readers
 * 
 * Layout:
 * - Mobile (< 768px): Single column
 * - Tablet (768px - 1024px): 2 columns
 * - Desktop (> 1024px): 3 columns
 * 
 * States:
 * - With items: Displays grid of inventory cards
 * - Empty (no items): Shows centered message "There are no inventory items being tracked at the moment"
 * 
 * @component
 * @param {InventoryStatusBarProps} props - Component props
 * @param {InventoryItem[]} props.items - Array of inventory items to display
 * 
 * @example
 * ```tsx
 * // With items
 * <InventoryStatusBar 
 *   items={[
 *     { id: 1, category: 'Canned Goods', current: 50, target: 100, unit: 'units', status: statusLevels.MEDIUM },
 *     { id: 2, category: 'Fresh Produce', current: 20, target: 80, unit: 'lbs', status: statusLevels.LOW },
 *   ]} 
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Empty state
 * <InventoryStatusBar items={[]} />
 * ```
 * 
 * @see {@link InventoryStatusBarSkeleton} for loading state
 * @see {@link InventoryStatusCard} for individual card component
 */
export default function InventoryStatusBar({ items }: InventoryStatusBarProps) {
    return (
        <section 
            className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
            aria-labelledby="inventory-status-heading"
        >
            <h2 id="inventory-status-heading" className="text-foreground font-medium mb-6">Inventory Status</h2>
            {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p>There are no inventory items being tracked at the moment</p>
                </div>
            ) : (
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    role="region"
                    aria-label={`Inventory items (${items.length} items)`}
                >
                    {items.map((item) => (
                        <InventoryStatusCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    );
}
