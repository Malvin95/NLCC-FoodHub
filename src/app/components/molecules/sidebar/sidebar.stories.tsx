/**
 * Storybook stories for the `Sidebar` component.
 *
 * Configuration notes:
 * - Uses Next.js App Router emulation via `parameters.nextjs`.
 * - Sets `disableNavigation: true` by default to prevent link navigation in Storybook.
 * - Demonstrates active-state highlighting via `currentPathname`.
 * - Wrapped with SessionProvider decorator to support AuthButtons component.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "./sidebar";

/**
 * The Sidebar component provides navigation for the application with support for
 * mobile overlays, desktop collapse functionality, loading states, and smooth transitions.
 */
/**
 * Sidebar stories meta configuration.
 */
const meta = {
  title: "Molecules/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/dashboard" },
    },
    docs: {
      description: {
        component:
          "A self-contained responsive sidebar navigation with internal open/close state. Desktop: always visible with collapse. Mobile: hamburger + overlay. Uses Next.js Link with prefetch and supports a testing-only currentPathname override.",
      },
    },
  },
  argTypes: {
    currentPathname: {
      control: "text",
      description: "Overrides the pathname for active-state showcasing",
    },
  },
  args: {
    disableNavigation: true,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

/**
 * Default state with overview path.
 */
export const Default: Story = {
  args: {
    currentPathname: "/dashboard",
  },
};

/**
 * Engagement active highlighting.
 */
export const EngagementActive: Story = {
  args: {
    currentPathname: "/dashboard/engagement",
  },
};

/**
 * Inventory active highlighting.
 */
export const InventoryActive: Story = {
  args: {
    currentPathname: "/dashboard/inventory",
  },
};

/**
 * Events active highlighting.
 */
export const EventsActive: Story = {
  args: {
    currentPathname: "/dashboard/events",
  },
};

/**
 * Volunteers active highlighting.
 */
export const VolunteersActive: Story = {
  args: {
    currentPathname: "/dashboard/volunteers",
  },
};

/**
 * History active highlighting.
 */
export const HistoryActive: Story = {
  args: {
    currentPathname: "/dashboard/history",
  },
};

/**
 * Loading state with skeleton placeholders.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    currentPathname: "/dashboard",
  },
};

// Mobile open/closed stories removed: open state is internal now
