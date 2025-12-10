import { View } from '@/app/shared/enums';
import { MenuItem } from '@/app/shared/types';
import { LayoutDashboard, MessageSquare, Package, Calendar, Users, X, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { useState, useTransition } from 'react';

/**
 * Props for the Sidebar component
 * @interface SidebarProps
 */
interface SidebarProps {
  /** The currently active view */
  currentView: View;
  /** Callback function triggered when a different view is selected */
  onViewChange: (view: View) => void;
  /** Whether the sidebar is open (primarily for mobile) */
  isOpen: boolean;
  /** Callback function to close the sidebar */
  onClose: () => void;
  /** Whether the sidebar is in a loading state */
  isLoading?: boolean;
}

/**
 * Array of menu items displayed in the sidebar navigation
 * @constant
 */
const menuItems: MenuItem[] = [
  { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { id: View.ENGAGEMENT, label: 'Engagement Board', icon: MessageSquare },
  { id: View.INVENTORY, label: 'Inventory', icon: Package },
  { id: View.EVENTS, label: 'Events', icon: Calendar },
  { id: View.VOLUNTEERS, label: 'Volunteers', icon: Users },
  { id: View.HISTORY, label: 'Volunteer History', icon: History },
];

/**
 * Sidebar component that provides navigation for the application
 * 
 * Features:
 * - Responsive design with mobile overlay and desktop collapse functionality
 * - Displays navigation menu items with icons and labels
 * - Highlights the currently active view
 * - Can be toggled open/closed on mobile devices
 * - Can be collapsed/expanded on desktop devices
 * - Loading state with skeleton placeholders
 * - Non-blocking transitions using React's useTransition for smooth navigation
 * - Prevents UI freezes during view changes
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 * 
 * @component
 * @param {SidebarProps} props - Component props
 * @returns {JSX.Element} The rendered sidebar component
 * 
 * @example
 * ```tsx
 * <Sidebar
 *   currentView={View.DASHBOARD}
 *   onViewChange={(view) => setCurrentView(view)}
 *   isOpen={isSidebarOpen}
 *   onClose={() => setIsSidebarOpen(false)}
 *   isLoading={false}
 * />
 * ```
 */
export function Sidebar({ currentView, onViewChange, isOpen, onClose, isLoading = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPending, startTransition] = useTransition();

  /**
   * Handles view change with transition to prevent blocking UI updates
   * @param view - The view to navigate to
   */
  const handleViewChange = (view: View) => {
    startTransition(() => {
      onViewChange(view);
    });
  };

  // Combine external loading state with internal transition state
  const showLoadingState = isLoading || isPending;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden transition-colors"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 h-screen bg-card dark:bg-slate-950 border-r border-border dark:border-slate-800 z-50 shadow-sm dark:shadow-md
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent dark:hover:bg-slate-800 text-muted-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent dark:hover:bg-slate-800 text-muted-foreground transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-4">
          <div className="space-y-1">
            {showLoadingState ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    ${isCollapsed ? 'lg:justify-center' : ''}
                  `}
                >
                  <div className="w-5 h-5 bg-gray-200 dark:bg-slate-700 rounded animate-pulse shrink-0" />
                  <div className={`h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse flex-1 ${isCollapsed ? 'lg:hidden' : ''}`} />
                </div>
              ))
            ) : (
              menuItems.map((item: MenuItem) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleViewChange(item.id)}
                    disabled={isPending}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400' : 'text-foreground hover:bg-accent dark:hover:bg-slate-800'}
                      ${isCollapsed ? 'lg:justify-center' : ''}
                      ${isPending ? 'opacity-50 cursor-wait' : ''}
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className={`${isCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
