import { View } from '@/app/shared/enums';
import { MenuItem } from '@/app/shared/types';
import { LayoutDashboard, MessageSquare, Package, Calendar, Users, X, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { useState } from 'react';

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
 * />
 * ```
 */
export function Sidebar({ currentView, onViewChange, isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 z-50
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
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
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
            {menuItems.map((item: MenuItem) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive ? 'bg-rose-50 text-rose-600' : 'text-gray-700 hover:bg-gray-50'}
                    ${isCollapsed ? 'lg:justify-center' : ''}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className={`${isCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
