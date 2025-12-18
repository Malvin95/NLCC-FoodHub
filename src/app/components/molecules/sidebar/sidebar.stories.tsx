import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Sidebar } from "./sidebar";
import { View } from "@/app/shared/enums";

/**
 * The Sidebar component provides navigation for the application with support for
 * mobile overlays, desktop collapse functionality, loading states, and smooth transitions.
 */
const meta = {
  title: "Molecules/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A responsive sidebar navigation component with collapsible desktop view, mobile overlay, loading states, and non-blocking transitions using React's useTransition hook. Features full dark mode support with theme-aware colors, shadows, and smooth transitions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentView: {
      control: "select",
      options: Object.values(View),
      description: "The currently active view in the application",
    },
    isOpen: {
      control: "boolean",
      description:
        "Controls whether the sidebar is open (primarily for mobile)",
    },
    isLoading: {
      control: "boolean",
      description: "Shows skeleton loading state when true",
    },
    onViewChange: {
      action: "view-changed",
      description: "Callback fired when a menu item is clicked",
    },
    onClose: {
      action: "closed",
      description: "Callback fired when the sidebar should close",
    },
  },
  args: {
    onViewChange: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sidebar state - open on mobile, showing the dashboard view
 */
export const Default: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
};

/**
 * Loading state displays skeleton placeholders for menu items
 */
export const Loading: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: true,
  },
};

/**
 * Different active views - Engagement Board selected
 */
export const EngagementView: Story = {
  args: {
    currentView: View.ENGAGEMENT,
    isOpen: true,
    isLoading: false,
  },
};

/**
 * Different active views - Inventory selected
 */
export const InventoryView: Story = {
  args: {
    currentView: View.INVENTORY,
    isOpen: true,
    isLoading: false,
  },
};

/**
 * Different active views - Events selected
 */
export const EventsView: Story = {
  args: {
    currentView: View.EVENTS,
    isOpen: true,
    isLoading: false,
  },
};

/**
 * Different active views - Volunteers selected
 */
export const VolunteersView: Story = {
  args: {
    currentView: View.VOLUNTEERS,
    isOpen: true,
    isLoading: false,
  },
};

/**
 * Different active views - History selected
 */
export const HistoryView: Story = {
  args: {
    currentView: View.HISTORY,
    isOpen: true,
    isLoading: false,
  },
};

/**
 * Mobile closed state - sidebar is hidden
 */
export const MobileClosed: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: false,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Mobile open state with overlay
 */
export const MobileOpen: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Interactive test: Clicking menu items triggers view change
 */
export const ClickMenuItem: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find and click the Inventory menu item
    const inventoryButton = canvas.getByRole("button", { name: /inventory/i });
    await userEvent.click(inventoryButton);

    // Verify the callback was called with the correct view
    await expect(args.onViewChange).toHaveBeenCalledWith(View.INVENTORY);
  },
};

/**
 * Interactive test: Clicking close button on mobile
 */
export const ClickCloseButton: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find and click the close button
    const closeButton = canvas.getByLabelText(/close menu/i);
    await userEvent.click(closeButton);

    // Verify the callback was called
    await expect(args.onClose).toHaveBeenCalled();
  },
};

/**
 * Interactive test: Clicking collapse toggle on desktop
 */
export const ClickCollapseToggle: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the collapse button (it should be "Collapse sidebar" initially)
    const collapseButton = canvas.getByLabelText(/collapse sidebar/i);
    await userEvent.click(collapseButton);

    // After clicking, it should change to "Expand sidebar"
    const expandButton = await canvas.findByLabelText(/expand sidebar/i);
    await expect(expandButton).toBeInTheDocument();
  },
};

/**
 * Interactive test: Verify all menu items are present
 */
export const VerifyAllMenuItems: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all menu items exist
    await expect(
      canvas.getByRole("button", { name: /dashboard/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /engagement board/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /inventory/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /events/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /volunteers/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: /volunteer history/i }),
    ).toBeInTheDocument();
  },
};

/**
 * Interactive test: Verify active state styling
 */
export const VerifyActiveState: Story = {
  args: {
    currentView: View.ENGAGEMENT,
    isOpen: true,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the active button (Engagement Board)
    const activeButton = canvas.getByRole("button", {
      name: /engagement board/i,
    });

    // Verify it has the active styling classes
    await expect(activeButton).toHaveClass(/bg-rose-50/);
    await expect(activeButton).toHaveClass(/text-rose-600/);
  },
};

/**
 * Interactive test: Verify loading skeleton appears
 */
export const VerifyLoadingSkeleton: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // In loading state, buttons should not be present
    const buttons = canvas.queryAllByRole("button", {
      name: /dashboard|inventory|events/i,
    });
    await expect(buttons.length).toBe(0);

    // Skeleton elements should be present (with animate-pulse class)
    const skeletons = canvasElement.querySelectorAll(".animate-pulse");
    await expect(skeletons.length).toBeGreaterThan(0);
  },
};

/**
 * Accessibility test: Keyboard navigation
 */
export const KeyboardNavigation: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Tab to the first menu item
    const dashboardButton = canvas.getByRole("button", { name: /dashboard/i });
    dashboardButton.focus();
    await expect(dashboardButton).toHaveFocus();

    // Press Enter to activate
    await userEvent.keyboard("{Enter}");
    await expect(args.onViewChange).toHaveBeenCalledWith(View.DASHBOARD);
  },
};

/**
 * Accessibility test: ARIA labels are present
 */
export const VerifyAriaLabels: Story = {
  args: {
    currentView: View.DASHBOARD,
    isOpen: true,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify close button has aria-label
    const closeButton = canvas.getByLabelText(/close menu/i);
    await expect(closeButton).toBeInTheDocument();

    // Verify collapse button has aria-label
    const collapseButton = canvas.getByLabelText(/collapse sidebar/i);
    await expect(collapseButton).toBeInTheDocument();
  },
};
