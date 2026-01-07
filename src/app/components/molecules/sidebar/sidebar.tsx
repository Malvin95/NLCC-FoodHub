"use client";
import { View } from "@/app/shared/enums";
import { MenuItem } from "@/app/shared/types";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Calendar,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  History,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarSkeleton } from "./sidebar.skeleton";
import { useMediaQuery } from "usehooks-ts";
import AuthButtons from "../../atoms/auth-button/auth-buttons";

/**
 * Props for the `Sidebar` component.
 *
 * The sidebar supports responsive behaviors (mobile overlay, desktop collapse),
 * active-state highlighting based on the current pathname, optional loading skeletons,
 * and optional custom menu configuration for different contexts (e.g., tests or demos).
 */
interface SidebarProps {
  isLoading?: boolean;
  /** Optional pathname override (useful for Storybook active-state showcases) */
  currentPathname?: string;
  /** Optional override for the menu items; falls back to defaults */
  items?: MenuItem[];
  /** When true, clicking a menu item will not navigate (useful for Storybook/tests) */
  disableNavigation?: boolean;
}

/**
 * Default menu items displayed in the sidebar navigation.
 * Consumers can provide `items` via props to override or extend these.
 */
const defaultMenuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    exactMatch: true,
  },
  {
    label: "Engagement Board",
    icon: MessageSquare,
    href: "/dashboard/engagement",
  },
  {
    label: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
  },
  {
    label: "Events",
    icon: Calendar,
    href: "/dashboard/events",
  },
  {
    label: "Volunteers",
    icon: Users,
    href: "/dashboard/volunteers",
  },
  {
    label: "Volunteer History",
    icon: History,
    href: "/dashboard/history",
  },
];

/**
 * Sidebar component that provides application navigation.
 *
 * Features:
 * - Responsive: mobile overlay + desktop collapse/expand toggle.
 * - Link-based navigation with active-state derived from pathname.
 * - Optional loading skeleton via `isLoading`.
 * - Optional custom menu items via `items`.
 * - Optional `disableNavigation` to block link navigation under test conditions.
 * - Dark mode-friendly styles and smooth transitions.
 *
 * @param props Component props.
 * @returns The rendered sidebar component.
 *
 * @example
 * // Basic usage
 * <Sidebar isLoading={false} />
 *
 * @example
 * // With custom menu and non-navigating links (e.g., Storybook)
 * <Sidebar
 *   currentPathname="/team"
 *   items={[
 *     { view: View.DASHBOARD, label: "Home", icon: LayoutDashboard, href: "/home" },
 *     { view: View.VOLUNTEERS, label: "Team", icon: Users, href: "/team" },
 *   ]}
 *   disableNavigation
 * />
 */
export function Sidebar({
  isLoading = false,
  currentPathname,
  items,
  disableNavigation = false,
}: SidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathFromRouter = usePathname();
  const pathname = currentPathname ?? pathFromRouter;
  const [isOpen, setIsOpen] = useState(isDesktop);

  // Sync a shared CSS custom property so layouts can offset content when the sidebar collapses/expands on desktop
  useEffect(() => {
    const width = isCollapsed ? "5rem" : "16rem"; // matches lg:w-20 vs lg:w-64
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [isCollapsed]);

  const onClose = () => setIsOpen(false);
  const menuItems = items ?? defaultMenuItems;

  // External loading state only; navigation handled by Next Link
  const showLoadingState = isLoading;

  const isActivePathname = (href: string, exactMatch?: boolean) => {
    try {
      if (exactMatch) {
        return pathname === href;
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    } catch (error) {
      console.error("Failed to determine active route", error);
      return false;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden transition-colors"
          onClick={onClose}
        />
      )}

      {/* Mobile open menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="sticky top-5 left-2 lg:hidden p-4 text-foreground rounded bg-white hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 h-screen bg-card dark:bg-slate-950 border-r border-border dark:border-slate-800 z-50 shadow-sm dark:shadow-md
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          w-64
        `}
      >
        {/* Mobile Close Button */}
        {!isOpen && (
          <div
            className={`lg:hidden flex justify-end p-4 transition-opacity duration-300 delay-100 ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent dark:hover:bg-slate-800 text-muted-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <div
          className={`hidden lg:flex justify-end p-4 transition-opacity duration-300 delay-100 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent dark:hover:bg-slate-800 text-muted-foreground transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative px-4 pb-4 top-16 lg:top-0">
          <div
            className={`space-y-1 transition-opacity duration-300 delay-100 ${isOpen ? "opacity-100" : "opacity-0"}`}
            aria-hidden={!isOpen}
          >
            {showLoadingState ? (
              <SidebarSkeleton isCollapsed={isCollapsed} />
            ) : (
              menuItems.map((item: MenuItem) => {
                const Icon = item.icon;
                const isActive = isActivePathname(item.href, item.exactMatch);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={(event) => {
                      if (disableNavigation) {
                        event.preventDefault();
                        event.stopPropagation();
                      }
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                        w-full flex text-nowrap items-center gap-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive ? "bg-(--highlight) dark:bg-(--highlight) text-(--highlight-foreground) dark:text-(--highlight-foreground)" : "text-foreground hover:bg-accent dark:hover:bg-slate-800"}
                        ${isCollapsed ? "lg:justify-center" : ""}
                      `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className={`${isCollapsed ? "lg:hidden" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-border dark:border-slate-800">
          <AuthButtons />
        </div>
      </aside>
    </>
  );
}
