/**
 * InventoryDashboard page component
 *
 * Renders the inventory management overview page using the shared dashboard template
 * and the InventoryStatusBar component. Provides a simple wrapper that supplies the page
 * title/description and delegates inventory grid rendering to the InventoryStatusBar molecule.
 *
 * Accessibility:
 * - Uses semantic page structure via DashboardPageTemplate (h1 title, h2 section headings)
 * - Inventory grid maintains proper ARIA landmarks with region role and aria-label
 * - Each inventory item is an article landmark with proper heading hierarchy
 * - Empty state messaging is clear and role="status" when no items exist
 * - Full keyboard navigation support through semantic HTML
 * - Dark mode support maintains sufficient color contrast
 *
 * Layout:
 * - Header/description provided by DashboardPageTemplate
 * - Inventory status grid rendered via InventoryStatusBar (mock data by default)
 *
 * Features:
 * - Responsive inventory item grid display (1 col mobile → 3 col desktop)
 * - Mock data support with real data integration ready
 * - Full dark mode support with theme-aware colors
 * - Consistent page structure across all dashboards
 *
 * @component
 * @since 1.0.0
 * @file inventory-dashboard.tsx
 * @returns {JSX.Element} The rendered inventory dashboard page
 *
 * @example
 * ```tsx
 * // Basic usage with mock data
 * <InventoryDashboard />
 * ```
 *
 * @see {@link InventoryStatusBar} for the inventory grid component
 * @see {@link DashboardPageTemplate} for the page layout template
 * @see {@link InventoryDashboardSkeleton} for the loading state
 */
import InventoryStatusBar from "../../molecules/inventory-status-bar/inventory-status-bar";
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { mockInventoryItems } from "../overview-dashboard/_mock-data_";

export default function InventoryDashboard() {
  return (
    <DashboardPageTemplate
      title={"Inventory Management"}
      description={"Overview of current inventory status and metrics"}
    >
      <InventoryStatusBar items={mockInventoryItems} />
    </DashboardPageTemplate>
  );
}
