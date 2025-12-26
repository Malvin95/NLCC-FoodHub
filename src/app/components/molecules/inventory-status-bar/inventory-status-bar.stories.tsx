import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";
import InventoryStatusBar from "./inventory-status-bar";
import InventoryStatusBarSkeleton from "./inventory-status-bar-skeleton";
import type { InventoryItem } from "../../atoms/inventory-status-card/inventory-status-card";
import { StatusLevels } from "@/app/shared/enums";
import { mockInventoryItems } from "../../pages/overview-dashboard/_mock-data_";

const meta: Meta<typeof InventoryStatusBar> = {
  title: "Molecules/InventoryStatusBar",
  component: InventoryStatusBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays a grid of InventoryStatusCard components summarizing inventory levels. Features full dark mode support with theme-aware colors, shadows, and smooth transitions.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InventoryStatusBar>;
type SkeletonStory = StoryObj<typeof InventoryStatusBarSkeleton>;

const mockItems: InventoryItem[] = mockInventoryItems;

export const Default: Story = {
  render: () => <InventoryStatusBar items={mockItems} />,
};

export const DenseGrid: Story = {
  render: () => (
    <InventoryStatusBar
      items={[
        ...mockItems,
        {
          id: 5,
          category: "Beverages",
          current: 75,
          target: 120,
          unit: "bottles",
          status: StatusLevels.MEDIUM,
        },
        {
          id: 6,
          category: "Snacks",
          current: 150,
          target: 100,
          unit: "units",
          status: StatusLevels.GOOD,
        },
        {
          id: 7,
          category: "Frozen",
          current: 30,
          target: 60,
          unit: "packs",
          status: StatusLevels.LOW,
        },
      ]}
    />
  ),
};

export const StructureTest: Story = {
  render: () => <InventoryStatusBar items={mockItems} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Heading present
    await expect(canvas.getByText("Inventory Status")).toBeInTheDocument();

    // Correct number of cards
    const cards = canvasElement.querySelectorAll(".grid > article");
    await expect(cards.length).toBe(mockItems.length);
  },
};

export const GridLayoutTest: Story = {
  render: () => <InventoryStatusBar items={mockItems} />,
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector(".grid");
    await expect(grid).toBeInTheDocument();
    await expect(grid?.className).toContain("md:grid-cols-2");
    await expect(grid?.className).toContain("lg:grid-cols-3");
  },
};

export const Skeleton: SkeletonStory = {
  render: () => <InventoryStatusBarSkeleton count={3} />,
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton loader mirroring the InventoryStatusBar layout with three placeholder cards.",
      },
    },
  },
};

export const SkeletonStructureTest: SkeletonStory = {
  render: () => <InventoryStatusBarSkeleton count={3} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for role and aria-label for accessibility
    const skeleton = canvasElement.querySelector('[role="status"]');
    await expect(skeleton).toBeInTheDocument();
    await expect(skeleton).toHaveAttribute(
      "aria-label",
      "Loading inventory status"
    );

    // Check for screen reader text
    const srText = canvas.getByText("Loading inventory status...");
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain("sr-only");

    // Title stub should be present
    const titleStub = canvasElement.querySelector(".h-6.w-40");
    await expect(titleStub).toBeInTheDocument();

    // Should have correct number of card placeholders
    const placeholders = canvasElement.querySelectorAll(".grid > div");
    await expect(placeholders.length).toBe(3);
  },
};

export const SkeletonCustomCountTest: SkeletonStory = {
  render: () => <InventoryStatusBarSkeleton count={6} />,
  play: async ({ canvasElement }) => {
    // Should render custom count of placeholders
    const placeholders = canvasElement.querySelectorAll(".grid > div");
    await expect(placeholders.length).toBe(6);
  },
};

export const AccessibilityTest: Story = {
  render: () => <InventoryStatusBar items={mockItems} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Section with aria-labelledby
    const section = canvasElement.querySelector("section");
    await expect(section).toBeInTheDocument();
    await expect(section).toHaveAttribute(
      "aria-labelledby",
      "inventory-status-heading"
    );

    // Heading with matching ID
    const heading = canvasElement.querySelector("#inventory-status-heading");
    await expect(heading).toBeInTheDocument();
    await expect(heading?.tagName).toBe("H2");
    await expect(canvas.getByText("Inventory Status")).toBeInTheDocument();
  },
};

export const GridAccessibilityTest: Story = {
  render: () => <InventoryStatusBar items={mockItems} />,
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector('[role="region"]');

    // Grid should have region role and aria-label with item count
    await expect(grid).toBeInTheDocument();
    await expect(grid).toHaveAttribute(
      "aria-label",
      `Inventory items (${mockItems.length} items)`
    );
  },
};

export const SemanticStructureTest: Story = {
  render: () => <InventoryStatusBar items={mockItems} />,
  play: async ({ canvasElement }) => {
    // Should use section for landmark
    const section = canvasElement.querySelector("section");
    await expect(section).toBeInTheDocument();

    // All items should be articles
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBe(mockItems.length);

    // Each article should have aria-labelledby
    articles.forEach((article, idx) => {
      expect(article).toHaveAttribute(
        "aria-labelledby",
        `inventory-item-${mockItems[idx].id}`
      );
    });
  },
};

export const EmptyState: Story = {
  render: () => <InventoryStatusBar items={[]} />,
  parameters: {
    docs: {
      description: {
        story:
          "Displays an empty state message when no inventory items are provided.",
      },
    },
  },
};

export const EmptyStateTest: Story = {
  render: () => <InventoryStatusBar items={[]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Heading should still be present
    await expect(canvas.getByText("Inventory Status")).toBeInTheDocument();

    // Empty state message should be displayed
    await expect(
      canvas.getByText(
        "There are no inventory items being tracked at the moment"
      )
    ).toBeInTheDocument();

    // Grid should not be present
    const grid = canvasElement.querySelector(".grid");
    await expect(grid).not.toBeInTheDocument();

    // No article elements should exist
    const articles = canvasElement.querySelectorAll("article");
    await expect(articles.length).toBe(0);
  },
};
