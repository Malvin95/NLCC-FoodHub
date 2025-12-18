import { StatCard } from "../../atoms/stat-card/stat-card";
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { TrendChart } from "../../atoms/trend-chart/trend-chart";
import UpcomingEvents from "../../molecules/upcoming-events/upcoming-events";
import InventoryStatusBar from "../../molecules/inventory-status-bar/inventory-status-bar";
import { mockInventoryItems, mockStatCards } from "./_mock-data_";

/**
 * OverviewDashboard composes key dashboard widgets into the shared page template.
 *
 * Features:
 * - Renders four stat cards for headline metrics
 * - Displays the trend chart for recent performance
 * - Shows upcoming events list with mock data
 * - Includes inventory status bar with sample items
 * - Uses the `DashboardPageTemplate` for consistent layout and spacing
 *
 * Usage:
 * Ideal as the main landing dashboard page. Replace mock values with live data
 * when integrating with APIs.
 *
 * Accessibility:
 * - Relies on child components for semantic headings, ARIA labels, and region roles
 */
export default function OverviewDashboard() {
  return (
    <DashboardPageTemplate
      title="Overview"
      description="A summary of key metrics and recent activities."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStatCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            trend={card.trend}
            icon={card.icon}
            color={card.color}
            iconLabel={card.iconLabel}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="mb-8">
        <TrendChart />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <UpcomingEvents />
        <div>detailed Content Feed will go here</div>
      </div>

      {/* Inventory Status Bar */}
      <InventoryStatusBar items={mockInventoryItems} />
    </DashboardPageTemplate>
  );
}
