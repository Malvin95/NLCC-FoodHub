import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import FilterTabs from './filter-tabs';
import { FilterTabsSkeleton } from './filter-tabs-skeleton';
import { EngagementRequestType } from '@/app/shared/enums';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof FilterTabs> = {
  title: 'Molecules/FilterTabs',
  component: FilterTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tabbed filter component for displaying and switching between engagement request types. Displays five request categories as tab triggers with active state indication and full keyboard accessibility.'
      }
    }
  },
  argTypes: {
    activeTab: {
      control: 'text',
      description: 'Currently selected tab value (EngagementRequestType)'
    },
    onTabChange: {
      control: false,
      description: 'Callback function fired when a tab is selected'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the root Tabs element'
    },
    customLabels: {
      control: 'object',
      description: 'Custom labels for tab triggers, overriding defaults'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof FilterTabs>;

export const Default: Story = {
  args: {
    activeTab: EngagementRequestType.ALL
  }
};

export const HelpTabActive: Story = {
  args: {
    activeTab: EngagementRequestType.HELP
  }
};

export const VolunteerTabActive: Story = {
  args: {
    activeTab: EngagementRequestType.VOLUNTEER
  }
};

export const DonationTabActive: Story = {
  args: {
    activeTab: EngagementRequestType.DONATION
  }
};

export const QuestionTabActive: Story = {
  args: {
    activeTab: EngagementRequestType.QUESTION
  }
};

export const NoActiveTab: Story = {
  args: {}
};

export const WithCustomLabels: Story = {
  args: {
    activeTab: EngagementRequestType.ALL,
    customLabels: {
      [EngagementRequestType.ALL]: 'All Types',
      [EngagementRequestType.HELP]: 'Need Help',
      [EngagementRequestType.VOLUNTEER]: 'Volunteer Ops',
      [EngagementRequestType.DONATION]: 'Donate Items',
      [EngagementRequestType.QUESTION]: 'Q&A'
    }
  }
};

export const Interactive: Story = {
  args: {
    activeTab: EngagementRequestType.ALL
  },
  render: function Render(args) {
    const [{activeTab}, updateArgs] = useArgs();

    function onChange(tab: string) {
      updateArgs({ activeTab: tab });
    }
    // const [activeTab, setActiveTab] = useState<string>(EngagementRequestType.ALL);

    return (
      <div className="space-y-4">
        <FilterTabs
          activeTab={args.activeTab}
          onTabChange={onChange}
        />
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-sm font-medium">Active tab: <span className="font-bold">{activeTab}</span></p>
        </div>
      </div>
    );
  }
};

export const WithCustomStyling: Story = {
  args: {
    activeTab: EngagementRequestType.ALL,
    className: 'mt-4'
  }
};

// Interactive test stories
export const AllTabRenderTest: Story = {
  args: {
    activeTab: EngagementRequestType.ALL
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check all tabs are rendered
    await expect(canvas.getByRole('tab', { name: /all requests/i })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /help requests/i })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /volunteers needed/i })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /donations/i })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /questions/i })).toBeInTheDocument();
  }
};

export const ActiveTabStateTest: Story = {
  args: {
    activeTab: EngagementRequestType.HELP
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that the active tab has aria-selected=true
    const activeTab = canvas.getByRole('tab', { name: /help requests/i, selected: true });
    await expect(activeTab).toBeInTheDocument();
  }
};

export const TabAttributesTest: Story = {
  args: {
    activeTab: EngagementRequestType.ALL
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check that tabs have proper ARIA attributes
    const allTab = canvas.getByRole('tab', { name: /all requests/i });
    await expect(allTab).toHaveAttribute('role', 'tab');
  }
};

export const CustomLabelsTest: Story = {
  args: {
    activeTab: EngagementRequestType.ALL,
    customLabels: {
      [EngagementRequestType.ALL]: 'Custom All',
      [EngagementRequestType.HELP]: 'Custom Help'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check custom labels render
    await expect(canvas.getByRole('tab', { name: /custom all/i })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: /custom help/i })).toBeInTheDocument();
    
    // Check original labels for non-customized tabs
    await expect(canvas.getByRole('tab', { name: /volunteers needed/i })).toBeInTheDocument();
  }
};

export const OnTabChangeTest: Story = {
  args: {
    activeTab: EngagementRequestType.ALL,
    onTabChange: (value) => console.log('Tab changed to:', value)
  }
};

// Skeleton Loading States
type SkeletonStory = StoryObj<typeof FilterTabsSkeleton>;

export const LoadingSkeleton: SkeletonStory = {
  render: () => <FilterTabsSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'Loading skeleton that matches the FilterTabs layout with animated pulse effects.'
      }
    }
  }
};

export const SkeletonStructureTest: SkeletonStory = {
  render: () => <FilterTabsSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check role and aria-label
    const container = canvas.getByRole('status');
    await expect(container).toHaveAttribute('aria-label', 'Loading filter tabs');
    
    // Check skeleton elements exist and have pulse animation
    const skeleton = canvasElement.querySelector('.animate-pulse');
    await expect(skeleton).toBeInTheDocument();
  }
};

export const SkeletonAccessibilityTest: SkeletonStory = {
  render: () => <FilterTabsSkeleton />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Check for screen reader text
    const srText = canvas.getByText('Loading filter tabs...');
    await expect(srText).toBeInTheDocument();
    await expect(srText.className).toContain('sr-only');
  }
};

export const MultipleSkeletons: SkeletonStory = {
  render: () => (
    <div className="space-y-4">
      <FilterTabsSkeleton />
      <FilterTabsSkeleton />
      <FilterTabsSkeleton />
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
