import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import MetricsDisplay from "./metrics-display";
import { MetricsDisplaySkeleton } from "./metrics-display.skeleton";
import { DayMetrics } from "../../pages/history-dashboard/history-dashboard";

/**
 * MetricsDisplay component shows daily volunteer activity metrics with
 * color-coded icons and accessible semantic markup.
 *
 * ## Features
 * - Four key metrics with distinct icons
 * - Activities list display
 * - Semantic HTML (dl/dt/dd)
 * - Full ARIA support
 * - Dark mode compatible
 */
const meta: Meta<typeof MetricsDisplay> = {
  title: "Molecules/MetricsDisplay",
  component: MetricsDisplay,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MetricsDisplay>;

/**
 * Sample data representing a typical volunteer day
 */
const sampleData: DayMetrics = {
  date: "2024-01-15",
  volunteers: 12,
  hours: 36,
  mealsDistributed: 250,
  familiesServed: 68,
  activities: ["Food Distribution", "Community Outreach", "Food Prep"],
};

/**
 * Default story showing typical daily metrics
 */
export const Default: Story = {
  args: sampleData,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify heading is rendered with formatted date
    const heading = canvas.getByRole("heading", { level: 2 });
    await expect(heading).toBeInTheDocument();
    await expect(heading.textContent).toContain("January");

    // Verify all four metrics are displayed
    const volunteers = canvas.getByText("Volunteers");
    const hours = canvas.getByText("Total Hours");
    const meals = canvas.getByText("Meals Distributed");
    const families = canvas.getByText("Families Served");

    await expect(volunteers).toBeInTheDocument();
    await expect(hours).toBeInTheDocument();
    await expect(meals).toBeInTheDocument();
    await expect(families).toBeInTheDocument();

    // Verify metric values
    await expect(canvas.getByText("12")).toBeInTheDocument();
    await expect(canvas.getByText("36")).toBeInTheDocument();
    await expect(canvas.getByText("250")).toBeInTheDocument();
    await expect(canvas.getByText("68")).toBeInTheDocument();

    // Verify activities are rendered
    const activitiesList = canvas.getByLabelText("Activities list");
    await expect(activitiesList).toBeInTheDocument();
    await expect(canvas.getByText("Food Distribution")).toBeInTheDocument();
    await expect(canvas.getByText("Community Outreach")).toBeInTheDocument();
  },
};

/**
 * High activity day with many volunteers and meals
 */
export const HighActivity: Story = {
  args: {
    date: "2024-03-20",
    volunteers: 25,
    hours: 75,
    mealsDistributed: 500,
    familiesServed: 150,
    activities: [
      "Food Distribution",
      "Community Outreach",
      "Food Prep",
      "Inventory Management",
      "Event Planning",
    ],
  },
};

/**
 * Low activity day with minimal metrics
 */
export const LowActivity: Story = {
  args: {
    date: "2024-02-10",
    volunteers: 3,
    hours: 8,
    mealsDistributed: 50,
    familiesServed: 15,
    activities: ["Food Distribution"],
  },
};

/**
 * Loading state skeleton
 */
export const Loading: Story = {
  render: () => <MetricsDisplaySkeleton />,
  play: async ({ canvasElement }) => {
    // Verify skeleton elements are present
    const pulseElements = canvasElement.querySelectorAll(".animate-pulse");
    await expect(pulseElements.length).toBeGreaterThan(0);
  },
};

/**
 * Interactive test: Verify semantic HTML structure
 */
export const VerifyAccessibility: Story = {
  args: sampleData,
  play: async ({ canvasElement }) => {
    // Check for definition list (dl) for metrics
    const definitionList = canvasElement.querySelector("dl");
    await expect(definitionList).toBeInTheDocument();

    // Check for dt (term) and dd (definition) elements
    const terms = canvasElement.querySelectorAll("dt");
    await expect(terms.length).toBe(4);

    const definitions = canvasElement.querySelectorAll("dd");
    await expect(definitions.length).toBe(4);

    // Verify activities use unordered list
    const activitiesList = canvasElement.querySelector(
      'ul[aria-label="Activities list"]',
    );
    await expect(activitiesList).toBeInTheDocument();

    // Verify list items for activities
    const listItems = activitiesList?.querySelectorAll("li");
    await expect(listItems?.length).toBe(3);
  },
};

/**
 * Interactive test: Verify all icons are decorative (aria-hidden)
 */
export const VerifyIconAccessibility: Story = {
  args: sampleData,
  play: async ({ canvasElement }) => {
    // Get all icon containers and SVGs
    const icons = canvasElement.querySelectorAll('svg[aria-hidden="true"]');
    await expect(icons.length).toBe(4); // 4 metric icons

    // Verify icon wrappers also have aria-hidden
    const iconWrappers = canvasElement.querySelectorAll(
      'div[aria-hidden="true"]',
    );
    await expect(iconWrappers.length).toBeGreaterThanOrEqual(4);
  },
};

/**
 * Dark mode preview
 */
export const DarkMode: Story = {
  args: sampleData,
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="bg-slate-950 p-6 rounded-lg">
          <Story />
        </div>
      </div>
    ),
  ],
};
