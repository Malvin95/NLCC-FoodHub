import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../../atoms/ui/card/card";
import FormFields from "./form-fields";

/**
 * Sign-in form component with email, password, and optional OAuth buttons.
 * Displays form fields within a Card wrapper.
 */
const meta: Meta<typeof FormFields> = {
  title: "Molecules/FormFields",
  component: FormFields,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Card>
          <Story />
        </Card>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof FormFields>;

/**
 * Desktop: Preview at a desktop viewport for layout inspection.
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

/**
 * Mobile: Preview at iPhone 12 viewport to validate responsiveness.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
};

/**
 * Loading: Form in loading state with disabled inputs and submit button text changed.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
