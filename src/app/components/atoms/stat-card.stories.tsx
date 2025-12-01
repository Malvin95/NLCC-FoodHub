import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { StatCard } from './stat-card';
import { TrendingUp, TrendingDown, Users, Package, Calendar, Heart } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Atoms/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A statistic display card showing a label, value, delta change and trend indicator (up/down) with customizable accent color and icon.'
      }
    }
  },
  argTypes: {
    title: { control: 'text', description: 'Label describing the statistic' },
    value: { control: 'text', description: 'Primary numeric/stat value' },
    change: { control: 'text', description: 'Change descriptor (e.g. +12%, -4%)' },
    trend: { control: { type: 'radio' }, options: ['up', 'down'], description: 'Trend direction' },
    color: { control: { type: 'select' }, options: ['rose', 'blue', 'green', 'purple'], description: 'Accent color theme' },
    icon: { control: false, description: 'Icon ReactNode rendered in accent bubble' }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof StatCard>;

const baseArgs = {
  title: 'Active Volunteers',
  value: '128',
  change: '+12%',
  trend: 'up' as const,
  color: 'rose' as const,
  icon: <Users className="w-6 h-6" />
};

export const Default: Story = {
  args: baseArgs
};

export const UpTrend: Story = {
  args: { ...baseArgs, trend: 'up', change: '+5%', color: 'green', icon: <TrendingUp className="w-6 h-6" /> }
};

export const DownTrend: Story = {
  args: { ...baseArgs, trend: 'down', change: '-3%', color: 'purple', icon: <TrendingDown className="w-6 h-6" /> }
};

export const Rose: Story = {
  args: { ...baseArgs, color: 'rose', icon: <Heart className="w-6 h-6" /> }
};

export const Blue: Story = {
  args: { ...baseArgs, color: 'blue', icon: <Calendar className="w-6 h-6" /> }
};

export const Green: Story = {
  args: { ...baseArgs, color: 'green', icon: <Package className="w-6 h-6" /> }
};

export const Purple: Story = {
  args: { ...baseArgs, color: 'purple', icon: <Users className="w-6 h-6" /> }
};

// Interactive test stories
export const TrendIconTest: Story = {
  args: { ...baseArgs, trend: 'down', change: '-8%' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Assert change text renders
    await expect(canvas.getByText('-8%')).toBeInTheDocument();
    // Assert down icon exists (class w-4 h-4 inside red text container)
    const downIcon = canvas.getByRole('icon-container', { hidden: true }); // lucide icons render svg with role img
    await expect(downIcon).toBeInTheDocument();
  }
};

export const ValueAndTitleTest: Story = {
  args: baseArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Active Volunteers')).toBeInTheDocument();
    await expect(canvas.getByText('128')).toBeInTheDocument();
  }
};

export const ColorClassTest: Story = {
  args: { ...baseArgs, color: 'blue' },
  play: async ({ canvasElement }) => {
    // Check the accent wrapper div contains a blue-* class
    const accentDiv = canvasElement.querySelector('div.p-3.rounded-lg');
    await expect(accentDiv?.className).toMatch(/bg-blue-100/);
    await expect(accentDiv?.className).toMatch(/text-blue-600/);
  }
};
