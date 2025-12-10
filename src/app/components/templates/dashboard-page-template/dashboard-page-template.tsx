
/**
 * Props for the DashboardPageTemplate component.
 */
interface DashboardPageTemplateProps {
  /** React children to render in the content area. */
  children?: React.ReactNode;
  /** Main page title displayed at the top. */
  title: string;
  /** Descriptive text displayed below the title. */
  description: string;
}

/**
 * Template component for dashboard pages providing consistent layout structure.
 * 
 * Features:
 * - Responsive container with max-width constraints
 * - Consistent padding and spacing across breakpoints
 * - Page title and description header section
 * - Vertical spacing between child components
 * - Centered content with horizontal padding
 * - Empty state message when no children are provided
 * - Full dark mode support with theme-aware colors
 * - Smooth color transitions when switching themes
 * 
 * Layout:
 * - Mobile (< 640px): 16px horizontal padding
 * - Tablet (640px - 1024px): 24px horizontal padding
 * - Desktop (> 1024px): 32px horizontal padding
 * - Max content width: 1280px (7xl)
 * 
 * Accessibility:
 * - Semantic heading hierarchy with h1 for page title
 * - Descriptive paragraph for page context
 * - Sufficient color contrast for text
 * 
 * States:
 * - With children: Displays the provided content sections with consistent spacing
 * - Empty (no children): Shows centered "No content available" message with padding
 * 
 * @component
 * @param {DashboardPageTemplateProps} props - Component props
 * @param {React.ReactNode} props.children - Content to display in the main area
 * @param {string} props.title - Page title text
 * @param {string} props.description - Page description text
 * 
 * @example
 * ```tsx
 * // With content
 * <DashboardPageTemplate 
 *   title="Inventory Management"
 *   description="Track and manage food inventory levels"
 * >
 *   <InventoryStatusBar items={inventoryItems} />
 *   <OtherDashboardComponent />
 * </DashboardPageTemplate>
 * ```
 * 
 * @example
 * ```tsx
 * // Empty state
 * <DashboardPageTemplate 
 *   title="Dashboard"
 *   description="No data available"
 * />
 * ```
 * 
 * @see {@link DashboardPageTemplateSkeleton} for loading state
 */
export default function DashboardPageTemplate({ children, title, description }: DashboardPageTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-colors">
        <h1 className="text-2xl font-semibold text-foreground mb-6">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <div className="space-y-8">
          {children || (
              <div className="text-center text-muted-foreground py-12" role="status">
                No content available
              </div>
          )}
        </div>
    </div>
  );
}
