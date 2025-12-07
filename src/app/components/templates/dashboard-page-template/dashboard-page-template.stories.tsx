import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import DashboardPageTemplate from './dashboard-page-template';
import DashboardPageTemplateSkeleton from './dashboard-page-template-skeleton';

const meta: Meta<typeof DashboardPageTemplate> = {
  title: 'Templates/DashboardPageTemplate',
  component: DashboardPageTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Template component providing consistent layout structure for dashboard pages with title, description, and content areas.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof DashboardPageTemplate>;
type SkeletonStory = StoryObj<typeof DashboardPageTemplateSkeleton>;

/**
 * Default dashboard page template with sample content
 */
export const Default: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Dashboard Overview"
      description="Monitor key metrics and inventory status at a glance"
    >
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Section 1</h2>
        <p className="text-gray-600">Sample dashboard content goes here.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Section 2</h2>
        <p className="text-gray-600">More dashboard content.</p>
      </div>
    </DashboardPageTemplate>
  )
};

/**
 * Template with minimal content
 */
export const SingleSection: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Simple Dashboard"
      description="A dashboard with minimal content"
    >
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-600">Single content section.</p>
      </div>
    </DashboardPageTemplate>
  )
};

/**
 * Template with multiple sections
 */
export const MultipleSections: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Comprehensive Dashboard"
      description="A full dashboard with multiple content sections"
    >
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Section {idx + 1}</h2>
          <p className="text-gray-600">Content for section {idx + 1}.</p>
        </div>
      ))}
    </DashboardPageTemplate>
  )
};

/**
 * Template with long title and description
 */
export const LongContent: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Food Bank Inventory Management and Distribution Coordination Dashboard"
      description="Comprehensive overview of inventory levels, distribution schedules, volunteer coordination, and real-time tracking of food supplies across all locations in the network"
    >
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-600">Dashboard content.</p>
      </div>
    </DashboardPageTemplate>
  )
};

/**
 * Verify template structure and layout
 */
export const StructureTest: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Test Dashboard"
      description="Testing the template structure"
    >
      <div>Content 1</div>
      <div>Content 2</div>
    </DashboardPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Title should be h1
    const title = canvas.getByText('Test Dashboard');
    await expect(title).toBeInTheDocument();
    await expect(title.tagName).toBe('H1');

    // Description should be present
    const description = canvas.getByText('Testing the template structure');
    await expect(description).toBeInTheDocument();

    // Check container has max-width class
    const container = canvasElement.querySelector('.max-w-7xl');
    await expect(container).toBeInTheDocument();
  }
};

/**
 * Verify responsive padding classes
 */
export const ResponsiveLayoutTest: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Responsive Test"
      description="Testing responsive layout"
    >
      <div>Content</div>
    </DashboardPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('.max-w-7xl');
    
    // Check responsive padding classes
    await expect(container?.className).toContain('px-4');
    await expect(container?.className).toContain('sm:px-6');
    await expect(container?.className).toContain('lg:px-8');
  }
};

/**
 * Verify content spacing
 */
export const ContentSpacingTest: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Spacing Test"
      description="Testing content spacing"
    >
      <div>Section 1</div>
      <div>Section 2</div>
    </DashboardPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    // Content wrapper should have space-y-8
    const contentWrapper = canvasElement.querySelector('.space-y-8');
    await expect(contentWrapper).toBeInTheDocument();
  }
};

/**
 * Verify children are rendered correctly
 */
export const ChildrenRenderTest: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Children Test"
      description="Testing children rendering"
    >
      <div data-testid="child-1">First Child</div>
      <div data-testid="child-2">Second Child</div>
      <div data-testid="child-3">Third Child</div>
    </DashboardPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // All children should be rendered
    await expect(canvas.getByTestId('child-1')).toBeInTheDocument();
    await expect(canvas.getByTestId('child-2')).toBeInTheDocument();
    await expect(canvas.getByTestId('child-3')).toBeInTheDocument();
  }
};

/**
 * Template with no children provided
 */
export const EmptyState: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Empty Dashboard"
      description="This dashboard has no content sections"
    >
    </DashboardPageTemplate>
  )
};

/**
 * Verify empty state message is displayed
 */
export const EmptyStateTest: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Empty Test"
      description="Testing empty state"
    >
    </DashboardPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Title and description should still be present
    await expect(canvas.getByText('Empty Test')).toBeInTheDocument();
    await expect(canvas.getByText('Testing empty state')).toBeInTheDocument();


    // Empty state message should be displayed
    const emptyTextElement = canvas.getByText('No content available');
    await expect(emptyTextElement).toBeInTheDocument();

    // Message should be centered with proper styling
    await expect(emptyTextElement).toHaveClass('text-center');
    await expect(emptyTextElement).toHaveClass('text-gray-500');
    await expect(emptyTextElement).toHaveClass('py-12');
  }
};

/**
 * Verify empty state with long title and description
 */
export const EmptyStateWithLongContent: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Food Bank Inventory Management and Distribution Coordination Dashboard"
      description="Comprehensive overview of inventory levels, distribution schedules, volunteer coordination, and real-time tracking of food supplies across all locations in the network"
    >
    </DashboardPageTemplate>
  )
};

/**
 * Verify title and description are always rendered regardless of state
 */
export const AccessibilityTest: Story = {
  render: () => (
    <DashboardPageTemplate 
      title="Accessible Dashboard"
      description="Testing accessibility features"
    >
      <div>Content section</div>
    </DashboardPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Title should be h1
    const title = canvas.getByRole('heading', { level: 1 });
    await expect(title).toBeInTheDocument();
    await expect(title?.textContent).toBe('Accessible Dashboard');

    // Verify semantic paragraph
    const description = canvasElement.querySelector('p');
    await expect(description).toBeInTheDocument();
    await expect(description?.textContent).toBe('Testing accessibility features');

    // Verify content is rendered
    await expect(canvas.getByText('Content section')).toBeInTheDocument();
  }
};

// Skeleton Loading States

/**
 * Loading skeleton with default content blocks
 */
export const Skeleton: SkeletonStory = {
  render: () => <DashboardPageTemplateSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton mirroring the DashboardPageTemplate layout with 2 content block placeholders.'
      }
    }
  }
};

/**
 * Loading skeleton with custom content blocks
 */
export const SkeletonMultipleBlocks: SkeletonStory = {
  render: () => <DashboardPageTemplateSkeleton contentBlocks={4} />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton with 4 content block placeholders.'
      }
    }
  }
};

/**
 * Verify skeleton structure and accessibility
 */
export const SkeletonStructureTest: SkeletonStory = {
  render: () => <DashboardPageTemplateSkeleton />,
  parameters: {
    layout: 'padded'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check for role and aria-label
    const skeleton = canvasElement.querySelector('[role="status"]');
    await expect(skeleton).toBeInTheDocument();
    await expect(skeleton).toHaveAttribute('aria-label', 'Loading dashboard page');

    // Check for screen reader text
    const srText = canvas.getByText('Loading dashboard page...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');

    // Title skeleton should be present
    const titleSkeleton = canvasElement.querySelector('.h-8.w-64');
    await expect(titleSkeleton).toBeInTheDocument();

    // Description skeleton should be present
    const descSkeleton = canvasElement.querySelector('.h-4.w-96');
    await expect(descSkeleton).toBeInTheDocument();

    // Should have default 2 content blocks
    const contentBlocks = canvasElement.querySelectorAll('.space-y-8 > div');
    await expect(contentBlocks.length).toBe(2);
  }
};

/**
 * Verify skeleton custom content blocks
 */
export const SkeletonCustomCountTest: SkeletonStory = {
  render: () => <DashboardPageTemplateSkeleton contentBlocks={5} />,
  parameters: {
    layout: 'padded'
  },
  play: async ({ canvasElement }) => {
    // Should render 5 content block placeholders
    const contentBlocks = canvasElement.querySelectorAll('.space-y-8 > div');
    await expect(contentBlocks.length).toBe(5);
  }
};

/**
 * Side-by-side comparison of loaded and loading states
 */
export const TemplateVsSkeleton: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap">
      <div className="flex-1 min-w-[500px]">
        <h1 className="text-sm font-medium mb-4 text-gray-700">Loaded State</h1>
        <DashboardPageTemplate 
          title="Dashboard"
          description="Sample dashboard page"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm border">Content 1</div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">Content 2</div>
        </DashboardPageTemplate>
      </div>
      <div className="flex-1 min-w-[500px]">
        <h1 className="text-sm font-medium mb-4 text-gray-700">Loading State</h1>
        <DashboardPageTemplateSkeleton />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of the loaded template and its loading skeleton.'
      }
    }
  }
};
