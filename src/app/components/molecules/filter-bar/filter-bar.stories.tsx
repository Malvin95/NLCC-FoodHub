import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent, fn } from 'storybook/test';
import FilterBar from './filter-bar';
import { FilterBarSkeleton } from './filter-bar-skeleton';
import { EngagementRequestSortType } from '@/app/shared/enums';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof FilterBar> = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A button-based filter group for displaying and switching between engagement request types. Displays five request categories as buttons with pressed-state indication and full keyboard accessibility.'
      }
    }
  },
  argTypes: {
    activeTab: {
      control: 'text',
      description: 'Currently selected filter value (EngagementRequestType)'
    },
    onFilterChange: {
      control: false,
      description: 'Callback function fired when a filter is selected'
    },
    customLabels: {
      control: 'object',
      description: 'Custom labels for filter buttons, overriding defaults'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL
  }
};

export const HelpTabActive: Story = {
  args: {
    activeTab: EngagementRequestSortType.HELP
  }
};

export const VolunteerTabActive: Story = {
  args: {
    activeTab: EngagementRequestSortType.VOLUNTEER
  }
};

export const DonationTabActive: Story = {
  args: {
    activeTab: EngagementRequestSortType.DONATION
  }
};

export const QuestionTabActive: Story = {
  args: {
    activeTab: EngagementRequestSortType.QUESTION
  }
};

export const NoActiveTab: Story = {
  args: {}
};

export const WithCustomLabels: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL,
    customLabels: {
      [EngagementRequestSortType.ALL]: 'All Types',
      [EngagementRequestSortType.HELP]: 'Need Help',
      [EngagementRequestSortType.VOLUNTEER]: 'Volunteer Ops',
      [EngagementRequestSortType.DONATION]: 'Donate Items',
      [EngagementRequestSortType.QUESTION]: 'Q&A'
    }
  }
};

export const Interactive: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL
  },
  render: function Render(args) {
    const [{activeTab}, updateArgs] = useArgs();

    function onChange(tab: string) {
      updateArgs({ activeTab: tab });
    }

    return (
      <div className="space-y-4">
        <FilterBar
          activeTab={args.activeTab}
          onFilterChange={onChange}
        />
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-sm font-medium">Active tab: <span className="font-bold">{activeTab}</span></p>
        </div>
      </div>
    );
  }
};

// Interactive test stories
export const AllTabRenderTest: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check all filter buttons are rendered
    await expect(canvas.getByRole('button', { name: /all requests/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /help requests/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /volunteers needed/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /donations/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /questions/i })).toBeInTheDocument();
  }
};

export const ActiveTabStateTest: Story = {
  args: {
    activeTab: EngagementRequestSortType.HELP
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that the active filter has aria-pressed=true
    const activeButton = canvas.getByRole('button', { name: /help requests/i, pressed: true });
    await expect(activeButton).toBeInTheDocument();
  }
};

export const TabAttributesTest: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that buttons have proper ARIA pressed attribute
    const allButton = canvas.getByRole('button', { name: /all requests/i });
    await expect(allButton).toHaveAttribute('aria-pressed');
  }
};

export const CustomLabelsTest: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL,
    customLabels: {
      [EngagementRequestSortType.ALL]: 'Custom All',
      [EngagementRequestSortType.HELP]: 'Custom Help'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check custom labels render
    await expect(canvas.getByRole('button', { name: /custom all/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /custom help/i })).toBeInTheDocument();
    
    // Check original labels for non-customized tabs
    await expect(canvas.getByRole('button', { name: /volunteers needed/i })).toBeInTheDocument();
  }
};

export const OnTabChangeTest: Story = {
  args: {
    activeTab: EngagementRequestSortType.ALL,
    onFilterChange: fn()
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const filters = [
      { name: /all requests/i, value: EngagementRequestSortType.ALL },
      { name: /help requests/i, value: EngagementRequestSortType.HELP },
      { name: /volunteers needed/i, value: EngagementRequestSortType.VOLUNTEER },
      { name: /donations/i, value: EngagementRequestSortType.DONATION },
      { name: /questions/i, value: EngagementRequestSortType.QUESTION }
    ];

    for (const filter of filters) {
      await userEvent.click(canvas.getByRole('button', { name: filter.name }));
      await expect(args.onFilterChange).toHaveBeenCalledWith(filter.value);
    }

    await expect(args.onFilterChange).toHaveBeenCalledTimes(filters.length);
  }
};

// Skeleton Loading States
type SkeletonStory = StoryObj<typeof FilterBarSkeleton>;

export const LoadingSkeleton: SkeletonStory = {
  render: () => <FilterBarSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton that matches the FilterBar layout with animated pulse effects.'
      }
    }
  }
};

export const SkeletonStructureTest: SkeletonStory = {
  render: () => <FilterBarSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check role and aria-label
    const container = canvas.getByRole('status');
    await expect(container).toHaveAttribute('aria-label', 'Loading filter bar');
    
    // Check skeleton elements exist and have pulse animation
    const skeleton = canvasElement.querySelector('.animate-pulse');
    await expect(skeleton).toBeInTheDocument();
  }
};

export const SkeletonAccessibilityTest: SkeletonStory = {
  render: () => <FilterBarSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check for screen reader text
    const srText = canvas.getByText('Loading filter bar...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');
  }
};

export const MultipleSkeletons: SkeletonStory = {
  render: () => (
    <div className="space-y-4">
      <FilterBarSkeleton />
      <FilterBarSkeleton />
      <FilterBarSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple skeleton loaders stacked vertically, simulating multiple filter sections in a loading state.'
      }
    }
  }
};
