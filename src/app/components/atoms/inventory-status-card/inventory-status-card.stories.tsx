import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import InventoryStatusCard, { InventoryItem } from "./inventory-status-card";
import InventoryStatusCardSkeleton from "./inventory-status-card-skeleton";
import { StatusLevels } from "@/app/shared/enums";

const meta: Meta<typeof InventoryStatusCard> = {
  title: "Atoms/InventoryStatusCard",
  component: InventoryStatusCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays an inventory item with current vs target levels, status pill, and progress bar. Features full dark mode support with theme-aware colors, shadows, and smooth transitions.",
      },
    },
  },
  argTypes: {
    category: {
      control: "text",
      description: "Label describing the inventory category",
    },
    id: {
      control: "number",
      description: "Unique identifier for the inventory item",
    },
    current: { control: "number", description: "Current quantity on hand" },
    target: { control: "number", description: "Target quantity to reach" },
    unit: {
      control: "text",
      description: "Unit of measurement (e.g., lbs, units)",
    },
    status: {
      control: { type: "select" },
      options: Object.values(StatusLevels),
      description:
        "Status level describing how close the item is to its target",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InventoryStatusCard>;
type SkeletonStory = StoryObj<typeof InventoryStatusCardSkeleton>;

const baseItem: InventoryItem = {
  id: 1,
  category: "Canned Goods",
  current: 50,
  target: 100,
  unit: "units",
  status: StatusLevels.MEDIUM,
};

export const Default: Story = {
  args: baseItem,
};

export const StructureTest: Story = {
  args: baseItem,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Title and status pill present
    await expect(canvas.getByText(baseItem.category)).toBeInTheDocument();
    await expect(canvas.getByText(baseItem.status)).toBeInTheDocument();

    // Current and target values rendered with units
    await expect(canvas.getByText(/50 units/)).toBeInTheDocument();
    await expect(canvas.getByText(/100 units/)).toBeInTheDocument();

    // Progress width reflects percentage (50%)
    const bar = canvasElement.querySelector('div[style*="width: 50%"]');
    await expect(bar).toBeInTheDocument();
  },
};

export const OverTargetCappingTest: Story = {
  args: {
    ...baseItem,
    id: 6,
    current: 150,
    target: 100,
    status: StatusLevels.GOOD,
  },
  play: async ({ canvasElement }) => {
    // Width should be capped at 100%
    const bar = canvasElement.querySelector('div[style*="width: 100%"]');
    await expect(bar).toBeInTheDocument();
  },
};

export const Skeleton: SkeletonStory = {
  render: () => <InventoryStatusCardSkeleton />,
  parameters: {
    docs: {
      description: {
        story: "Skeleton loader mirroring the InventoryStatusCard layout.",
      },
    },
  },
};

export const SkeletonTest: SkeletonStory = {
  render: () => <InventoryStatusCardSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check structure and accessibility
    const skeleton = canvasElement.querySelector('[role="status"]');
    await expect(skeleton).toBeInTheDocument();
    await expect(skeleton).toHaveAttribute(
      "aria-label",
      "Loading inventory item status",
    );

    // Check for screen reader text and animated elements
    const srText = canvas.getByText("Loading inventory item status...");
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain("sr-only");

    const blocks = canvasElement.querySelectorAll(
      ".animate-pulse .bg-gray-200",
    );
    await expect(blocks.length).toBeGreaterThan(0);
  },
};

export const AccessibilityTest: Story = {
  args: baseItem,
  play: async ({ canvasElement }) => {
    // Article element with aria-labelledby
    const article = canvasElement.querySelector("article");
    await expect(article).toBeInTheDocument();
    await expect(article).toHaveAttribute(
      "aria-labelledby",
      `inventory-item-${baseItem.id}`,
    );

    // Heading with matching ID
    const heading = canvasElement.querySelector(
      `#inventory-item-${baseItem.id}`,
    );
    await expect(heading).toBeInTheDocument();
    await expect(heading?.tagName).toBe("H3");

    // Status pill with aria-label
    const statusPill = canvasElement.querySelector(
      `[aria-label="Status: ${baseItem.status}"]`,
    );
    await expect(statusPill).toBeInTheDocument();

    // Progress bar with all ARIA attributes
    const progressBar = canvasElement.querySelector('[role="progressbar"]');
    await expect(progressBar).toBeInTheDocument();
    await expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    await expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    await expect(progressBar).toHaveAttribute("aria-valuemax", "100");

    // Verify progress bar label
    const label = progressBar?.getAttribute("aria-label");
    await expect(label).toMatch(/Inventory progress/);
  },
};
